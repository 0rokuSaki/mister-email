import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { demoDataService } from "./demo-data.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultEmail,
  getDefaultFilter,
  getFilterFromParams,
  isEmailMatchingFilter,
  getUnreadCount,
};

const loggedInUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    emails = emails
      .filter((email) => isEmailMatchingFilter(email, filterBy))
      .sort((a, b) => {
        if (filterBy.sortBy === "date") {
          return b.sentAt - a.sentAt;
        } else if (filterBy.sortBy === "subject") {
          return b.subject.toLowerCase().localeCompare(a.subject.toLowerCase());
        } else {
          return 0;
        }
      });
    if (filterBy.sortOrder === "asc") {
      emails.reverse();
    }
  }
  return emails;
}

async function getById(id) {
  return await storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
  return await storageService.remove(STORAGE_KEY, id);
}

async function save(emailToSave) {
  if (emailToSave.id) {
    return await storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return await storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(
  subject,
  body,
  isRead = false,
  isStarred = false,
  sentAt = null,
  removedAt = null,
  from,
  to
) {
  return {
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function getDefaultEmail() {
  return {
    subject: "",
    body: "",
    isRead: false,
    isStarred: false,
    sentAt: null, // Timestamp (e.g. Data.now())
    savedAt: null, // Timestamp (e.g. Data.now())
    removedAt: null, // Timestamp (e.g. Data.now())
    from: loggedInUser.email,
    to: "",
  };
}

function getDefaultFilter() {
  return {
    folder: "inbox", // "inbox"/"starred"/"sent"/"draft"/"trash"
    txt: "",
    isRead: null, // null/true/false
    sortBy: "date", // "date"/"subject"
    sortOrder: "desc", // "asc"/"desc"
  };
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];

    // Convert parameters from string to boolean or null
    if (filterBy[field] === "true") {
      filterBy[field] = true;
    } else if (filterBy[field] === "false") {
      filterBy[field] = false;
    } else if (filterBy[field] === "null") {
      filterBy[field] = null;
    }
  }
  return filterBy;
}

function isEmailMatchingFilter(email, filterBy) {
  const { txt, isRead, folder } = filterBy;

  // Check if text matches
  if (
    !email.subject.toLowerCase().includes(txt.toLowerCase()) &&
    !email.body.toLowerCase().includes(txt.toLowerCase())
  ) {
    return false;
  }

  // Check if read status matches
  if (isRead !== null && email.isRead !== isRead) {
    return false;
  }

  // Check if folder matches
  switch (folder) {
    case "inbox":
      return !(email.removedAt || email.to !== loggedInUser.email || !email.sentAt);
    case "starred":
      return !(email.removedAt || !email.isStarred);
    case "sent":
      return !(email.removedAt || email.from !== loggedInUser.email || !email.sentAt);
    case "draft":
      return !(email.removedAt || email.sentAt);
    case "trash":
      return email.removedAt !== null;
    default:
      return true;
  }
}

async function getUnreadCount() {
  const filterBy = getDefaultFilter();
  const emails = await query(filterBy);
  return emails.reduce((acc, email) => {
    if (!email.isRead) {
      return acc + 1;
    }
    return acc;
  }, 0)
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = demoDataService.getDemoData();
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}

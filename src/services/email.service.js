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
    let { txt, isRead, folder } = filterBy;
    emails = emails
    .filter((email) => {
      let txtMatches =
        email.subject.toLowerCase().includes(txt.toLowerCase()) ||
        email.body.toLowerCase().includes(txt.toLowerCase());
      let isReadMatches = isRead === null || email.isRead === isRead;
      let folderMatches = false;
      switch (folder) {
        case "inbox":
          folderMatches =
            !email.removedAt && email.to === loggedInUser.email && email.sentAt;
          break;
        case "starred":
          folderMatches = !email.removedAt && email.isStarred;
          break;
        case "sent":
          folderMatches =
            !email.removedAt &&
            email.from === loggedInUser.email &&
            email.sentAt;
          break;
        case "trash":
          folderMatches = !!email.removedAt;
          break;
      }

      return txtMatches && isReadMatches && folderMatches;
    })
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
    sentAt: null,
    removedAt: null,
    from: "",
    to: "",
  };
}

function getDefaultFilter() {
  return {
    folder: "inbox",   // "inbox"/"starred"/"sent"/"draft"/"trash"
    txt: "",
    isRead: null,      // null/true/false
    sortBy: "date",    // "date"/"subject"
    sortOrder: "desc", // "asc"/"desc"
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = demoDataService.getDemoData();
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}

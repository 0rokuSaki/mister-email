import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { demoDataService } from "./demo-data.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
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
    let { txt, isRead, status } = filterBy;
    emails = emails.filter((email) => {
      let txtMatches =
        email.subject.toLowerCase().includes(txt.toLowerCase()) ||
        email.body.toLowerCase().includes(txt.toLowerCase());
      let isReadMatches = isRead === null || email.isRead === isRead;
      let statusMatches = false;
      switch (status) {
        case "inbox":
          statusMatches = email.to === loggedInUser.email;
          break;
        case "star":
          statusMatches = email.isStarred;
          break;
        case "sent":
          statusMatches = email.sentAt ? true : false;
          break;
        case "trash":
          statusMatches = email.removedAt ? true : false;
          break;
      }

      return txtMatches && isReadMatches && statusMatches;
    });
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

function getDefaultFilter() {
  return {
    status: "inbox",
    txt: "",
    isRead: null,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = demoDataService.getDemoData();
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}

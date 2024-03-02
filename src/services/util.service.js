import { LoremIpsum } from "lorem-ipsum";

export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  makeLoremIpsum,
  getRandomIntInRange,
  getRandomBoolean,
  getRandomTimestamp,
  getRandomEmail,
  capitalizeString,
  formatTimestamp,
};

function makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function makeLoremIpsum(wordCount) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  return lorem.generateWords(wordCount);
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
  const randomNumber = Math.random();
  return randomNumber >= 0.5;
}

function getRandomTimestamp(minTimestamp=0, maxTimestamp=Date.now()) {
  // Generate a random number between minTimestamp and maxTimestamp
  const randomTimestamp = Math.random() * (maxTimestamp - minTimestamp) + minTimestamp;

  // Round the random timestamp to an integer
  return Math.floor(randomTimestamp);
}

function getRandomEmail() {
  // Random username
  const username = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string

  // Random domain
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com']; // Add more domains as needed
  const domain = domains[Math.floor(Math.random() * domains.length)];

  // Combine username and domain to form the email address
  const email = `${username}@${domain}`;

  return email;
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  // Check if the timestamp is from today
  if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
  ) {
      // Return just the hour and minute
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      return `${hour}:${minute}`;
  } else if (date.getFullYear() === now.getFullYear()) {
      // Return month name (short) and day
      const monthName = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      return `${monthName} ${day}`;
  } else {
      // Return year, month (short), and day
      const year = date.getFullYear();
      const monthName = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      return `${year} ${monthName} ${day}`;
  }
}

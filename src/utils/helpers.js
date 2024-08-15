// src/helpers/helpers.js

const fs = require('fs').promises;
// Random Data Generation
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomPhoneNumber() {
  // Generate random numbers for each part of the phone number
  const areaCode = Math.floor(Math.random() * 900) + 100; // Random number between 100 and 999
  const exchangeCode = Math.floor(Math.random() * 900) + 100; // Random number between 100 and 999
  const subscriberNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0'); // Random number between 0000 and 9999

  // Format the phone number
  const phoneNumber = `(${areaCode}) ${exchangeCode}-${subscriberNumber}`;
  return phoneNumber;
}

function getRandomUsername(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return username;
}

function generateRandomPassword(length = 12) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Date and Time Utilities
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

// Browser Utilities
async function setCookie(page, name, value) {
  await page.context().addCookies([{ name, value, url: page.url() }]);
}

async function getLocalStorageItem(page, key) {
  return page.evaluate((key) => window.localStorage.getItem(key), key);
}

async function retryOperation(operation, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await operation();
      return;
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
}

// File Management
async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Export Functions
module.exports = {
  generateRandomString,
  formatDate,
  getCurrentTimestamp,
  setCookie,
  getLocalStorageItem,
  retryOperation,
  readJsonFile,
  writeJsonFile,
  getRandomPhoneNumber,
  getRandomUsername,
  generateRandomPassword,
};

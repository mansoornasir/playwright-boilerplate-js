const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let response;

Given(
  'I send a GET request to {string}',
  async function (url) {
    const request = await this.page.request;
    response = await request.get(url);
  },
);

Then(
  'the response status should be {int}',
  async function (statusCode) {
    expect(response.status()).toBe(statusCode);
  },
);

Then(
  'the response body should contain {string}',
  async function (key) {
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty(key);
  },
);

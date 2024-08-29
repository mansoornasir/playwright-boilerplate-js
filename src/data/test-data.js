const Faker = require('./Faker');

const data = {
  visual: {
    homeUrl: 'https://www.example.com',
    homeReferenceUrl: 'https://www.example.com',
  },
  search: {
    term: 'chew',
  },
  cust: {
    email: process.env.CUST_EMAIL,
    password: process.env.CUST_PASSWORD,
  },
  customerRegForm: {
    name: Faker.generateName(),
    email: Faker.generateEmail(),
  },
};

module.exports = data;

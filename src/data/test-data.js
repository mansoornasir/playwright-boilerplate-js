const Faker = require('./Faker');

const data = {
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

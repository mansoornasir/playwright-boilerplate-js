const Faker = require('./Faker');

const data = {
  visual: {
    homeUrl: 'https://www.example.com',
    homeReferenceUrl: 'https://www.example.com',
  },
  search: {
    term: 'apoquel',
    product: 'bravecto',
  },
  cust: {
    email: process.env.CUST_EMAIL,
    password: process.env.CUST_PASSWORD,
  },
  customerRegForm: {
    name: Faker.generateName(),
    email: Faker.generateEmail(),
    firstName: 'Hamid',
    lastName: 'Hussain',
    password: 'Admin@123',
  },

  dashboard: {
    pageTitle: 'My account',
  },
};

module.exports = data;

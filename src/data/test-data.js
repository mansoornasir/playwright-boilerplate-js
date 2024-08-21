const Faker = require('./Faker');

const data = {
  search: {
    term: 'chew',
  },
  customerRegForm: {
    name: Faker.generateName(),
    email: Faker.generateEmail(),
  },
};

module.exports = data;

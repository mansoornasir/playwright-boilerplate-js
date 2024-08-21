const { faker } = require('@faker-js/faker');

class Faker {
  static generateName() {
    return faker.person.fullName();
  }

  static generateEmail() {
    return faker.internet.email();
  }

  static generatePhoneNumber() {
    return faker.phone.number();
  }

  static generateAddress() {
    return {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };
  }

  static generateCompany() {
    return {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    };
  }

  static generateUsername() {
    return faker.internet.userName();
  }

  static generatePassword() {
    return faker.internet.password();
  }

  static generateJobTitle() {
    return faker.name.jobTitle();
  }

  static generateCreditCard() {
    return {
      number: faker.finance.creditCardNumber(),
      expiry: faker.finance.creditCardExpiry(),
      cvv: faker.finance.creditCardCVV(),
    };
  }

  static generateDateOfBirth() {
    return faker.date.past(50, new Date('2000-01-01'));
  }

  static generateRandomNumber(min = 1, max = 100) {
    return faker.number.int({ min, max });
  }

  static generateLoremIpsum(sentences = 3) {
    return faker.lorem.sentences(sentences);
  }
}

module.exports = Faker;

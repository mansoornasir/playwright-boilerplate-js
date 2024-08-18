require('dotenv').config(); // Load environment variables from .env file
const randomEmail = "1mansoor.nasir@gmail.com"
const [email, domain] = randomEmail.split('@')
const randomString = Math.floor(Math.random() * 1000) + 1
const randEmail = `${email}+${randomString}@${domain}`;
console.log(randEmail)
const allivetData = {
  login: {
    email: '1mansoor.nasir@gmail.com',
    password: "Admin@123",
  },
  signup: {
    firstName: "Mansoor",
    lastName: "QA",
    email: `${randEmail}`,
    password: "Admin@123",
    duplicateEmail: "1mansoor.nasir.aut08@gmail.com"
  },
};

module.exports = allivetData;
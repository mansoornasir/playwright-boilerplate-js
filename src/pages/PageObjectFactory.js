// src/pageObjects/PageObjectFactory.js

class PageObjectFactory {
  constructor(page) {
    this.page = page;
    this.pageObjects = {};
  }

  register(name, PageObjectClass) {
    this.pageObjects[name] = PageObjectClass;
  }

  create(name) {
    const PageObjectClass = this.pageObjects[name];
    if (!PageObjectClass) {
      throw new Error(`PageObject ${name} is not registered.`);
    }
    return new PageObjectClass(this.page);
  }
}

module.exports = PageObjectFactory;

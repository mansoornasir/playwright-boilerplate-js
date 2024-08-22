class ObjectsProvider {
  constructor(page) {
    this.page = page;
    this.pageObjects = {};
    this.initializedObjects = {};
  }

  register(name, PageObjectClass) {
    this.pageObjects[name] = PageObjectClass;
  }

  create(name) {
    const PageObjectClass = this.pageObjects[name];
    if (!PageObjectClass) {
      throw new Error(
        `PageObject ${name} is not registered.`,
      );
    }
    return new PageObjectClass(this.page);
  }

  initializeAll() {
    for (const name in this.pageObjects) {
      this.initializedObjects[name] = this.create(name);
    }
    return this.initializedObjects;
  }
}

module.exports = ObjectsProvider;

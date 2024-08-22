/**
 *
 *
 * @class BasePage
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  // navigates to
  async goto(url) {
    await this.page.goto(url);
  }
  // Method to click an element
  async click(selector) {
    try {
      await this.page.click(selector);
    } catch (error) {
      console.error(`Failed to click on ${selector}:`, error);
      throw error;
    }
  }

  // Method to fill input fields
  async fill(selector, value) {
    try {
      await this.page.fill(selector, value);
    } catch (error) {
      console.error(`Failed to fill ${selector} with ${value}:`, error);
      throw error;
    }
  }

  // Method to get text from an element
  async getText(selector) {
    try {
      return await this.page.textContent(selector);
    } catch (error) {
      console.error(`Failed to get text from ${selector}:`, error);
      throw error;
    }
  }

  // Method to check if an element is visible
  async isVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch (error) {
      console.error(`Failed to check visibility of ${selector}:`, error);
      throw error;
    }
  }

  // Method to wait for an element to be visible
  async waitForVisible(selector, timeout = parseInt(process.env.DEFAULT_TIMEOUT)) {
    try {
      await this.page.waitForSelector(selector, {
        state: 'visible',
        timeout,
      });
    } catch (error) {
      console.error(`Failed to wait for ${selector} to be visible:`, error);
      throw error;
    }
  }

  // wait for the page to fully load
  async waitForPageToLoad() {
    try {
      await this.page.waitForLoadState('load', { timeout: parseInt(process.env.DEFAULT_TIMEOUT) }); // Waits for the page to fully load can be (networkidle) (domcontentloaded)
    } catch (error) {
      console.error(`Error: while waiting for the page to load fully`, error);
      throw error;
    }
  }

  // Method to handle alerts
  async handleAlert() {
    this.page.on('dialog', async (dialog) => {
      console.log(`Alert text: ${dialog.message()}`);
      await dialog.accept();
    });
  }

  // Method to handle iframes
  async switchToIframe(selector) {
    const frame = this.page.frameLocator(selector);
    return frame;
  }
}

module.exports = BasePage;

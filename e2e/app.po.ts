import { browser, element, by } from 'protractor';

export class CoreUIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.className('app-footer')).getText();
  }
}

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'user name' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://wmdemo.tempo.delivery/console/#/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.usernameInput.press('Tab');
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
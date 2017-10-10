class UserConfiguration {
  constructor(existingConfig) {
    let config = existingConfig || {};
    this.email = config.email || [];
    this.slack = config.slack || '-';
    this.ifttt = config.ifttt || '-';
    this.userId = config.userId || '';
  }
  set(existingConfig) {
    let config = existingConfig || {};
    this.email = config.email || [];
    this.slack = config.slack || '-';
    this.ifttt = config.ifttt || '-';
    this.userId = config.userId || '';
  }
  get(){
    return {
      email: this.email,
      slack: this.slack,
      ifttt: this.ifttt,
      userId: this.userId
    };
  }
}
let UserConfig = new UserConfiguration();
export default UserConfig;
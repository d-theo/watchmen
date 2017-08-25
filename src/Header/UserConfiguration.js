class UserConfiguration {
  constructor(existingConfig) {
    let config = existingConfig || {};
    this.email = config.email || [];
    this.slack = config.slack || '';
    this.ifttt = config.ifttt || '';
  }
  set(existingConfig) {
    let config = existingConfig || {};
    this.email = config.email || [];
    this.slack = config.slack || '';
    this.ifttt = config.ifttt || '';
  }
  get(){
    return {
      email: this.email,
      slack: this.slack,
      ifttt: this.ifttt
    };
  }
}
let UserConfig = new UserConfiguration();
export default UserConfig;
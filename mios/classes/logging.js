class Logging {
  constructor() {
    this.errorFile = "error.log";
    this.eventFile = "error.log";
  }

  log(text) {
    console.log(text);
  }

  error(text) {
    console.log(text);
  }
}
module.exports = Logging;

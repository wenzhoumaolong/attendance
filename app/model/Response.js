class Transfer {
  constructor(code = 200, data = {}, message = '') {
    if (typeof code === 'object') {
      message = code.message;
      code = code.code;
    }

    this.code = code;
    this.data = data;
    this.message = message;
  }
}

module.exports = Transfer;

const is = require('is_js');

module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      this.app.emit('error', err, this);
      if (is.not.undefined(err.code)) {
        this.status = 400
        this.body = {
          success: false,
          code: err.code,
          message: err.message,
        };
        return;
      }
      this.status = 500;
      this.body = {
        message: this.app.config.env !== 'prod' ? err.message : 'Internal Server Error'
      };
    }
  };
};

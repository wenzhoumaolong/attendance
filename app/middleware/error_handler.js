const { errors } = require('../const.js');

module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      this.app.emit('error', err, this);
      const error = errors[err.message];
      this.body = error;
      this.status = error ? 400 : 500;
      message = error ? error.message : this.app.config.env !== 'prod' ? err.message : 'Internal Server Error';
      this.body = {
        success: false,
        code: error.code,
        message: error.message,
      };
    }
  };
};

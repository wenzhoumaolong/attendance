const Transfer = require('../model/response');
const { INVALID_PARAM } = require('../error');

module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      this.app.emit('error', err, this);
      if (err.code === 'invalid_param') {
        this.body = new Transfer(INVALID_PARAM, err.errors);
        return;
      }
      this.status = 500;
      this.body = {
        message: this.app.config.env !== 'prod' ? err.message : 'Internal Server Error'
      };
    }
  };
};

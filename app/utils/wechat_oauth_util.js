var Oauth = require('wechat-oauth');

module.exports = {
	getClient: (app) => {
		var client = new Oauth('wxface34de10d6d723', '21d3c94704e11e36535bd914b1036736', (openid, callback) => {
        var sql = 'SELECT * FROM token WHERE openid = ?';
        app.mysql.query(sql, [openid], function (err, result) {
          if(err) {
            return callback(err);
          }
          return callback(null, result[0]);
        });
      }, (openid, token, callback) => {
        var sql = 'REPLACE INTO token(access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)';
        var fields = [token.access_token, token.expires_in, token.refresh_token, token.openid, token.scope, token.create_at];
        app.mysql.query(sql, fields, function (err, result) {
          return callback(err);
        });
      });
      return client;
	}
}
var Oauth = require('wechat-oauth');
var client = new Oauth('wx84ac462304bb229e', '64fef03efc3247143a4b404d753f236f', function (openid, callback) {
  var sql = 'SELECT * FROM token WHERE openid = ?';
  db.query(sql, [openid], function (err, result) {
    if(err) {
      return callback(err);
    }
    return callback(null, result[0]);
  });
}, function (openid, token, callback) {
  var sql = 'REPLACE INTO token(access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)';
  var fields = [token.access_token, token.expires_in, token.refresh_token, token.openid, token.scope, token.create_at];
  db.query(sql, fields, function (err, result) {
    return callback(err);
  });
});

module.exports = {
	url: client.getAuthorizeURLForWebsite('http://118.190.175.30/')
}

// var url = client.getAuthorizeURLForWebsite('redirectUrl');

// var url = client.getAuthorizeURL('redirectUrl', 'state', 'scope');

// client.getAccessToken('code', function (err, result) {
//   var accessToken = result.data.access_token;
//   var openid = result.data.openid;
// });

var qr = require('qr-image');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');

module.exports = {
	generateQRImage(filename, value) {
		var qr_png = qr.image(value, { type: 'png' });
		var pathStr = path.join('dist/qrimage');
		qr_png.pipe(fs.createWriteStream(`${pathStr}/${filename}.png`));
	},
	deleteQRImage(filename) {
		var pathStr = `${path.join('dist/qrimage')}/${filename}.png`;
		if (fs.existsSync(pathStr)) {
			fs.unlinkSync(pathStr);
		}
	},
	encrypt(text, secret) {
		var cipher =crypto.createCipher('aes192', secret);
		let encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
	},
	decrypt(encrypted, secret) {
		const decipher = crypto.createDecipher('aes192', secret);
		let decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	},
	nowStr() {
		return moment().format('YYYY-MM-DD hh:mm');
	}
}

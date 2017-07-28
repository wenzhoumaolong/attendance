var qr = require('qr-image');
var path = require('path');
var fs = require('fs');

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
	}
}

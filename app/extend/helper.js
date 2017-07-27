var qr = require('qr-image');
const path = require('path');

module.exports = {
	generateQRImage(filename, value) {
		var qr_png = qr.image(value, { type: 'png' });
		var pathStr = path.join('dist/image');
		qr_png.pipe(require('fs').createWriteStream(`${pathStr}/qr_image/i_love_qr.png`));
	}
}

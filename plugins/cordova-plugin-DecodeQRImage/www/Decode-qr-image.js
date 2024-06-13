cordova.define("cordova-plugin-DecodeQRImage.Decode-qr-image", function(require, exports, module) {
var exec = require('cordova/exec');

var DecodeQRImage = function () {
};

DecodeQRImage.prototype.decode = function (success, fail, imageUri) {
  return exec(success, fail, 'DecodeQRImage', 'decode', [imageUri]);  
};

window.decodeQRImage = new DecodeQRImage();

});

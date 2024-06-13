cordova.define("cordova-plugin-net-diagno.netdiagno", function(require, exports, module) {
var isRun = false;

function efn() {};

module.exports = function(options) {
    var dormain = options.dormain, 
        onStart = options.onStart || efn,
        onProgress = options.onProgress || efn,
        onError = options.onError || efn,
        onFinished = options.onFinished || efn;

    if (!dormain) {
        setTimeout(function() {
            onError.call(options, new Error('dormain must be set!'));
        }, 10);
        return;
    }
    
    if (isRun) {
        setTimeout(function() {
            onError.call(options, new Error('command is running!'));
        }, 10);
        return; 
    }

    isRun = true;
    cordova.exec(function(res) {
        var type = res.type;
        if (type == 'start') {
            onStart.call(options);
            return;
        }
        else if (type == 'step') {
            onProgress.call(options, res.out);
            return;
        }
        else {
            isRun = false;
            onFinished.call(options, res.out);
            return;
        }
    }, function(err) {
        isRun = false;
        onError.call(options, err);
    }, "netdiagno", "execRouteCheck", [dormain]);
};
});

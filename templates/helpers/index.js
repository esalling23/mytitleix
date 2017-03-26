var _ = require('underscore');
var hbs = require('handlebars');
module.exports = function() {

    var _helpers = {};

     _helpers.ifeq = function(a, b, options) {
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    };

    _helpers.jsonPrint = function(obj) {

        return JSON.stringify(obj, null, 2);
    };
// console.log (_helpers);
    return _helpers;

}();
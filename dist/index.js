'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function Service(callback) {
    var connection = _mysql2.default.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "landmark_db"
    });
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }

        var query = 'select a.name as id, b.name as en, a.latitude, a.longitude, a.phone\n            from landmark a\n                inner join landmark_translation b\n                    on a.id = b.lm_id';
        connection.query(query, function (err, values) {
            var toExport = JSON.stringify(values);
            _fs2.default.writeFile("/tmp/export.json", toExport, "utf8", function (err) {
                if (err) {
                    console.log(err);
                }
                connection.end(function (err) {
                    callback();
                });
            });
        });
    });
};

exports.default = Service;
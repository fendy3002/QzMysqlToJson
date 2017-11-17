import mysql from 'mysql';
import lo from 'lodash';
import fs from 'fs';

var Service = function(callback) {
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "landmark_db"
    });
    connection.connect((err) => {
        if(err){ console.log(err); }
        
        var query = ``;
        connection.query(query, (err, values) => {
            var toExport = JSON.stringify(values);
            fs.writeFile("/tmp/export.json", toExport, "utf8", (err) => {
                if(err){console.log(err); }
                connection.end((err) => {
                    callback();
                })
            });
        });
    });
};

export default Service;
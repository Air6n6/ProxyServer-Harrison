var mysql = require('mysql');


var connection = mysql.createConnection({   
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'recommendations' 
});
 
connection.connect(() => console.log('DATABASE IS CONNECTING'));  

// 
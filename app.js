const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/', function(req,res){
    res.render('home');
      var encryptedMessage = req.body.enMessage;
      var key = (req.body.key).toUpperCase();
      key_length = key.length;
      message_length = encryptedMessage.length;
      numberOfRows = Math.ceil((message_length) / (key_length));

      //--------------------------------------Sorting the key alphabetically---------------------------------------------------------------------------

      var sortedKey = [];
      for (i = 0; i < key_length; i++) {
          sortedKey.push(key[i]);
      }
      sortedKey.sort();
      //--------------------------------------------Creating the matrix structure for sorted key-----------------------------------------------------------------------

      var x = new Array(key_length);

      for (var i = 0; i < x.length; i++) {
          x[i] = new Array(numberOfRows + 1);
      }
      //--------------------------------------------Naming the columns according to sorted key-----------------------------------------------------------

      for (i = 0; i < key_length; i++) {
          x[i][0] = sortedKey[i];
      }

      //--------------------------------------------Entering the encrypted message Column-wise---------------------------------------------------------------

      var k = 0;
      for (i = 0; i < key_length; i++) {
          for (j = 1; j < (numberOfRows + 1); j++) {
              x[i][j] = encryptedMessage[k];
              k = k + 1;
          }
      }
      //--------------------------------------------Creating the matrix structure for key-----------------------------------------------------------------------------
      var y = new Array(key.length);
      for (var i = 0; i < y.length; i++) {
          y[i] = new Array(numberOfRows + 1);
      }

      //--------------------------------------------Naming the columns according to key---------------------------------------------------------------------------

      for (i = 0; i < key.length; i++) {
          y[i][0] = key[i];
      }

      //----------------------------------------Deriving values from Matrix X to fill columns in Matrix Y according to key----------------------------------------------------

      for (i = 0; i < key.length; i++) {
          for (j = 0; j < key.length; j++) {
              if (y[i][0] == x[j][0]) {
                  y[i] = x[j];
                  break;
              }
          }
          x[j][0] = "done";
      }
      //---------------------------------------Printing the decrypted message----------------------------------------------------
      var message = ""
      for (i = 1; i < numberOfRows + 1; i++) {
          for (j = 0; j < key.length; j++) {
              message = message + y[j][i];
          }
      }
      console.log(message);
      console.log(y)
      console.log(x);
});
    


app.listen(3000, function () {
    console.log("Server Started on port 3000");
});
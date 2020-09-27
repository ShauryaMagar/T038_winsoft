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

});

app.post("/", function (req, res) {
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

    //...........................................................................................

    //................................................//finding name of locations from encrypted message..................................
    var places = ['lachung', 'sia', 'khardung', 'sasser', 'zoji', 'gyong', 'indira', 'rezang', 'tanglang', 'marsimik', 'pensi'];
    var lowerMessage = message.toLowerCase()
    var messageArray = lowerMessage.split(' ');
    let intersection = messageArray.filter(x => places.includes(x));
    console.log(intersection);

    //---------------------------------------//Miscellaneous Data--------------------------------------------------------------
    var generalPosition = {
        "khardung": "A",
        "lachulung": "B",
        "sasser": "C",
        "gyong": "D",
        "sia": "E",
        "zoji": "F",
        "indira": "G",
        "rezang": "H",
        "tanglang": "I",
        "pensi": "J",
        "marsimik": "K"
    }
    var placePosition = {

         "A": "Khardung La",

         "B": "Lachulung La",

        "C" : "Sasser Pass",

        "D": "Gyong La",

        "E": "Sia La",

        "F": "Zoji La",

        "G": "Indira Col",

        "H":"Rezang La" ,

        "I": "Tanglang La",

        "J": "Pensi",

        "K": "Marsimik",

    }

    var cordPos = {
        'A': [0, 10],
        'B': [10, 20],
        'C': [10, 10],
        'D': [10, 0],
        'E': [20, 20],
        'F': [20, 10],
        'G': [20, 0],
        'H': [30, 10],
        'I': [40, 20],
        'J': [40, 0],
        'K': [50, 10]
    }

    var alphaPos = {
        'A': ['B', 'C', 'D', 'E', 'F', 'G'],
        'B': ['A', 'E', 'C', 'D', 'H'],
        'C': ['A', 'B', 'E', 'D', 'F', 'H'],
        'D': ['A', 'B', 'G', 'H', 'F', 'C'],
        'E': ['A', 'B', 'C', 'G', 'F', 'H', 'I', 'J'],
        'F': ['A', 'D', 'E', 'G', 'C'],
        'G': ['A', 'I', 'D', 'F', 'H', 'J', 'E'],
        'H': ['I', 'K', 'J', 'B', 'E', 'D', 'G', 'C'],
        'I': ['G', 'K', 'J', 'E', 'H'],
        'J': ['K', 'I', 'H', 'E', 'G'],
        'K': ['I', 'J', 'H']
    }
    //--------------------------------------------------------------------------------------------------------------------
    var map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    console.log(alphaPos['A']);
    //----------------------------------------------making array of enemy position with alias name-----------------------------------------------------------------------
    var nodes = [];
    for (i = 0; i < intersection.length; i++) {
        nodes.push(generalPosition[intersection[i]]);
    }
    //--------------------------------------------------------------------------------------------------------------------
    for (i = 0; i < map.length; i++) {
        let cross = nodes.filter(x => alphaPos[map[i]].includes(x));
        if (cross.length == nodes.length) {
            var stratpose = map[i];
            break;
        }
    }
    //--------------------------------------Enemy Position Coordinates------------------------------------------------------
    for (i = 0; i < nodes.length; i++) {
        console.log(cordPos[nodes[i]]);
    }
    //-------------------------------Desired Position Coordinates------------------------
    console.log(cordPos[stratpose]);
    //-------------------------------Desired Position---------------------------
    console.log(stratpose);
    var safe = map.filter(function (val) {
        return nodes.indexOf(val) == -1;
    });
    var safePlaceName=[];
    for (var i = 0; i < safe.length; i++) {
        safePlaceName.push(placePosition[safe[i]]);
    }
    var enemyPlaceName=[];
    for(var i=0;i<nodes.length;i++){
        enemyPlaceName.push(placePosition[nodes[i]]);
    }
    var strategicPosition= placePosition[stratpose];
    console.log(safePlaceName);
    console.log(enemyPlaceName);
    console.log(strategicPosition);
    res.render("message", {
        pos: stratpose,
        coord: cordPos[stratpose],
        message: message,
        nodes:nodes,
        safe:safe,
        enemyPlaceName: enemyPlaceName,
        safePlaceName: safePlaceName,
        strategicPosition: strategicPosition,
        cordPos:cordPos,
    })
})
    


app.listen(3000, function () {
    console.log("Server Started on port 3000");
});
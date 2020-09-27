<div class="circle" id="B">B</div>
            <div class="circle" id="E">E</div>
            <div class="circle" id="I">I</div>
            <div class="circle" id="A">A</div>
            <div class="circle" id="C">C</div>
            <div class="circle" id="D">D</div>
            <div class="circle" id="F">F</div>
            <div class="circle" id="G">G</div>
            <div class="circle" id="H">H</div>
            <div class="circle" id="J">J</div>
            <div class="circle" id="K">K</div>
            app.get("/", function (req, res) {
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




                //...........................................................................................


                var nameArray = message.split(" "); //splitting and storing in nameArray
                var foundNames = []; //storing indices of names found in message
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].toLowerCase() === "khardungla" || arr[i].toLowerCase() === "zoji" ||
                        arr[i].toLowerCase() === "indira" || arr[i].toLowerCase() === "gyong" ||
                        arr[i].toLowerCase() === "sasser" || arr[i].toLowerCase() === "lachulung" ||
                        arr[i].toLowerCase() === "sia" || arr[i].toLowerCase() === "rezang" ||
                        arr[i].toLowerCase() === "pensi" || arr[i].toLowerCase() === "marsimik" ||
                        arr[i].toLowerCase() === "tanglang"
                    ) {
                        foundNames.push(i);
                    }
                }
                //................................................//finding name of locations from encrypted message..................................
                var places = ['lachung', 'sia', 'khardung', 'sasser', 'zoji', 'gyong', 'indira', 'rezang', 'tanglang', 'marsimik', 'pensi'];
                var message = "Commander we have setup our base at the Khardung La Zoji La Tanglang La and Indira Col____"
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
            })
            //-----------------------------------------------------------------------------------------------------------------------------
            //"aan  sa ro i 'tGdLy cna_MdukgrMrty aaeaoM_yydfLid!eramyW mak!ea n "
            //MISSISSIPPI
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            oahh sr nZ dl A7iassga _gtaet Tgoai_r 7 dwaanLida_e!-aoSPa jnr_Rhp gde, a anotl6nrssl, LIC_
            RACECAR
            //---------------------------------------------------------------------------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------------------------------------------------------------------------
            var encryptedMessage = req.body.enMessage;
            var cont = req.body.key;
            var key = cont.toUpperCase();
            var numberOfRows = Math.ceil((encryptedMessage.length) / (key.length))
            console.log(numberOfRows);
            var sortedKey = [];
            for (i = 0; i < key.length; i++) {
                sortedKey.push(key[i]);
            }
            sortedKey.sort();
            console.log(sortedKey);

            var x = new Array(key.length);
            var k = 0;
            for (var i = 0; i < x.length; i++) {
                x[i] = new Array(numberOfRows + 1);
            }

            for (i = 0; i < key.length; i++) {
                x[i][0] = sortedKey[i];
            }

            //for loop i and j
            for (i = 0; i < key.length; i++) {
                for (j = 1; j < (numberOfRows + 1); j++) {
                    x[i][j] = encryptedMessage[k];
                    k = k + 1;
                }
            }

            var y = new Array(key.length);
            for (var i = 0; i < y.length; i++) {
                y[i] = new Array(numberOfRows + 1);
            }
            for (i = 0; i < key.length; i++) {
                y[i][0] = key[i];
            }

            for (i = 0; i < key.length; i++) {
                for (j = 0; j < key.length; j++) {
                    if (y[i][0] == x[j][0]) {
                        y[i] = x[j];
                        break;
                    }
                }
                x[j][0] = "done";
            }
            var message = ""
            for (i = 1; i < (numberOfRows + 1); i++) {
                for (j = 0; j < key.length; j++) {
                    message = message + y[j][i];
                }
            }

            //
            // // y[0][1],y[1][1],y[2][1]...
            console.log(message)
            //

            // console.log(x);

            var places = ['Lachulung', 'Sia', 'Khardung', 'Sasser', 'Zoji', 'Gyong', 'Indira', 'Rezang', 'Tanglang', 'Marsimik', 'Pensi'];


            var lowerMessage = message.toLowerCase();
            var messageArray = lowerMessage.split(' ');
            let intersection = messageArray.filter(x => places.includes(x));
            // console.log(intersection);

            var generalPosition = {
                "Khardung": "A",
                "Lachulung": "B",
                "Sasser": "C",
                "Gyong": "D",
                "Sia": "E",
                "Zoji": "F",
                "Indira": "G",
                "Rezang": "H",
                "Tanglang": "I",
                "Pensi": "J",
                "Marsimik": "K"
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

            var map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
            // console.log(alphaPos['A']);

            var nodes = [];
            for (i = 0; i < intersection.length; i++) {
                nodes.push(generalPosition[intersection[i]]);
            }
            for (i = 0; i < map.length; i++) {
                let cross = nodes.filter(x => alphaPos[map[i]].includes(x));
                if (cross.length == nodes.length) {
                    var stratpose = map[i];
                    break;
                }
            }

            for (i = 0; i < nodes.length; i++) {
                console.log(cordPos[nodes[i]]);
            }
            console.log(cordPos[stratpose]);
            console.log(stratpose);

            -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -












            app.get("/", function (req, res) {
                    var encryptedMessage = "aan  sa ro i 'tGdLy cna_MdukgrMrty aaeaoM_yydfLid!eramyW mak!ea n ";
                    var key = ("misSissiPPI").toUpperCase();
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
                })








                -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

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
                    res.render("final", {
                        pos: stratpose,
                        coord: cordPos[stratpose],
                        message: message
                    })
                })



                //--------------------------------------------------------------------------------------------------------------------------
                <
                div class = "diagram" >
                <
                div class = "circle"
            id = "B" > B < /div> <
                div class = "circle"
            id = "E" > E < /div> <
                div class = "circle"
            id = "I" > I < /div> <
                div class = "circle"
            id = "A" > A < /div> <
                div class = "circle"
            id = "C" > C < /div> <
                div class = "circle"
            id = "D" > D < /div> <
                div class = "circle"
            id = "F" > F < /div> <
                div class = "circle"
            id = "G" > G < /div> <
                div class = "circle"
            id = "H" > H < /div> <
                div class = "circle"
            id = "J" > J < /div> <
                div class = "circle"
            id = "K" > K < /div>


                <
                svg style = "width:615px; height:250px;" >
                <
                line x1 = "15"
            y1 = "115"
            x2 = "115"
            y2 = "15"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "115"
            y1 = "15"
            x2 = "215"
            y2 = "15"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "15"
            y1 = "115"
            x2 = "115"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "115"
            y1 = "115"
            x2 = "215"
            y2 = "15"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "115"
            y1 = "115"
            x2 = "215"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "15"
            y1 = "115"
            x2 = "115"
            y2 = "215"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "115"
            y1 = "215"
            x2 = "215"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "115"
            y1 = "215"
            x2 = "215"
            y2 = "215"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "215"
            y1 = "215"
            x2 = "315"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "215"
            y1 = "15"
            x2 = "315"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "315"
            y1 = "115"
            x2 = "415"
            y2 = "15"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "315"
            y1 = "115"
            x2 = "415"
            y2 = "215"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "415"
            y1 = "215"
            x2 = "515"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                line x1 = "415"
            y1 = "15"
            x2 = "515"
            y2 = "115"
            style = "stroke:black;stroke-width:2" / >
                <
                /svg> <
                /div>


                .circle {
                    position: absolute;
                    text - align: center;
                    background - color: white;
                    border - color: black;
                    border - radius: 50 % ;
                    border: 2 px solid;
                    height: 30 px;
                    width: 30 px;
                }

                .diagram {
                    position: absolute;
                    left: 500 px;
                    top: 5 % ;
                }

            # B {
                left: 100 px;
            }#
            E {
                left: 200 px;
            }#
            I {
                left: 400 px;
            }#
            A {
                top: 100 px;
            }#
            C {
                top: 100 px;
                left: 100 px;
            }#
            F {
                top: 100 px;
                left: 200 px;
            }

            #
            H {
                top: 100 px;
                left: 300 px;
            }#
            K {
                top: 100 px;
                left: 500 px;
            }#
            D {
                top: 200 px;
                left: 100 px;
            }#
            G {
                top: 200 px;
                left: 200 px;
            }#
            J {
                top: 200 px;
                left: 400 px;
            }







            //index.HTML

            <
            !DOCTYPE html >
                <
                html lang = "en"
            dir = "ltr" >

                <
                head >
                <
                meta charset = "utf-8" >
                <
                title > < /title> <
                !--CSS stylesheets-- >
                <
                link rel = "stylesheet"
            href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity = "sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin = "anonymous" >
                <
                link rel = "stylesheet"
            href = "styles.css" >

                <
                !--Bootstrap Scripts-- >
                <
                script src = "https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity = "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin = "anonymous" > < /script> <
                script src = "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity = "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossorigin = "anonymous" > < /script> <
                script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
            integrity = "sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
            crossorigin = "anonymous" > < /script> <
                /head>

                <
                body >

                <
                section id = "input" >
                <
                div class = "input-group key" >
                <
                div class = "input-group-prepend" >
                <
                /div> <
                input type = "text"
            class = "form-control"
            placeholder = "Enter encryption key"
            aria - label = "encryption key" >
                <
                /div> <
                div class = "input-group code" >
                <
                div class = "input-group-prepend" >

                <
                /div> <
                input type = "text"
            class = "form-control"
            placeholder = "Enter encrypted code"
            aria - label = "encrypted code" >
                <
                /div> <
                button type = "button"
            class = "btn btn-light submit-button" > submit < /button> <
                /section>

                <
                /body> <
                /html>



            //css

            body {
                background - image: url(background.jpg);
                background - size: 100 % 100 % ;
                background - repeat: no - repeat;
            }

            #
            input {
                padding: 17 % 25 % ;
                text - align: center;
            }

            .key {
                padding - bottom: 5 % ;
            }

            .form - control {
                    text - align: center;
                }

                .submit - button: hover {
                    background - color: black;
                    color: white;
                }

                .submit - button {
                    margin - top: 5 % ;
                }






                ===
                === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ==

                <
                div class = "diagram" >
                <
                %
                for (var i = 0; i < nodes.length; i++) {
                    % >
                    <
                    div class = "circle"
                    style = "background-color: #ff414d;"
                    id = < %= nodes[i] % >> < %= nodes[i] % > < /div> <
                        %
                } % >
                <
                %
                for (var i = 0; i < safe.length; i++) {
                    % >
                    <
                    div class = "circle"
                    style = "background-color: #cffffe;"
                    id = < %= safe[i] % >> < %= safe[i] % > < /div> <
                        %
                } % >
                <
                div class = "circle"
            style = "background-color: #c4fb6d;"
            id = < %= pos % >> < %= pos % > < /div>
            var safe = map.filter(function (val) {
                return nodes.indexOf(val) == -1;
            });
            res.render("message", {
                    pos: stratpose,
                    coord: cordPos[stratpose],
                    message: message,
                    nodes: nodes,
                    safe: safe,
                })












                <
                div class = "diagram" >
                <
                %
                for (var i = 0; i < nodes.length; i++) {
                    % >
                    <
                    div class = "popup"
                    onclick = "myFunction()" >
                        <
                        div class = "circle"
                    style = "background-color: #ff414d;"
                    id = < %= nodes[i] % >>
                        <
                        %= nodes[i] % >
                        <
                        span class = "popuptext"
                    id = "myPopup" > < %= enemyPlaceName[i] % > < /span></div >
                        <
                        /div> <
                        %
                } % >
                <
                %
                for (var i = 0; i < safe.length; i++) {
                    % >
                    <
                    div class = "popup"
                    onclick = "myFunction()" >
                        <
                        div class = "circle"
                    style = "background-color: #b2ebf2;"
                    id = < %= safe[i] % >>
                        <
                        %= safe[i] % >
                        <
                        span class = "popuptext"
                    id = "myPopup" > < %= safePlaceName[i] % > < /span></div >
                        <
                        /div> <
                        %
                } % >
                <
                div class = "popup"
            onclick = "myFunction()" >
                <
                div class = "circle"
            style = "background-color: #79d70f;"
            id = < %= pos % >>
                <
                %= pos % >
                <
                span class = "popuptext"
            id = "myPopup" >
                <
                %= strategicPosition % >
                <
                /span> <
                /div> <
                /div>

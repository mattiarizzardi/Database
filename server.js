var express = require ('express');

var app = express ();

var server = app.listen(3000, listening);

//Recupero gli elementi dell'altro file:
var fs = require ('fs');
var data = fs.readFileSync('words.js');
var words = JSON.parse (data);
console.log (words);

function listening () {
    console.log ("listening...");
}

app.use (express.static('website'));

//Aggiunge un elemento alla lista:
app.get ('/add/:word/:score', addWord);

function addWord (req, res){
    var data = req.params;
    var word = data.word;
    var score = Number (data.score);
    var reply;
    
    if (!score){
        var reply = {
            msg: "Score is required"
        }
        res.send (reply);
    } else {
        words [word] = score;
        // Scrive il nuovo elemento nel file:
        var data = JSON.stringify (words, null, 2);
        fs.writeFile ('words.json', data, finished);

        function finished (err){
            console.log ('all set.');
            reply = {
                word: word,
                score: score,
                status: "sucess"
            } 
            res.send (reply);
        }
    }
}

// ritorna tutti gli elementi:
app.get('/all', sendAll);

function sendAll (req, res){
    res.send(words);
}

//Cerca un elemento:
app.get ('/search/:word/', searchWord);

function searchWord (req, res){
    var word = req.params.word;
    var reply;
    
    if (words [word]){
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    res.send (reply);
}






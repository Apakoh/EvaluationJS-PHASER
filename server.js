const express = require('express');
const server = express();
const port = 3000;
const address = "0.0.0.0";

server.use("/Assets", express.static(__dirname + '/Assets'));
server.use("/js", express.static(__dirname + '/Assets'));

server.engine('html', require('atpl').__express);
server.set('devel', false);
server.set('view engine', 'html');
server.set('view cache', false);
server.set('views', __dirname);

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


async function run()
{
    // Gestion of pages
    server.get('/', function(req, res){
      res.render('index.html');
    });

    server.listen(process.env.PORT || port, address, function() {
        console.log('Listening to port:  ' + port);
    });

}

run();

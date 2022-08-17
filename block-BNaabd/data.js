var http = require('http');
const { parse } = require('path');
var qs = require('querystring')

var server = http.createServer(handleRequest);

function handleRequest(req,res){
    var dataType = req.headers['content-type'];
    console.log(dataType)
    var store = '';
    req.on('data',(chunk)=>{
        store += chunk
    })
    req.on('end',()=>{
        if(dataType === 'application/json' && req.url === '/json' && req.method === 'POST'){
            var parseddata = JSON.parse(store);
            res.end(store)
        }
        if(dataType === 'multipart/form-data' && req.url === '/form' && req.method === 'POST'){
            var parsedData = qs.parse(store);
            // console.log(store)
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(8000,()=>{
    console.log('welcome')
})
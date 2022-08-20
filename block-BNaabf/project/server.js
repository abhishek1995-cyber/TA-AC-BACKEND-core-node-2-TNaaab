// server

var http = require('http');
var fs = require('fs');
let qs = require("querystring");

var server = http.createServer(handleRequest);

function handleRequest(req,res){
    var store = '';
    req.on('data',(chunck)=>{
        store += chunck
    })
    req.on('end',()=>{
        if(req.method === 'GET' && req.url === '/form'){
            res.setHeader('Content-Type','text/html')
            fs.createReadStream('./project/form.html').pipe(res)
        }
        if(req.method === 'POST' && req.url === '/form'){
            let parsedData = qs.parse(store);
            res.setHeader('Content-Type','text/html')
            res.write(`<h2>${parsedData.name}</h2>`);
            res.write(`<h3>${parsedData.email}</h3>`);
            res.write(`<p>${parsedData.age}</p>`);
            res.end()
        }
    })
}

server.listen(3000,()=>{
    console.log('listening on port 3k')
})
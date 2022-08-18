// var path = require('path')

// var absolutePath =  __dirname;
// console.log(absolutePath);

// var appPath = path.join(__dirname,'app.js')

// var relativePath = "./app.js";

// console.log(appPath)

// var relativePathofindex = './index.html';
// console.log(relativePathofindex);

// var indexPath = path.join(__dirname,'index.html');
// console.log(indexPath)


// creating server

// var http = require('http');

// var server = http.createServer(handleRequest);

// function handleRequest(req,res){
//     var store = '';
//     req.on('data',(chunk)=>{
//         store += chunk
//     })
//     req.on('end',()=>{
//         if(req.method === 'POST'){
//             res.setHeader('content-type','text/json')
//             res.statusCode = 201
//             res.end(store)
//             console.log(store)
//         }
//         if(req.method === 'POST'){
//             var dataformat = req.headers['Content-Type'];
//             console.log(dataformat);
//             res.setHeader('content-type','form-data')
//             res.statusCode = 201
//             res.end(store)
//             console.log(store)
//         }
//     })
// }

// server.listen(3000, ()=>{
//   console.log('welcome')
// })


// form type


// var http = require('http');

// var server = http.createServer(handleRequest);
// var qs = require('querystring')

// function handleRequest(req,res){
//     var store = '';
//     req.on('data',(chunk)=>{
//         store += chunk
//     })
//     req.on('end',()=>{
//         if (req.method === "POST" && req.url === "/") {
//             res.writeHead(201, "Content-Type : application/json");
//             // console.log(result);
//             res.end(store);
//           }
//     })
// }

// server.listen(3000, ()=>{
//   console.log('welcome')
// })


// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form 
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin



// var http = require('http');

// var server = http.createServer(handleRequest);
// var qs = require('querystring')

// function handleRequest(req,res){
//     var store = '';
//     req.on('data',(chunk)=>{
//         store += chunk
//     })
//     req.on('end',()=>{
//         if(req.method === 'POST' && contentType === "application/x-www-form-urlencoded"){
//             let parsedData = qs.parse(store)
//             res.statusCode = 201
//             res.end(JSON.stringify( parsedData))
//         }
//     })
// }

// server.listen(3000, ()=>{
//   console.log('welcome')
// })



// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>


let server9 = http.createServer(handleRequest9);
function handleRequest9(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let objectKeys = Object.keys(data);
    response.end(`<h1>${objectKeys[0]}</h1><h2>${objectKeys[1]}</h2>`);
  });
}
server9.listen(1111, "127.0.0.6", () => {
  console.log("Server is running on the port 1111");
});


let server3 = http3.createServer(handleRequest3);
function handleRequest3(request, response) {
  let data = "";
  request.on("data", (chunk) => {
    data += chunk;
  });
  request.on("end", () => {
    let result = qs.parse(data);
    let objectKeys = Object.keys(result);
    response.setHeader("Content-Type", "text/html");
    response.end(`<h1>${objectKeys[0]}</h1><h2>${objectKeys[1]}</h2>`);
  });
}
server3.listen(10000, "127.0.0.5", () => {
  console.log("Server is running on the port 10000");
});


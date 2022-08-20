let http = require("http");
let path = require("path");
let fs = require("fs");
let server = http.createServer(handleRequest);
let url = require("url");
const { on } = require("events");

let userDir = path.join(__dirname, "users/");
// Each user will be stored inside users dircetory by creating a file which will be based on user's username which should be unique.
function handleRequest(req, res) {
  //Getting the parsed url as the user request someting
  let parsedUrl = url.parse(req.url, true);
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    // Create  a file inside the  users directory and  add data by the  postman and named this file with  the username value
    if (req.method === "POST" && req.url === "/users") {
      let parsedData = JSON.parse(store);
      fs.open(userDir + parsedData.username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        console.log(fd);
        fs.write(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, (err) => {
            if (err) return console.log(err);
            res.setHeader("Content-Type", "text/plain");
            res.end(`${parsedData.username} is created successfully`);
          });
        });
      });
    }
    // To read a file  by using  the url only

    if (req.method === "GET" && parsedUrl.pathname === "/users") {
      let fileName = parsedUrl.query.username;
      fs.readFile(userDir + fileName + ".json", "utf8", (error, content) => {
        if (error) return console.log(error);
        res.end(content);
      });
    }

    //Updating  the user file by first removing all the data of the file  and by adding new data
    //Means by updating  the data .Used  ftruncate  method of file  system  module to delete  the user file data .
    if (req.method === "PUT" && parsedUrl.pathname === "/users") {
      let parsedData = JSON.parse(store);
      fs.open(userDir + parsedUrl.query.username + ".json", "r+", (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, (err) => {
              if (err) return console.log(err);
              res.setHeader("Content-Type", "text/plain");
              res.end(`${parsedData.username} is updated successfully`);
            });
          });
        });
      });
    }
    //Deleting  the user data  && deleting the whole user file
    if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
      //here we are deleting  the user data based on a username
      fs.unlink(userDir + parsedUrl.query.username + ".json", (err) => {
        if (err) return console.log(err);
      });
    }
  });
}
server.listen(9999, "localhost", () => {
  console.log("server is runnig on the 9999 port");
});
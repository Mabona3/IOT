// import http from 'http';
// import path from 'path';
// import fs from 'fs';
//
// // note: > npm install http path fs nodemon
// // nodemon == nodemonitor (needs sudo priv. to install)
// // add 'type': 'module' to package.json to validate modern import in ES6
//
// // variables and constants
// const hostname = 'localhost';
// const port = 4000;
//
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//
//   if (req.method == 'GET') {
//     // check url
//     var fileUrl;
//     if (req.url == '/') fileUrl = '/index.html';
//     else
//       fileUrl = req.url;
//     // resolving the file path
//     var fullPath = path.resolve('.' + fileUrl) // resolve the full path
//     var fileExt = path.extname(fullPath)  // get the extention
//     // checking errors
//     if (fileExt === '.html') {
//       let fileExists = fs.exists(fullPath, function (exists) {
//         if (exists === false) {
//           res.writeHead(404, { 'content-type': 'text/html' });
//           res.end("<html><body><h1>file not found </h1></body></html>")
//         } else {
//           res.writeHead(200, { 'Content-type': 'text/html' });
//           fs.createReadStream(fullPath).pipe(res);
//           return;
//         }
//       })
//     } else {
//       res.writeHead(404, { 'Content-type': 'text/html' });
//       res.end(`error 404: ${req.url} not found`)
//     }
//   } else if (req.method === 'POST') {
//     console.log(req.url)
//     if (req.url === '/SysOn' || req.url === '/SysOff') {
//       fileUrl = '/process.html'
//       var fullPath = path.resolve('.' + fileUrl) // resolve the full path
//       res.writeHead(200, { 'Content-type': "text/html" })
//       fs.createReadStream(fullPath).pipe(res);
//       return;
//     } else {
//       res.writeHead(404, { 'content-type': 'text/html' });
//       res.end(`error 404: ${req.method} not supported`)
//     }
//   } else {
//     res.writeHead(404, { 'content-type': 'text/html' });
//     res.end(`error 404: ${req.method} not supported`)
//   }
// })
//
// server.listen(port, hostname, () => {
//   console.log(`server running on http://${hostname}:${port}`)
// });

const express = require('../public/node_modules/express')
const morgan = require('../public/node_modules/morgan')
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/../public/'))
app.use(morgan('combined'))

app.post('/SysOn', (req,res) => {
  console.log('System On')
  res.status(304)
  res.end()
})

app.post('/SysOff', (req,res) => {
  console.log('System Off')
  res.status(304)
  res.end()
})

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});

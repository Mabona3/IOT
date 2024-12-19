var http = require("http");
const mraa = require("mraa");
var fs = require("fs");
var path = require("path");
var hostname = "169.254.10.84";
var port = 1337;
var interval;

var server = http.createServer(function(req, res) {
  console.log("Request for " + req.url + " by method " + req.method);
  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") fileUrl = "/index.html";
    else fileUrl = req.url;
    var filePath = path.resolve("../public" + fileUrl);
    var fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, function(exists) {
        if (!exists) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(
            "<html><body><h1>Error 404: " + req.url +
            " not found </h1></body></html",
          );
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        "<html><body><h1>Error 404: " + fileUrl +
        " not an html file</h1></body></html",
      );
    }
    return;
  } else if (req.method == "POST") {
    if (req.url == "/SysOn") {
      console.log("System On");
      res.writeHead(301, { "Content-Type": "text/json" });
      res.end('{"done": true}');
      //mraaWork();
      return;
    } else if (req.url == "/SysOff") {
      console.log("System Off");
      res.writeHead(301, { "Content-Type": "text/json" });
      res.end('{"done": true}');
      if (interval) {
        clearInterval(interval);
      }
      return;
    }
  }
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(
    "<html><body><h1>Error 404: " + req.method +
    " not supported</h1></body></html",
  );
});

server.listen(port, hostname, function() {
  console.log("Server is running at http://" + hostname + ":" + port);
});
function mraaWork() {
  console.log("mazen and atwa's team with mraa: ", mraa.getversion());

  const high = 1;
  const low = 0;
  const level_sensor = new mraa.aio(0);
  const motor = new mraa.pwm(3);
  const led2 = new mraa.gpio(6);
  const led3 = new mraa.gpio(9);

  led2.dir(mraa.dir_out);
  led3.dir(mraa.dir_out);

  led2.write(low);
  led3.write(low);

  motor.enable(true);
  motor.period_us(2000);

  motor.write(high);

  function writemotor() {
    const level = level_sensor.read();
    console.log(level);

    if (level > 900) {
      motor.write(low);
    } else {
      motor.write(low);
    }
  }

  interval = setInterval(writemotor, 1000);
}

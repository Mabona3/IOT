const express = require('../public/node_modules/express')
const morgan = require('../public/node_modules/morgan')

const app = express();

const port = 3000;

app.use(express.static(__dirname + '/../public/'))
app.use(morgan('combined'))

app.post('/SysOn', (_req,res) => {
  console.log('System On')
  res.status(304)
  res.end()
})

app.post('/SysOff', (_req,res) => {
  console.log('System Off')
  res.status(304)
  res.end()
})

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});

const connectToMongo=require("./db");
const express = require('express')
var cors = require('cors')
const app = express()
connectToMongo();
app.use(cors())
const port = 5000
app.use(express.json());
// available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})
var express = require('express');
var cors = require('cors');
var multer = require('multer')
const os = require("os");
const tempDir = os.tmpdir();

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: tempDir + '/uploads' })
app.post('/api/fileanalyse',upload.single('upfile'), function(req, res){
    res.json({"name": req.file.originalname, "type":req.file.mimetype, "size": req.file.size})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

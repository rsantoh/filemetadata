var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
const upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.get('/api/fileanalyse/', (req, res) => {
  const short_url = Number(req.params.short_url);
  const record = urls.find(entry => entry.short_url === short_url);

  if (record) {
    res.redirect(record.original_url);
  } else {
    res.json({ error: 'No short URL found for given input' });
  }
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json(
      {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      }
    );
});
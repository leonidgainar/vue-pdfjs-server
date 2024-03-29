const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/send_data", upload.single('data'), (req, res, next) => {
    const json = JSON.parse(req.body.data);
    console.log(json);
    fs.writeFile('uploads/data.json', JSON.stringify(json), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json({ message: "Successfully received data" });
});

app.get("/get_data", (req, res, next) => {
    fs.readFile('uploads/data.json', 'utf8', (err, data) => {
        console.log(data);
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started...`);
});
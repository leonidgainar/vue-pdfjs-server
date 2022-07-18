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

app.post("/send_data", upload.single('data'), (req, res, next) => {
    const json = JSON.parse(req.body.data);
    console.log(json);
    fs.writeFile('uploads/jsonfile.json', JSON.stringify(json), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json({ message: "Successfully received data" });
});

app.get("/get_data", (req, res, next) => {
    fs.readFile('uploads/jsonfile.json', 'utf8', (err, data) => {
        console.log(data);
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.listen(5000, () => {
    console.log(`Server started...`);
});
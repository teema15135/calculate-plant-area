const express = require('express');
const app = express();
const multer = require('multer');
const mime = require('mime-types');
const spawn = require("child_process").spawn;

app.use(multer({
    dest: 'uploads/',
    rename: function (fieldname, filename) {
        return Date.now();
    },
}).single('file'));
app.use('/portal', express.static('public'));
app.use('/processed', express.static('processed'))

app.get('/', function (req, res) {
    res.json({ message: "Welcome to service" });
});

app.post('/upload', function (req, res) {
    const filePath = __dirname + '/' + req.file.path;
    console.log(filePath);
    const pythonProcess = spawn('python3', ["./python/process.py", filePath]);
    var isComplete = false;
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        / Don't know if python error or not /
        isComplete = true;
        res.sendFile(__dirname + '/processed/' + data.toString().replace('\n', ''));
    });
    setTimeout(function () {
        if (!isComplete) {
            res.send('Process timeout !!!');
        }
    }, 10000);
});

app.listen(8000, function () {
    console.log("Listening on port 8000");
});

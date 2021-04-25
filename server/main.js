// Beiboot Server

// .env variabels
require('dotenv').config();
const DATA_DIRECTORY = process.env.DATA_DIRECTORY || './data';
const FILE_PATTERN = process.env.FILE_PATTERN || '\.(jpg|jpeg)$';
const PORT = process.env.PORT || 3000;

// fs Varuabels
const fs = require('fs').promises;

// get directory tree
const dirTree = require("directory-tree");
const tree = dirTree(DATA_DIRECTORY, {extensions: new RegExp(FILE_PATTERN)});

// init express with cors
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// ExifReader
const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;


function addMetaToTree(tree) {
    async function loadMonoCounter(file) {
        const data = await fs.readFile(file);
        return new Buffer.from(data);
    }

    tree.forEach(dirItem => {
        dirItem.children.forEach(dirParent => {
            dirParent.children.forEach(dirChild => {
                loadMonoCounter(dirChild.path).then(data => {
                    dirChild.meta = ExifReader.load(data, {expanded: true})
                })
            })
        })
    })

    return tree;
}

app.get('/', function (req, res) {
    res.send(addMetaToTree(tree.children));
});

app.get('/data/:name/:category/:file', function (req, res) {
    let options = {
        root: DATA_DIRECTORY,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    let fileName = req.params.name + '/' + req.params.category + '/' + req.params.file
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
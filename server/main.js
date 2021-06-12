// Beiboot Server

// .env variabels
require('dotenv').config();
const DATA_DIRECTORY = process.env.DATA_DIRECTORY || '../data';
const FILE_PATTERN = process.env.FILE_PATTERN || '\.(jpg|jpeg)$';
const PORT = process.env.PORT || 3000;

// fs variabels
const fs = require('fs');
const fsPromises = fs.promises;
// fs.createReadStream( DATA_DIRECTORY );

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

// Filter FS
const find = require('find');

function addMetaToTree(computedTree) {
    async function loadMonoCounter(file) {
        const data = await fsPromises.readFile(file);
        return new Buffer.from(data);
    }

    computedTree = computedTree.filter(function( element ) {
        return element !== undefined;
    });

    computedTree.forEach(dirItem => {
        function scanDir(dir) {
            dir.children.forEach(dirParent => {
                dirParent.children.forEach(dirChild => {
                    if (dirChild.type === 'file') {
                        loadMonoCounter(dirChild.path).then(data => {
                            dirChild.meta = ExifReader.load(data, {expanded: true})
                        })
                    }
                    // Disable inner Folders
                    // else {
                    //     scanDir(dirChild)
                    // }
                })
            })
        }
        scanDir(dirItem)
    })

    return computedTree;
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
            console.log(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
});

app.get('/search/:filter', function (req, res) {
    find.dir(new RegExp (`(${req.params.filter})(?!.*\\/)`), DATA_DIRECTORY, function(folders) {

        folders.forEach(function (folder, item) {
            folders[item] = tree.children.filter(elm => elm.path === folder)[0]
        })

        console.log('Sent filter results of:', req.params.filter)

        res.send(addMetaToTree(folders));
    })
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
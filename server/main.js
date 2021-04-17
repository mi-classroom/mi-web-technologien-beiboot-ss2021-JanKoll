// Beiboot Server

// fs Varuabels
const dir = './data/';
const fs = require('fs').promises;

// get directory tree
const dirTree = require("directory-tree");
const tree = dirTree(dir);

// init express with cors
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// ExifReader
const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;


const filePath = 'data/G_US_HAM_46-1987/01_Overall/G_US_HAM_46-1987_Overall-001.tif.jpg';



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

addMetaToTree(tree.children)


app.get('/', function (req, res) {
    res.send(addMetaToTree(tree.children));
});

app.get('/data/:name/:category/:file', function (req, res) {
    let options = {
        root: dir,
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
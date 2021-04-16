// Beiboot Server

// fs Varuabels
const dir = './data/';
const fs = require('fs');

// get directory tree
const dirTree = require("directory-tree");
const tree = dirTree(dir);

// init express with cors
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


console.log(tree.children);

// Start logic

// // "ls" any content in Folder
// async function readDir(path) {
//     try {
//         return await fs.readdir(path);
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// }

app.get('/', function (req, res) {
    res.send(tree.children);
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
    console.log(`listening on ${port}`);
});
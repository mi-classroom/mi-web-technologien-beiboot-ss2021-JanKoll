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
    console.log('call: /')
    res.send(tree.children);


});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
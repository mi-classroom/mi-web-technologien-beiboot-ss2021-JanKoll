// Beiboot Server

const dir = './data/';
// const fs = require('fs').promises;

const dirTree = require("directory-tree");
const tree = dirTree(dir);

const express = require('express');
const app = express();


console.log(tree.children)

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

app.listen(3000);

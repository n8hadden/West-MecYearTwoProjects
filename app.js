// Access node modules
const zlib = require('zlib');
const Buffer = require('buffer').Buffer;
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

async function compressFile(file, newFile) {
    const gzip = zlib.createGzip();
    const inp = await fs.createReadStream(file);
    const out = await fs.createWriteStream(newFile);    
    inp.pipe(gzip).pipe(out);

    return newFile;
}

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
        const file = req.file;
        const newFile = await compressFile(file, newFile);
        
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Something went wrong" });
    }
    
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

const multer = require('multer');
app.use(express.static('./public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })


app.get('/', (req, res) => {
    res.status(200).render("upload", {file: null});
})

app.post('/uploads', upload.single('file'), function (req, res, next) {
    if (req.body) {
        res.status(200).render('upload', { file: req.file.originalname });
    } else {
        res.status(400);
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
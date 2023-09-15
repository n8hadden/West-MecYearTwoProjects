const fs = require('fs'); // Makes use of file system
const showdown = require('showdown'), 
    converter = new showdown.Converter();
    const file = fs.createReadStream('markdown.md', 'utf8'); 

file.on('data', (text) => {
    var html = converter.makeHtml(text); // References the contents of the markdown file.
    const stream = fs.createWriteStream('convert.html');
    stream.write(html); // Creates a new html file based on the markdown file
    stream.end();
    console.log('html file created');
});
const inquirer = require('inquirer');

const qr = require('qr-image');

const fs = require('fs');

inquirer
    .prompt([
        {
            message: "Type in your URL: ",
            name: "URL"
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream("qr_img.png"));

        fs.writeFile("URL.txt", url, (err) => {
            if(err) throw err;
            console.log("The file has been saved!");
        });
    })
    
    .catch((error) => {
        if(error.isTtyError) {

        } else {

        }
    })
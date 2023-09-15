// Require https module
const https = require("https");

function getDef(term) {
    try {
        // Request data
        const request = https.get(
            `https://dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=43158f93-4b49-4169-bc3e-8e97b37297c6`,
            (response) => {
                let body = "";
                // Read the data
                response.on("data", (data) => {
                    body += data.toString();
                });

                response.on("end", () => {
                    // Parse the data
                    const definition = JSON.parse(body);
                    // Print the data
                    console.log(definition[0].shortdef);
                });
            }
        );

        request.on("error", (error) => {
            console.error(error.message);
        })
    } catch (error) {
        console.error(error.message);
    }
}

const query = process.argv.slice(2);
query.forEach(getDef);
var { google } = require('googleapis');
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];
var http = require('http')


function getAccessToken() {
    return new Promise(function (resolve, reject) {
        var key = require("./service-account.json");
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

var server = http.createServer(function (req, res) {
    getAccessToken().then(function (access_token) {
        res.end(access_token)
    })
})

server.listen(3000, function () {
    console.log("Server Started at http://localhost:3000/")
})
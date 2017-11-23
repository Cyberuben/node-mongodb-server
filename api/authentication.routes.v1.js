//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();

var auth = require('../auth/authentication');

//
// Hier gaat de gebruiker inloggen.
// Input: username en wachtwoord
// ToDo: 
//	 - zoek de username in de database, en vind het password dat opgeslagen is
// 	 - als user gevonden en password matcht, dan return valide token
//   - anders is de inlogpoging gefaald - geef foutmelding terug.
//
router.post('/login', (req, res) => {

    // Even kijken wat de inhoud is
    // console.dir(req.body);

    // De username en pwd worden meegestuurd in de request body
    var username = req.body.username;
    var password = req.body.password;

    // Dit is een dummy-user - die haal je natuurlijk uit de database.
    // Momenteel zetten we ze als environment variabelen. (Ook op Heroku!)
    var _dummy_username = process.env.APP_USERNAME || "username";
    var _dummy_password = process.env.APP_PASSWORD || "test";

    // Kijk of de gegevens matchen. Zo ja, dan token genereren en terugsturen.
    if (username == _dummy_username && password == _dummy_password) {
        var token = auth.encodeToken(username);
        res.status(200).json({
            "token": token,
        });
    } else {
        // console.log('Input: username = ' + username + ', password = ' + password);
        res.status(401).json({ "error": "Invalid credentials, bye" })
    }

});

// Hiermee maken we onze router zichtbaar voor andere bestanden. 
module.exports = router;
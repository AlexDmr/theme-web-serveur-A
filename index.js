console.log(`Serveur A exécuté sur NodeJS v${process.versions.node}!`);

const https = require('https');
const fs = require("fs");
const cors = require('cors')
const express = require('express');
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use('/noCORS', express.static('static'))
app.use('/withCORS', cors(), express.static('static'))


app.listen(8080, () => console.log("A : Le serveur HTTP écoute sur le port 8080") );

let priv, cert;
if (!fs.existsSync("./private.key")) {
    console.error("Pour démarrer le serveur HTTPS : Vous devriez avoir un fichier private.key contenant votre clef privé");    
} else {
    priv = fs.readFileSync("./private.key");
}

if (!fs.existsSync("./signature.cert")) {
    console.error("Pour démarrer le serveur HTTPS : Vous devriez avoir un fichier signature.cert contenant votre clef privé");    
} else {
    cert = fs.readFileSync("./signature.cert");
}

if (!!priv && !!cert) {
    https.createServer({key: priv, cert}, app).listen(8443, () => console.log("A : Le serveur HTTPS écoute sur le port 8443") )
}

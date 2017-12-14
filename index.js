'use strict';

const APP_PUBLIC_IP_ENDPOINT = "http://169.254.169.254/latest/meta-data/public-ipv4";
const APP_LOCAL_IP_ENDPOINT = "http://169.254.169.254/latest/meta-data/local-ipv4";
const APP_ZONE_ENDPOINT = "http://169.254.169.254/latest/meta-data/placement/availability-zone";
const APP_HOSTNAME_ENDPOINT = "http://169.254.169.254/latest/meta-data/hostname"

const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const r2 = require('r2');

const public_ip = r2.get(APP_PUBLIC_IP_ENDPOINT).text;
const local_ip = r2.get(APP_PUBLIC_IP_ENDPOINT).text;
const hostname = r2.get(APP_HOSTNAME_ENDPOINT).text;
const zone = r2.get(APP_ZONE_ENDPOINT).text;

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(express.static(path.join(__dirname, 'static')));
app.enable('view cache');

app.set('view engine', 'handlebars');

/**
 * HTML Endpoint
 */
app.get('/', (req, res) => {

    let data = {
        zone: zone,
        public_ip: public_ip,
        local_ip: local_ip,
        hostname: hostname
    };

    res.render('home', data);

});

/**
 * API Endpoint
 */
app.get('/whoami', (req, res) => {

    let data = {
        zone: zone,
        public_ip: public_ip,
        local_ip: local_ip,
        hostname: hostname
    };

    res.json(data);

});


/**
 * Healthcheck Endpoint
 */
app.get('/healthcheck', (req, res) => {
    res.json({ status: 200 });
});

app.listen(8080);
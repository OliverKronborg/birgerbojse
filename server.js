// IMPORTS
// ============================================================================
const express = require('express');
const spdy = require('spdy');
const pjson = require('./package.json');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const fs = require('fs');
const port = process.env.PORT || 3000;
const debug = require('debug')('kodebase');
const options = {
	'key': fs.readFileSync('ssl/localhost-privkey.pem'),
	'cert': fs.readFileSync('ssl/localhost-cert.pem')
};

// SERVER
// ============================================================================
const app = express();

// CONFIG
// ============================================================================
app.set('views', 'views');           // In which directory are views located
app.set('view engine', 'ejs');       // Which view engine to use
app.use(express.static('./public')); // Where are static files located

app.use(bodyParser.json());          // Accept JSON objects in requests
// Accept extended form elements in requests
app.use(bodyParser.urlencoded({
	'extended': true
}));

// Setup session handling
app.use(session({
	'resave': false,
	'saveUninitialized': true,
	'secret': 'really secret stuffs'
}));

app.use(logger('dev'));						// Setup console logging of route events

// Setup database connection
const db = mysql.createPool({
	'connectionLimit': 10,
	'host': process.env.DB_HOST,
	'user': process.env.DB_USER,
	'password': process.env.DB_PSWD,
	'database': process.env.DB_DTBS
});

// ROUTES
// ============================================================================
app.get('/', (req, res) => {
	res.render('page', { 'title': 'Hello, World!', 'content': `It's nice to meet you :-)` 	
	});
});

app.get('/topunkten', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktto', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors LIKE "rød"; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunkttre', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors in('rød', 'blå'); `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktfire', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors not LIKE "rød" order by names; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktfem', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.names like 'b%'; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktseks', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.names like '%e%'; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktsyv', (req, res) => {
	db.query(`SELECT bolche.names, bolche.weights FROM birgers_bolcher.bolche WHERE bolche.weights < 10 order by bolche.weights; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktotte', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.weights between 10 and 12 order by bolche.names, bolche.weights ;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktni', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche order by bolche.weights desc limit 3 ;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/topunktti', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche  order by rand() limit 1;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});


app.get('/firepunkten', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche
	INNER JOIN birgers_bolcher.colors 
	ON bolche.colors = colors.id 
	INNER JOIN birgers_bolcher.acidityses 
	ON bolche.taste_aciditys = acidityses.id 
	INNER JOIN birgers_bolcher.strenghtses 
	ON bolche.taste_strengths = strenghtses.id 
	INNER JOIN birgers_bolcher.typeses 
	ON bolche.taste_types = typeses.id;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktto', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors = 1;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunkttre', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors in(1, 5);`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktfire', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors != 1 order by names;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktfem', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.names like 'b%';`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktseks', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.names like '%e%';`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktsyv', (req, res) => {
	db.query(`SELECT bolche.names, bolche.weights FROM birgers_bolcher.bolche WHERE bolche.weights < 10 order by bolche.weights; `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktotte', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.weights between 9 and 13 order by bolche.names, bolche.weights ;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktni', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche INNER JOIN birgers_bolcher.colors ON bolche.colors = colors.id INNER JOIN birgers_bolcher.acidityses ON bolche.taste_aciditys = acidityses.id INNER JOIN birgers_bolcher.strenghtses ON bolche.taste_strengths = strenghtses.id INNER JOIN birgers_bolcher.typeses ON bolche.taste_types = typeses.id order by bolche.weights desc limit 3 ;
	`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/firepunktti', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche  
	INNER JOIN birgers_bolcher.colors 
	ON bolche.colors = colors.id 
	INNER JOIN birgers_bolcher.acidityses 
	ON bolche.taste_aciditys = acidityses.id 
	INNER JOIN birgers_bolcher.strenghtses 
	ON bolche.taste_strengths = strenghtses.id 
	INNER JOIN birgers_bolcher.typeses 
	ON bolche.taste_types = typeses.id
	order by rand() limit 1;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/fem', (req, res) => {
	db.query(`SELECT * FROM birgers_bolcher.bolche;
	`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('opgavefem', { 'results': results});
	});
});

app.get('/sekspunkten', (req, res) => {
	db.query(`SELECT bolche.names FROM birgers_bolcher.bolche WHERE bolche.colors in(1, 5) ;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/sekspunktto', (req, res) => {
	db.query(`SELECT names FROM birgers_bolcher.bolche WHERE bolche.colors not in(1) order by names;`, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/sekspunkttre', (req, res) => {
	db.query(`select count(id) as count from birgers_bolcher.bolche where bolche.weights < 15 `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/sekspunktfire', (req, res) => {
	db.query(`select count(id) as count from birgers_bolcher.bolche `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/sekspunktfem', (req, res) => {
	db.query(` select AVG(weights) as snit
	from birgers_bolcher.bolche `, function (err, results) {
		if (err) res.send(err);
		debug(err)
		res.render('produkter', { 'results': results});
	});
});

app.get('/sekspunktseks', (req, res) => {
	db.query( `select bolche.names as secondname, bolche.prices as secondnumber from birgers_bolcher.bolche  order by prices desc limit 1`,function (err, results) {
		if (err) res.send(err);
		db.query(`select bolche.names as firstname, bolche.prices as firstnumber from birgers_bolcher.bolche  order by prices limit 1;`,function (err, resultat) {
			if (err) res.send(err);
		res.render('opgavesekspunktseks', { 'results': results, 'resultat':resultat});
	});
});
});



app.use((req, res) => {
	res.status(404);
	res.render('page', { 'title': '404: Not Found', 'content': error });
});

app.use((error, req, res, next) => {
	res.status(500);
	res.render('page', { 'title': '500: Internal Server Error', 'content': error });
});

// SERVER INIT
// ============================================================================
spdy.createServer(options, app).listen(port, () => {
	debug(
		`${pjson.name} v${pjson.version} is running on https://${process.env.SITE_HOST}:${port}`
	);
});

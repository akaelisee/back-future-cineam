const Client = require('../models/client');
const connection = require('../../config/connections');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../middleware/validation');

exports.postRegisterClient = async (req, res) => {

    // Variable
    const { lastname, firstname, email, password } = req.body;
    
    // LETS VALIDATE THE DATA BEFORE WE A CLIENT
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    connection.query('SELECT email FROM client WHERE email = ?', [email], async (error, results) => {
        if (error) console.log(error);

        if (results.length > 0) {
            return res.send('email deja utilisé');
        }

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        // CREATE NEW CLIENT
        connection.query('INSERT INTO client SET ?', {lastname: lastname, firstname: firstname, email: email, password: hashPassword}, function (error, results) {
            if (error) {
                console.error(error);
            }else {
                return res.status(201).send('Client enregisté');
            }
        })

    });
}

exports.postLoginClient = async (req, res) => {

    const { email, password } = req.body;

    // LETS VALIDATE THE DATA BEFORE WE A CLIENT
    let { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    connection.query('SELECT * FROM client WHERE email = ?', [email], async (error, results) => {
        if (error) console.log(error);

        if ( !results ) {
            return res.status(500).send('Email  incorrect');
        }else {

            const validPass = await bcrypt.compare(password, results[0].password);
            console.log(validPass);
            if (!validPass) return res.status(400).send('Invalid password');

            const id = results[0].id_client;
            const token = await jwt.sign({ id }, process.env.TOKEN_SECRET);

            res.header('Access-Control-Expose-Headers', 'auth-token').set('auth-token', token).send({
                id       : results[0].id_client,
                firstname: results[0].firstname,
                lastname : results[0].lastname,
                email    : results[0].email
            });
        }
    });
}

exports.getClients = async (req, res) => {

    try {
        connection.query('SELECT id_client, lastname, firstname, email FROM client', (error, rows, fields) => {
            if (error) console.log(error);
            const response = getClient(rows);
            res.render('clients.ejs', {results: response});
        });
    } catch (error) {
        console.log(error);
    }    
}

exports.deleteClients = async (req, res) => {

    const id = req.params.id; 
    const sql = `DELETE FROM client WHERE id_client= ${id}`;
    
    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/clients');
    });
}

function getClient(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_client,
                lastname: row.lastname,
                firstname: row.firstname,
                email: row.email
            }
        })
    };
    return response;
}
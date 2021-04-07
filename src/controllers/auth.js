// @ts-nocheck
const connection = require('../../config/connections');
const jwt = require('jsonwebtoken');
const { UserValidation } = require('../middleware/validation');
const cookieParser = require('cookie-parser');

exports.adminHome = (req, res) => {
    res.render('signin.ejs', {message: ''});
}

exports.postLoginUser = async (req, res) => {

    const { username, password } = req.body;

    // LETS VALIDATE THE DATA BEFORE WE A CLIENT
    let { error } = UserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) console.log(error);

        if ( !results ) {
            return res.status(500).send('username incorrect');
        }else {

            if (username !== results[0].username) {
                res.status(401).render('signin', {
                    message: 'Username ou Mot de passe incorrect'
                });
            }else {
                const id = results[0].id_user;
                const token = await jwt.sign({ id }, process.env.TOKEN_SECRET_JWT, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                
                res.status(200).redirect('/admin/account');
            }
        }
    });
}
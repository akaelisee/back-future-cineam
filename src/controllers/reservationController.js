const Reservation = require('../models/reservation');
const connection = require('../../config/connections');

exports.getReservationsAll = async (req, res) => {
    const sql = `SELECT reservation.id_reservation, reservation.id_client, reservation.place_choisir, client.lastname, client.firstname, programmes.id_program 
        FROM reservation 
        INNER JOIN client ON reservation.id_client = client.id_client
        INNER JOIN programmes ON reservation.id_program = programmes.id_program
        `;

    connection.query(sql, function (error, rows, fields) {
        if (error)  throw error;

        let response = getReservation(rows);
        res.render('reservation.ejs', {results: response});
    })
}

exports.getReservationsAllJson = async (req, res) => {
    const sql = `SELECT reservation.id_reservation, reservation.id_client, reservation.place_choisir, client.lastname, client.firstname, programmes.id_program 
        FROM reservation 
        INNER JOIN client ON reservation.id_client = client.id_client
        INNER JOIN programmes ON reservation.id_program = programmes.id_program
        `;

    connection.query(sql, function (error, rows, fields) {
        if (error)  throw error;
        let response = getReservation(rows);

        if (rows) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json({
                error: error
            });
        }
    })
}

exports.postReservationJson = async (req, res) => {
    // 
    const { id_client, id_program, place_choisir } = req.body;

    connection.query('INSERT INTO reservation SET ?', { id_client: id_client, id_program: id_program, place_choisir: place_choisir }, function (error, results) {
        if (error) console.error(error);

        if (results) {
            res.status(201).json({
                message: "created",
            });
        }
        else {
            res.status(500).json({
                error: error
            });
        }
    })
}

exports.getReservationsOne = async (req, res) => {

    const id = req.params.id; 

    const sqlProgram = 'SELECT programmes.id_program, salles.lib_salle, programmes.price, programmes.price_vip, programmes.date, movies.title, movies.overview, movies.poster_path, movies.release_date, genres.lib_genre FROM programmes, salles, movies, genres WHERE programmes.id_salle = salles.id_salle AND programmes.id_movie = movies.id_movie AND movies.id_genre = genres.id_genre AND programmes.id_program' ; 


    const sql = `SELECT reservation.id_reservation, reservation.place_choisir, client.lastname, client.firstname, programmes.id_program FROM reservation, programmes, client WHERE reservation.id_client = client.id_client AND reservation.id_program = programmes.id_program AND reservation.id_reservation = ${id}`

    connection.query(sql, (err, rows, fields) => {
        if (err)  throw err;

        connection.query(sqlProgram, (err, results, fields) => {
            if (err)  throw err;
            
            for (let i = 0; i < results.length; i++) {
                
                if (rows[0].id_program === results[i].id_program) {
                    
                    let response = {
                        id: rows[0].id_reservation,
                        place: rows[0].place_choisir,
                        lastname: rows[0].lastname,
                        firstname: rows[0].firstname,
                        programme : results[i]
                    }
                    res.render('detail-reservation.ejs', {results: response});
                }else {
                    console.log(err);
                }
            }
        });
    });
}

exports.deleteReservations = async (req, res) => {

    const id = req.params.id; 
    const sql = `DELETE FROM reservation WHERE id_reservation= ${id}`;

    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/account/reservations');
    });
}

function getReservation(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_reservation,
                place: row.place_choisir,
                lastname: row.lastname,
                firstname: row.firstname,
                programme: row.id_program,
                idClient: row.id_client
            }
        })
    };
    return response;
}
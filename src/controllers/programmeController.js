const Programme = require('../models/programme');
const connection = require('../../config/connections');

// List Movies
const getMovie = () => {
    return new Promise((resolve, reject) => {
        const sqlMovie = 'SELECT * FROM movies, genres WHERE movies.id_genre = genres.id_genre';
        connection.query(sqlMovie, function (err, rows, fields) {
            if (err) throw err;
            let response = getMoviesInProgramme(rows);
            resolve(response.data);
        });
    })
}

// List salle
const getSalle = () => {
    return new Promise((resolve, reject) => {
        const sqlSalle = 'SELECT * FROM salles';
        connection.query(sqlSalle, function (err, rows, fields) {
            if (err) throw err;
            let response = getSalleInProgramme(rows);
            resolve(response.data);
        });
    })
}


exports.getAddProgramme = async (req, res) => {
    let programme = '';
    const response = {
        movies:  await getMovie(),
        salles: await getSalle()
    }
    res.render('new-programmes.ejs', { results: response, programme: programme, alert: false});
}

exports.postProgramme = async (req, res) => {
    const response = {
        movies:  await getMovie(),
        salles: await getSalle()
    }

    // 
    const { id_movie, id_salle, date, time_program, price, price_vip } = req.body;
    connection.query('INSERT INTO programmes SET ?', {id_movie: id_movie, id_salle: id_salle, date: date, time_program: time_program, price: price, price_vip: price_vip}, function (error, results) {
        if (error) throw error;
        res.render('new-programmes.ejs', {alert: true, programme: '', results: response});
    })
}

exports.getProgrammesAll = async (req, res) => {
    const sql = `SELECT programmes.id_program, movies.title, salles.lib_salle, programmes.date, programmes.price, programmes.price_vip  FROM programmes 
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle`

    connection.query(sql, function (error, rows, fields) {
        if (error)  console.log(error);
        let response = getProgramme(rows);
        res.render('programme.ejs', {results: response});
    })
}

exports.getProgrammesAllJson = async (req, res) => {
    
    const sql = `SELECT programmes.id_program, movies.title, movies.poster_path, salles.lib_salle, programmes.date   
    FROM programmes 
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle`
    
    try {
        connection.query(sql, function (error, rows, fields) {
            if (error)  console.log(error);
    
            if (rows) {
                let response = getProgramme(rows);
                res.status(200).json(response);
            }
        });
        
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

// new test

exports.getProgrammesOne = async (req, res) => {

    const id = req.params.id; 
    const sql = `SELECT programmes.id_program, salles.lib_salle, salles.nombre, salles.place_vip, programmes.price, programmes.price_vip, programmes.date, programmes.time_program, movies.title, movies.overview, movies.poster_path, movies.backdrop_path, movies.time, genres.lib_genre
    FROM programmes
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle 
    INNER JOIN genres ON movies.id_genre = genres.id_genre
    WHERE programmes.id_program = ${id}
    `
    connection.query(sql, function (error, rows, fields) {
        if (error)  console.log(error);
        res.render('detail-programme.ejs', {results: rows[0]});
    })
}

exports.getProgrammesOneJson = async (req, res) => {

    const id = req.params.id; 

    const sql = `SELECT programmes.id_program, salles.lib_salle, salles.nombre, salles.place_vip, programmes.price, programmes.price_vip, programmes.date, programmes.time_program, movies.title, movies.overview, movies.poster_path, movies.backdrop_path, movies.time, genres.lib_genre
    FROM programmes
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle 
    INNER JOIN genres ON movies.id_genre = genres.id_genre
    WHERE programmes.id_program = ${id}
    `
    const sql1 = `SELECT reservation.id_reservation, reservation.id_client, reservation.place_choisir, client.lastname, client.firstname, programmes.id_program 
        FROM reservation 
        INNER JOIN client ON reservation.id_client = client.id_client
        INNER JOIN programmes ON reservation.id_program = programmes.id_program
        WHERE reservation.id_program = ${id}
        `;
 

    try {
        connection.query(sql, function (error, rows, fields) {
            if (error)  console.log(error);

            connection.query(sql1, function (error, rows1, fields) {
                if (error)  console.log(error);

                let response = getProgramme(rows);
                res.status(200).json({
                    programme: response,
                    reservation: rows1
                });
            });
        });
        
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

exports.editProgrammes = async (req, res) => {

    const id = req.params.id; 

    const sql = `SELECT programmes.id_program, movies.title, salles.lib_salle, programmes.date, programmes.price, programmes.price_vip  FROM programmes 
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle
    WHERE programmes.id_program = ${id}
    `

    const response = {
        movies:  await getMovie(),
        salles: await getSalle()
    }

    connection.query(sql, function (error, rows, fields) {
        if (error)  throw error;
        res.render('new-programmes.ejs', {alert: false, programme: rows[0], results: response});
    });
}

exports.updateProgrammes = async (req, res) => {

    const { id_movie, id_salle, date, price, price_vip } = req.body;
    const id = req.body.id_program; 

    const response = {
        movies:  await getMovie(),
        salles: await getSalle()
    }

    const sql = "update programmes SET id_movie='"+ id_movie +"', id_salle='"+ id_salle +"', date='"+ date +"', price='"+ price +"', price_vip='"+ price_vip+ "' WHERE id_program=" + id;
    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.render('new-programmes.ejs', {alert: true, results: response, programme: ''});
    });
}

exports.deleteProgrammes = async (req, res) => {

    const id = req.params.id; 
    const sql = `DELETE FROM programmes WHERE id_program= ${id}`;

    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/programmes');
    });
}



function getMoviesInProgramme(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_movie,
                title: row.title,
                overview: row.overview,
                poster_path: row.poster_path,
                release_date: row.release_date,
                genre: row.lib_genre
            }
        })
    };
    return response;
}

function getSalleInProgramme(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_salle,
                title: row.lib_salle
            }
        })
    };
    return response;
}

function getProgramme(rows) {
    let response = {
        length: rows.length,
        "success": true,
        results: rows.map(row => {
            return {
                id: row.id_program,
                movie: row.title,
                duree: row.time,
                salle: row.lib_salle,
                price: row.price,
                vip: row.price_vip,
                date: row.date,
                heure: row.time_program,
                nombre: row.nombre,
                place_vip: row.place_vip,
                overview: row.overview,
                poster_path: row.poster_path,
                backdrop_path: row.backdrop_path,
                genre: row.lib_genre
            }
        })
    };
    return response;
}
const connection = require('../../config/connections');



exports.getAddSalle = async (req, res) => {
    res.render('new-salles.ejs', { salle: '', alert: false});
}

exports.postSalle = async (req, res) => {
    // 
    const { id_salle, lib_salle, nombre, place_vip } = req.body;
    connection.query('INSERT INTO salles SET ?', {id_salle: id_salle, lib_salle: lib_salle, nombre: nombre, place_vip: place_vip}, function (error, results) {
        if (error) throw error;
        res.render('new-salles.ejs', {alert: true, salle: ''});
    })
}

exports.getSallesAll = async (req, res) => {
    const sql = 'SELECT * FROM salles';

    connection.query(sql, function (error, rows, fields) {
        if (error) throw error ;
        let response = getSalle(rows);

        res.render('salles.ejs', {results: response});
    })
}

exports.getSallesAllJson = async (req, res) => {
    const sql = 'SELECT * FROM salles';

    try {
        connection.query(sql, function (error, rows, fields) {
            if (error) throw error ;
            let response = getSalle(rows);
    
            res.status(200).json(response);
        })
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

exports.getIdSallesAllJson = async (req, res) => {
    
    const id = req.params.id ;

    const sql = `SELECT programmes.id_program, salles.lib_salle,salles.nombre, salles.place_vip, programmes.price, programmes.price_vip, programmes.date, movies.title, movies.overview, movies.poster_path, movies.release_date, genres.lib_genre 
    FROM programmes
    INNER JOIN movies ON programmes.id_movie = movies.id_movie 
    INNER JOIN salles ON programmes.id_salle = salles.id_salle
    INNER JOIN genres ON movies.id_genre = genres.id_genre
    WHERE salles.id_salle = ${id}`;

    try {
        connection.query(sql, function (error, rows, fields) {
            if (error) throw error;
    
            if (rows) {
                let response = getSalle(rows);
                res.status(200).json(response);
            }
        });
        
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}

exports.editSalles = async (req, res) => {

    const id = req.params.id; 

    const sql = `SELECT * FROM salles WHERE salles.id_salle = ${id}`

    connection.query(sql, function (error, rows, fields) {
        if (error)  throw error;
        res.render('new-salles.ejs', {alert: false, salle: rows[0] });
    });
}

exports.updateSalles= async (req, res) => {

    const { lib_salle, nombre, place_vip } = req.body;
    const id = req.body.id_salle; 

    const sql = "update salles SET lib_salle='"+ lib_salle +"', nombre='"+ nombre +"', place_vip='"+ place_vip+ "' WHERE id_salle=" + id;
    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.render('new-salles.ejs', {alert: true, salle: ''});
    });
}

exports.deleteSalles = async (req, res) => {

    const id = req.params.id; 
    const sql = `DELETE FROM salles WHERE id_salle= ${id}`;

    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/salles');
    });
}


function getSalle(rows) {
    let response = {
        length: rows.length,
        "success": true,
        results: rows.map(row => {
            return {
                id: row.id_salle,
                id_program: row.id_program,
                title: row.lib_salle,
                nombre: row.nombre,
                place_vip: row.place_vip,
                movie: row.title,
                price: row.price,
                price_vip: row.price_vip,
                date: row.date,
                overview: row.overview,
                poster_path: row.poster_path,
                genre: row.lib_genre
            }
        })
    };
    return response;
}
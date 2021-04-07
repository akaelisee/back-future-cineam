const Movie = require('../models/movie');
const connection = require('../../config/connections');
const cloudinary = require ('cloudinary').v2;

cloudinary.config({ 
    cloud_name : process.env.CLOUD_NAME, 
    api_key : process.env.API_KEY, 
    api_secret : process.env.API_SECRET  
});


// let alert = false;
const getGenre = () => {
    return new Promise((resolve, reject) => {
        const sqlGenre = 'SELECT * FROM genres';
        connection.query(sqlGenre, function (err, rows, fields) {
            if (err) throw err;
            let response = getGenreInMovies(rows);
            resolve(response.data);
        });
    })
}

exports.getMovieAll = (req, res) => {
    const sql = 'SELECT * FROM movies, genres WHERE movies.id_genre = genres.id_genre';
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        let response = getMovies(rows);
        res.render('movies.ejs', {results: response})
    })
}

exports.getMovieOne = (req, res) => {
    
    const id = req.params.id; 
    const sql = `SELECT * FROM movies, genres WHERE movies.id_genre = genres.id_genre AND movies.id_movie = ${id}`;
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        let response = getMovies(rows);
        res.render('detail-movie.ejs', {results: rows[0]})
    })
}

exports.getAddMovies = async (req, res) => {
    const resultGenre = await getGenre();

    let response = '';
    let alert = false
    res.render('new-movies', {movies: response, results: resultGenre , alert: alert});
}

exports.postMovies = async (req, res) => {
    let message = '';
    const {title, overview, release_date, id_genre, time } = req.body;
    const resultGenre = await getGenre();
    // verified if files exist
    if( !req.files ) return res.status(400).send('No files were uploaded.');

    let file_poster = req.files.poster_path;
    let file_backdrop = req.files.backdrop_path;

    if(file_poster.mimetype && file_backdrop.mimetype == "image/jpeg" || file_poster.mimetype && file_backdrop.mimetype == "image/png"|| file_poster.mimetype && file_backdrop.mimetype == "image/gif" ){ 

        cloudinary.uploader.upload(file_poster.tempFilePath, function (err, resultPoster) {

            if (err) return res.status(500).send(err);

            cloudinary.uploader.upload(file_backdrop.tempFilePath, function (err, resultBackdrop) {

                if (err) return res.status(500).send(err);
                
                const sql = "INSERT INTO movies (`title`,`overview`, `release_date`, `poster_path`, `backdrop_path`, `time`, `id_genre`) VALUES ('" + title +"', '" + overview +"', '" + release_date +"', '" + resultPoster.url +"', '" + resultBackdrop.url +"', '" + time +"', '" + id_genre +"')";
                
                    connection.query(sql, function(err, result) {
                        res.render('new-movies.ejs', {alert: true, movies: '', results: resultGenre});
                    });
            });
        });
    }else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.send(message);
    }
}

exports.editMovies = async (req, res) => {

    const id = req.params.id; 
    const sql = `SELECT * FROM movies, genres WHERE movies.id_genre = genres.id_genre AND movies.id_movie = ${id}`;

    const resultGenre = await getGenre();
    connection.query(sql, function (error, rows, fields) {
        if (error)  throw error;
        let response = getMovies(rows);
        res.render('new-movies.ejs', {movies: rows[0], results: resultGenre, alert: false});
    });
}

exports.updateMovies = async (req, res) => {

    let message = '';
    const {title, overview, release_date, id_genre } = req.body;

    // verified if files exist
    if( !req.files ) return res.status(400).send('No files were uploaded.');

    let file = req.files.poster_path;

    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){ 

        cloudinary.uploader.upload(file.tempFilePath, function (err, result) {

            if (err) return res.status(500).send(err);

            const sql = "INSERT INTO movies (`title`,`overview`, `release_date`, `poster_path`, `id_genre`) VALUES ('" + title +"', '" + overview +"', '" + release_date +"', '" + result.url +"', '" + id_genre +"')";
            
                connection.query(sql, function(err, result) {
                    res.redirect('/account/movies');
                });
        });
    }else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.send(message);
    }




    // 
    const { id_movie, id_salle, date, price, price_vip } = req.body;
    const id = req.body.id_program; 

    const sql = "update programmes SET id_movie='"+ id_movie +"', id_salle='"+ id_salle +"', date='"+ date +"', price='"+ price +"', price_vip='"+ price_vip+ "' WHERE id_program=" + id;
    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/movies');
    });
}

exports.deleteMovies = async (req, res) => {

    const id = req.params.id; 
    const sql = `DELETE FROM movies WHERE id_movie= ${id}`;

    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/movies');
    });
}


// Function
function getGenreInMovies(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_genre,
                genre: row.lib_genre
            }
        })
    };
    return response;
}

function getMovies(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_movie,
                title: row.title,
                overview: row.overview,
                poster_path: row.poster_path,
                backdrop_path: row.backdrop_path,
                time: row.time,
                release_date: row.release_date,
                genre: row.lib_genre
            }
        })
    };
    return response;
}


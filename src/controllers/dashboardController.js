const connection = require('../../config/connections');

const getSalle = () => {
    return new Promise((resolve, reject) => {
        const sqlMovie = 'SELECT * FROM salles';
        connection.query(sqlMovie, function (err, rows, fields) {
            if (err) throw err;
            
            resolve(rows);
        });
    })
}

const getProgramme = () => {
    return new Promise((resolve, reject) => {
        const sqlMovie = 'SELECT * FROM programmes';
        connection.query(sqlMovie, function (err, rows, fields) {
            if (err) throw err;
            
            resolve(rows);
        });
    })
}

const getReservation = () => {
    return new Promise((resolve, reject) => {
        const sqlMovie = 'SELECT * FROM reservation';
        connection.query(sqlMovie, function (err, rows, fields) {
            if (err) throw err;
            
            resolve(rows);
        });
    })
}

const getUser = () => {
    return new Promise((resolve, reject) => {
        const sqlMovie = 'SELECT * FROM users';
        connection.query(sqlMovie, function (err, rows, fields) {
            if (err) throw err;
            
            resolve(rows);
        });
    })
}


exports.getdashboard = async (req, res) => {

    let salle = await getSalle();
    let programme = await getProgramme();
    let reservation = await getReservation();
    let user = await getUser();
    res.render('dashboard.ejs', { salle: salle, programme: programme, reservation: reservation, user: user});
}
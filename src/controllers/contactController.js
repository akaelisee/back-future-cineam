const connection = require('../../config/connections');

exports.postContactJson = async (req, res) => {
    // 
    const { name, suject, message, date } = req.body;
    try {
        connection.query('INSERT INTO Contacts SET ?', { name: name, suject: suject, message: message, date: date}, function (error, results) {
            if (error) throw error;
             res.status(200).json({
                 created: 'Contact created'
             })
        })
        
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

exports.getContactsAll = async (req, res) => {
    const sql = 'SELECT * FROM contacts';

    connection.query(sql, function (error, rows, fields) {
        if (error) throw error ;
        let response = getContact(rows);
        res.render('contacts.ejs', {results: response, message: ''});
    })
}

exports.getContactsOne = async (req, res) => {
    const id = req.params.id;
    const sqlAll = 'SELECT * FROM contacts';
    const sql = `SELECT * FROM contacts WHERE id_contact = ${id}`;

    connection.query(sqlAll, function (error, rowsA, fields) {
        if (error) throw error ;
        connection.query(sql, function (error, rows, fields) {
            if (error) throw error ;
            let response = getContact(rowsA);
            res.render('contacts.ejs', {message: rows[0], results: response});
        });
    })
}

exports.deleteContacts = async (req, res) => {

    const sql = `DELETE FROM contacts`;

    connection.query(sql, (error, rows, fields) => {
        if (error)  throw error;
        res.redirect('/admin/account/contacts');
    });
}


function getContact(rows) {
    let response = {
        length: rows.length,
        "success": true,
        data: rows.map(row => {
            return {
                id: row.id_contact,
                name: row.name,
                message: row.message,
                date: row.date,
                suject: row.suject
            }
        })
    };
    return response;
}
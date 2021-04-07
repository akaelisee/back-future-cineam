class Programme {

    constructor(id_program, id_movie, id_salle, date) {
        this.id_program = id_program;
        this.id_movie = id_movie;
        this.id_salle = id_salle;
        this.date = date;
    }

    // getters
    get getId() {return this.id_program; }
    get getMovie() {return this.id_movie; }
    get getSalle() {return this.id_salle; }
    get getDate() {return this.date; }

    // setters
    set setId(id_program) { this.id_program = id_program; }
    set setMovie(id_movie) { this.id_movie = id_movie; }
    set setSalle(id_salle) { this.id_salle = id_salle; }
    set setDate(date) { this.date = date; }
}

module.exports = Programme;
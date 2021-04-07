class Genre {

    constructor(id_genre, lib_genre) {
        this.id_genre = id_genre;
        this.lib_genre = lib_genre;
    }

    // getters
    get getId() {return this.id_genre; }
    get getLib() {return this.lib_genre; }

    // setters
    set setId(id_genre) { this.id_genre = id_genre; }
    set setLib(lib_genre) { this.lib_genre = lib_genre; }
}

module.exports = Genre;
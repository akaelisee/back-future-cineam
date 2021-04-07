class Movie {

    constructor(id_movie, title, overview, poster_path, release_date, id_genre) {
        this.id_movie = id_movie;
        this.title = title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.id_genre = id_genre;
    }

    // getters
    get getId() {return this.id_movie; }
    get getTitle() {return this.title; }
    get getOverview() {return this.overview; }
    get getPoster() {return this.poster_path; }
    get getRelease() {return this.release_date; }
    get getIdGenre() {return this.id_genre; }

    // setters
    set setId(id_movie) { this.id_movie = id_movie; }
    set setTitle(title) { this.title = title; }
    set setOverview(overview) { this.overview = overview; }
    set setPoster(poster_path) { this.poster_path = poster_path; }
    set setDate(release_date) { this.release_date = release_date; }
    set setIdGenre(id_genre) { this.id_genre = id_genre; }
}

module.exports = Movie;
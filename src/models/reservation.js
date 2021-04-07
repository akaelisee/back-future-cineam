class Reservation {

    constructor(id_reservation, num_place, id_program, id_client) {
        this.id_reservation = id_reservation;
        this.num_place = num_place;
        this.id_program = id_program;
        this.id_client = id_client;
    }

    // getters
    get getId() {return this.id_reservation; }
    get getPlace() {return this.num_place; }
    get getProgramme() {return this.id_program; }
    get getClient() {return this.id_client; }

    // setters
    set setId(id_reservation) { this.id_reservation = id_reservation; }
    set setPlace(num_place) { this.num_place = num_place; }
    set setProgramme(id_program) { this.id_program = id_program; }
    set setClient(id_client) { this.id_client = id_client; }
}

module.exports = Reservation;
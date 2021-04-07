class Client {

    constructor(id_client, lastname, firstname, email, password) {
        this.id_client = id_client;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.password = password;
    }

    // getters
    get getId() {return this.id_client; }
    get getLastname() {return this.lastname; }
    get getFirstname() {return this.firstname; }
    get getEmail() {return this.email; }
    get getPassword() {return this.password; }

    // setters
    set setId(id_client) { this.id_client = id_client; }
    set setLastname(lastname) { this.lastname = lastname; }
    set setFirstname(firstname) { this.firstname = firstname; }
    set setEmail(email) { this.email = email; }
    set setPassword(password) { this.password = password; }
}

module.exports = Client;
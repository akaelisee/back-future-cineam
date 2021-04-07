class User {

    constructor(id_user, username, password) {
        this.id_user = id_user;
        this.username = username;
        this.password = password;
    }

    // getters
    get getId() {return this.id_user; }
    get getusername() {return this.username; }
    get getPassword() {return this.password; }

    // setters
    set setId(id_user) { this.id_user = id_user; }
    set setusername(username) { this.username = username; }
    set setPassword(password) { this.password = password; }
}

module.exports = User;
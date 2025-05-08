const  crypto = require("crypto");
class DatabaseMemory {
  #users = new Map();

  create(user) {
    const userID =  crypto.randomUUID();
    this.#users.set(userID, user);

    return {
        userID,
        ...user
    }
  }
}


module.exports = DatabaseMemory;

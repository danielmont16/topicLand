const { ConnectionStrings } = require("../../lesson08/configs/globals");

require("dotenv").config();

const configurations = {
    ConnectionStrings:{
        MongoDB:"mongodb+srv://dfelipemont:npnYb36x2672O2pE@cluster0.89sr3.mongodb.net/magazineDB?retryWrites=true&w=majority&appName=Cluster0"
    }
}

module.exports = configurations;
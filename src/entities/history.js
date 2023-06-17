require("dotenv").config()
const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env["DB_ENGINE"] + "://" + process.env["DB_USERNAME"] + ":" + process.env["DB_PASSWORD"] + "@" + process.env["DB_HOST"] + ":" + process.env["DB_PORT"] + "/" + process.env["DB_NAME"])

let Record = sequelize.define('record', {
    profileId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    songId: {
        type: Sequelize.TEXT,
        allowNull: false
    },

});

Record.sync().then(() => {
    console.log('New table created');
}).finally(() => {
})

module.exports = Record
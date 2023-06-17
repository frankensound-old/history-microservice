const Record = require("../entities/history")

// Create a record in the history
module.exports = {
    Create: async function (record) {
        const r = await Record.create({profileId: record["profileId"], songId: record["songName"]});
        return r;
    },

    // Find all recorded history for a profile
    GetAll: async function (profileId) {
        const r = await Record.findAll({raw: true, where: {profileId: profileId}});
        return r;
    }
}
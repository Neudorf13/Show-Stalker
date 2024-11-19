const db = require("../db");

const subscribeUserToShow = (userID, showID) => {
    
    console.log("userID: " + userID + " showID: " + showID);
    const query = `UPDATE userShows SET subscribed = true WHERE userID = ? AND showID = ?`;
    
    return new Promise((resolve, reject) => {
        db.run(query, [userID, showID], function (error) {
            if (error) {
                console.error(`Failed to subscribe user ${userID} to show ${showID}:`, error);
                return reject(error);
            }
            console.log("Changes made:", this.changes);
            if (this.changes > 0) {
                console.log("At least one change");
            } else {
                console.log("No changes");
            }
            resolve(this);
        });
    });
};


module.exports = {
    subscribeUserToShow,
};
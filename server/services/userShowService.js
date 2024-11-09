const db = require("../db");

//update row in userShows table to set subscribed to true
// const subscribeUserToShow = async (userID, showID) => {
//     const query = `UPDATE userShows SET subscribed = true WHERE userID = ? AND showID = ?`;
//     try {
//         const result = await db.run(query, [userID, showID]);
//         console.log("result: " + result);
//         console.log("result changes:", result.changes);
//         if(result.changes > 0) {
//             console.log("at least one change");
//         }
//         else {
//             console.log("no changes");
//         }
//         return result;
//     } catch (error) {
//         console.error(`Failed to subscribe user ${userID} to show ${showID}:`, error);
//         throw error;
//     }
// };

const subscribeUserToShow = (userID, showID) => {
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
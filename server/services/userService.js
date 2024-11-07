const db = require("../db");

// const setUserRefreshToken = async (refreshToken, userID) => {

//     try {
//         const query = `UPDATE users SET refreshToken = ? WHERE userID = ?`;
//         const result = await db.run(query, [refreshToken, userID]);
//         console.log(result.changes);
//         console.log("refresh token updated for user");
//     } catch (error) {
//         console.error("Error updating token:", error);
//     }

// };

const setUserRefreshToken = async (userID, refreshToken) => {
  console.log("userID: " + userID + "\n");
  const query = `UPDATE users SET refreshToken = ? WHERE userID = ?`;
  try {
    const result = await new Promise((resolve, reject) => {
      db.run(query, [refreshToken, userID], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes }); // `this` refers to the context of the db.run call
      });
    });

    console.log(result.changes); // Logs the number of rows updated
  } catch (error) {
    console.error("Error updating token:", error);
  }
};

// const getUserRefreshToken = async (userID) => {
//   // Logic to retrieve the refresh token from the database
//   const query = `SELECT refreshToken from users where userID = ?`;
//   try{
//     db.get(query, [userID], (err, rows) => {
//       if(err) {
//         console.error(err.message);
//         return;
//       }

//       if(rows.length >= 1) {
//         console.log()
//       }

//     })
//   } catch (error) {
//     console.error("error occured while retrieving users refreshToken", error);
//   }
// };

const getUserRefreshToken = async (userID) => {
  // Logic to retrieve the refresh token from the database
  const query = `SELECT refreshToken FROM users WHERE userID = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [userID], (err, row) => {
      if (err) {
        console.error(
          "Error occurred while retrieving user's refresh token:",
          err.message
        );
        reject(err); // Reject the promise on error
        return;
      }

      if (row) {
        resolve(row.refreshToken); // Resolve with the refreshToken if found
      } else {
        console.log("No refresh token found for the user.");
        resolve(null); // Return null if no token is found
      }
    });
  });
};

module.exports = {
  setUserRefreshToken,
  getUserRefreshToken,
};

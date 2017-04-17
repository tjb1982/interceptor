var registerUser = require("./routes").registerUser;

registerUser("admin", process.env["ADMIN_PASSWORD"], function(e, resp) {
    if (err) {
        console.log("Admin user not registered: ", err);
    }
});

console.log("sanity check");

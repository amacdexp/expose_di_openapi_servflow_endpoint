// Import dependencies
import bcrypt from "bcryptjs" ;


(async () => {
    // Hash the password

    var args = process.argv.slice(2);

    let password = args [0]  || "Password1"

    const salt = await bcrypt.genSalt(15);
    console.log("OriginalPassword: " + password + "\t  EncryptedPassword: " + await bcrypt.hash(password, salt));
})();
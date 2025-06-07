import bcrypt from "bcrypt";

async function hashIt(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

(async () => {
    try {
        const plainPwd = "12345678";
        console.log("Hashing: ", plainPwd);

        const hashed = await hashIt(plainPwd);
        console.log("Hashed: ", hashed);

        //verify
        const isMatch = await bcrypt.compare(plainPwd, hashed);

        console.log("Password Verification: ", isMatch ? "✅ Success" : "❌Failed");
    } catch (error) {
        console.error("Scripte failed: ", error);
        process.exit();
    }
})();

const User = require("../models/user");
module.exports.renderSignupForm = (req, res) => {
    res.render("Users/Signup.ejs");
};


module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to wonderlust");
            res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", "User already registered");
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm =  (req, res) => {
    res.render("Users/login.ejs");
};
module.exports.login = async (req, res) => {
    req.flash("success", "welcome to wonderlust You are Logged In");
    let redirectUrl = res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);

};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
};
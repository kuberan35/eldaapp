const jwt = require('jsonwebtoken');

// Function to generate a JWT
function generateToken(user) {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
    return token;
}

// Example user login function
async function login(req, res) {
    const { username, password } = req.body;
    // Validate user credentials
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
            error: true,
            success: false
        });
    }

    // Generate token for the user
    const token = generateToken(user);

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({
        message: "Login successful",
        token,
        error: false,
        success: true
    });
}

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decode);
    // console.log(req.user);
    req.user = decode.userID;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;

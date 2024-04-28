import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.find({ email });

    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "all fields are required",
        success: false,
      });
    }

    if (user.length === 1) {
      console.log(user);
      return res.status(401).json({
        message: "User already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfuly",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "all fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "user does not exits",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    const tokenData = {
      userID: user.id,
    };

    const token = await jwt.sign({ tokenData }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        Domain: "localhost",
      })
      .json({ message: `Welcome back ${user.name} `, success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = (req, res) => {
  try {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
      message: "user logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const user = await User.findById(loggedInUserId);
    if (user.bookmarks.includes(tweetId)) {
      //remove
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "removed from bookmark successfuly",
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "added to bookmark successfuly",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {}
};

export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers) {
      return res.status(200).json({
        message: "currently no other users",
      });
    }
    console.log(otherUsers);
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const toFollowUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const toFollowUser = await User.findById(toFollowUserId);

    if (!toFollowUser.followers.includes(loggedInUserId)) {
      await toFollowUser.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: toFollowUserId } });
    } else {
      return res.status(200).json({
        message: `user already following ${toFollowUser.name}`,
        success: true,
      });
    }

    return res.status(200).json({
      message: `${loggedInUser.name} started following ${toFollowUser.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const toUnfollowUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const toUnfollowUser = await User.findById(toUnfollowUserId);

    if (loggedInUser.following.includes(toUnfollowUserId)) {
      await loggedInUser.updateOne({ $pull: { following: toUnfollowUserId } });
      await toUnfollowUser.updateOne({ $pull: { followers: loggedInUserId } });
    } else {
      return res.status(200).json({
        message: `user doesn't follow ${toUnfollowUser.name}`,
        success: true,
      });
    }

    return res.status(200).json({
      message: `${loggedInUser.name} unfollowed ${toUnfollowUser.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

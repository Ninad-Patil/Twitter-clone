import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        messsage: "All fields are required",
        success: false,
      });
    }
    const user = await User.findById(id).select("-password");
    const tweet = await Tweet.create({
      description,
      userId: id,
      userDetails: user,
    });
    if (tweet) {
      return res.status(201).json({
        messsage: "Tweet created successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      messsage: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    console.log(loggedInUserId, tweetId);
    const tweet = await Tweet.findById(tweetId);

    if (tweet.like.includes(loggedInUserId)) {
      //dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        messsage: "disliked successfully",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        messsage: "liked successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTweets = async (req, res) => {
  //loggedIn users tweet + following tweets
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    const loggedInUserTweets = await Tweet.find({ userId: id });

    const followingUsersTweets = await Promise.all(
      loggedInUser.following.map(async (follwerId) => {
        return await Tweet.find({ userId: follwerId });
      })
    );

    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUsersTweets),
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingTweets = async (req, res) => {
  // following tweets
  try {
    const id = req.params.id;
    console.log(id);
    const loggedInUser = await User.findById(id);
    console.log(loggedInUser);
    const followingUsersTweets = await Promise.all(
      loggedInUser.following.map(async (follwerId) => {
        return await Tweet.find({ userId: follwerId });
      })
    );
    console.log(followingUsersTweets);

    return res.status(200).json({
      tweets: followingUsersTweets,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

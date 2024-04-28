import express from "express";

import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  likeOrDislike,
} from "../controller/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeOrDislike);
router.get("/alltweets/:id", isAuthenticated, getAllTweets);
router.get("/followingtweets/:id", isAuthenticated, getFollowingTweets);
export default router;

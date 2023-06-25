# 🫶 Manor

A decentralised social media platform.
With Manor, users can share and discover different contents through live streaming, uploads, and social shares. (TL:DR a decentralised twitter + youtube)

Live Link: [Manor Demo](https://manor-cyan.vercel.app/)

For the best experience view on web (although mobile works too just not as much, autoplay not compatible on iOS, although android should be fine.)

## Summary

Manor is a decentralized social media platform that mitigates against the risk of data breaches, enable users monetize their contents and interact in a safe and secure manner.

Manor offers a variety of features, including the ability to upload videos via bundlr & arweave, live streaming with Livepeer, and the option to interact with other users through comments, likes, and mint NFTs and Donate tokens through the Bunzz protocol. Users can also search for and follow other profiles, and view their followers and videos.

## Table of Contents

- [Overview](#overview)
- [Features Summary](#features-summary)
- [Stack](#stack)
- [Demo Images](#demo-images)
- [Setup](#setup)
- [Conclusion](#conclusion)
- [Credits](#credits)

## Overview

A decentralized social media platform is a fun way for people to show each other what they are doing, or to share things they find funny or interesting. Other people can watch the videos and leave comments, or "like" them if they enjoy them creating social interactions and community.

We set out to build a social media that cares more about the user, that won’t harvest user data (looking at you Tiktok!) and gives the content creator control over their own content.

For full transparency we started to build Manor as part of the Encode/WBW3 accelerator, the Next Build Hackathon began a week or so into it and we were encouraged to enter, and so have been building for both alongside each other. We have added new features since it finished in mid December. Manor is also taking part in Buildspace N&W S2.

## Features Summary

- _Social sharing_: Manor includes a variety of social sharing features, these come from using Lens social graph, and include the ability to comment, like, and collect videos.

- _Follow and search profiles_: Users can search for and follow other profiles on the platform, and view their followers and videos. There is a mobile discover page.

- _Lens Collect module_: Manor includes a collect module, where users can set conditions on who can collect their video

- _Upload on Bundlr/Arweave_: In addition to live streaming, users can also upload their videos to the platform for others to discover.

- _Mobile_: Manor is mobile friendly, making it accessible to a wide range of users.

- _Encrypted Commenting with Lit_: Just push a toggle to encrypt your comment to keep it secret to all except the user that posted the video.

- _Live streaming with Livepeer_: Manor allows users to share their videos in real-time with the community through live streaming.

## Stack

- ReactJs
- Tailwind CSS
- Polygon
- Bunzz
- FileCoin + IPFS
- EthersJS

## Demo Images

Here are some images of Manor in action:

_Web_

1. Landing page, you can see the two timelines, one for live streams and one for uploads. You can like, collect, follow etc from the timeline. Clicking on a video will bring you to the video page.

2. The best way to experience Manor is to connect your wallet, we use Polygon, so you will need to connect to Polygon. You can do this by clicking the 'Connect Wallet' button on the top right of the web app. You will be prompted to choose a wallet, we recommend Metamask. Once you have connected your wallet, you will be able to like, collect, follow etc.



4. Social sharing: now you can interact and Follow(or unfollow), Like, Comment, Collect, Upload, using these buttons. You can also now see who you follow, click on their profile, see what they're up to

5. Clicking upload will bring you here: Select the file you want to upload, choose a title and description. you can also choose to use the Lens collect module here to put a condition on your video collects. Choose to allow anyone or only followers and set a price or leave it free.



6. Click on your profile image on the top right of the web app or on any users profile will bring you here, to their (or your) profile page where you will see all of your videos. Click one to like, comment and see more detail.

7. Commenting: Click on a video or the comment button to get to this page where you can leave a comment. Toggle to encrypt it (using LIT protocol) so only the creator can see it.

8. Search: sort of self explanatory, start typing the name or handle of a user into the search bar, and some profiles will come up, click through to see their profile


9. Live Streaming: Watch livestreams (if there are any happening at that moment) or share your own. nb: currently Livepeer require you to have OBS installed to stream. You also must be logged into with Lens.
   Toggle to 'Watch Live' or 'Go Live'

_Mobile_

10. Landing: Mobile landing page also has two timelines to scroll, click the house icon to toggle between them. You can like, collect, follow etc from the timeline.
    NB: videos do not autoplay on iphone.


11. Comments: click the comment button below the video to go through to see more video details and to see and leave a comment.

12. Discover page: The bottom scroll bar has timeline, upload, disover and profile links. This is the discover page. See other users, search categories or profiles.

## Setup

git clone git@github.com:Manor/Manor.git
cd Manor
npm install

# generate lens types

npm run codegen

# create your env variables

cp .env.example .env

# Copy your Infura Api key in the .env file

# NEXT_PUBLIC_INFURA_ID=<yourInfuraKeyHere>

npm run dev

## Conclusion

Our aim when building Manor was to try and make a contribution to a more decentralised social media, where users don’t have to worry about their data, and where they have full control over their content.

Manor is built on chain and so is by nature decentralised, it uses decentralised protocols such as Lens and Livepeer. This means greater privacy and security for users, as their data is not stored on a central server that could be vulnerable to hacking or other security threats.

In addition to the core social features, Manor also includes the Lens collect module. This feature allows users to take more control over their content.
Comments, encrypted with Lit Protocol give further user control on both the creator and user side.



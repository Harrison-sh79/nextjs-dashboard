import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  // const oauth2Client = new google.auth.OAuth2(
  //   process.env.YOUTUBE_CLIENT_ID,
  //   process.env.YOUTUBE_CLIENT_SECRET,
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback`
  // );
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );
  const scopes: string[] = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtubepartner",
    "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
    "https://www.googleapis.com/auth/yt-analytics.readonly",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  console.log(authorizationUrl);
  res.redirect(301, authorizationUrl);
}

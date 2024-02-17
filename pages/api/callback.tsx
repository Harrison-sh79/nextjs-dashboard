import { NextApiRequest, NextApiResponse } from "next";
import { google, youtube_v3 } from "googleapis";

type ChannelInfoResponse = youtube_v3.Schema$ChannelListResponse;

async function getChannelInfo(
  oauth2Client: any
): Promise<ChannelInfoResponse | null> {
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  try {
    const response = await youtube.channels.list({
      mine: true,
      part: ["snippet", "contentDetails", "statistics"],
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch channel info:", error);
    return null;
  }
}

export default async function googleCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );

  const { code } = req.query as { code: string };

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const channelInfoResponse = await getChannelInfo(oauth2Client);
    if (!channelInfoResponse || (channelInfoResponse.items?.length ?? 0) < 1) {
      res.send("No channel found!");
      return;
    }
    const channels = channelInfoResponse?.items ?? [];
    res.redirect("/success");
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).send("Authentication failed");
  }
}

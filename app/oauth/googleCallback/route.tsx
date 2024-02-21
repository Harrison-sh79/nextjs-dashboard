import { google, youtube_v3 } from "googleapis";
import { query } from "@/lib/database";
import oauth2Client from "@/lib/api/google";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

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

export async function GET(req: Request) {
  const url = new URL(req.url as string);
  const code = url.searchParams.get("code");
  console.log(code);
  if (!code) {
    return new Response("Code is required.", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    let tokenInfo = tokens;
    oauth2Client.setCredentials(tokenInfo);

    const channelInfoResponse = await getChannelInfo(oauth2Client);

    if (!channelInfoResponse || (channelInfoResponse.items?.length ?? 0) < 1) {
      return new Response("No channel found!", {
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
    const channels = channelInfoResponse?.items ?? [];
    let c = channels[0];
    console.log("channel:", c);
    let channelId = c.id;
    let title = c?.snippet?.title;
    let customUrl = c?.snippet?.customUrl;
    let thumbnail = c?.snippet?.thumbnails?.default?.url; //size default 88 medium 240 high:800;
    let subscriberCount = c?.statistics?.subscriberCount;
    let videoCount = c?.statistics?.videoCount;
    let viewCount = c?.statistics?.viewCount;

    try {
      //check same record
      const checkQuery =
        "select * from influencer_youtube where channel_id = ?";
      const checkResult = await query(checkQuery, [channelId]);
      let message = "";
      console.log("checkResult:", checkResult);
      // return;
      // let tokenExpiredAt = formatTimestamp(tokenInfo.expiry_date)
      // let tokenExpiredAt = tokenInfo.expiry_date;
      let tokenExpiredAt;

      if (typeof tokenInfo.expiry_date === "number") {
        tokenExpiredAt = moment
          .unix(tokenInfo.expiry_date / 1000)
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        // if expiry_date is undefined
        tokenExpiredAt = "N/A";
      }
      console.log("tokenExpiredAt:", tokenExpiredAt);
      if (Array.isArray(checkResult) && checkResult.length > 0) {
        //存在，更新
        const updateQuery =
          "update influencer_youtube set title = ?, custom_url=?,thumbnail_url=?,auth_status=?,subscriber_count=?,video_count=?,view_count=?,token=?,scope=?,token_expired_timestamp=?,token_expired_at=? where channel_id = ?";

        const updateValues = [
          title,
          customUrl,
          thumbnail,
          1,
          subscriberCount,
          videoCount,
          viewCount,
          tokenInfo.access_token,
          tokenInfo.scope,
          tokenInfo.expiry_date,
          tokenExpiredAt,
          channelId,
        ];
        await query(updateQuery, updateValues);
        message = "update authorize successfully!";
      } else {
        //insert a new record
        const insertQuery =
          "insert into influencer_youtube (channel_id,title,custom_url,thumbnail_url,auth_status,subscriber_count,video_count,view_count,token,scope,token_expired_timestamp,token_expired_at,created_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
        const values = [
          channelId,
          title,
          customUrl,
          thumbnail,
          1,
          subscriberCount,
          videoCount,
          viewCount,
          tokenInfo.access_token,
          tokenInfo.scope,
          tokenInfo.expiry_date,
          tokenExpiredAt,
          created_at,
        ];
        await query(insertQuery, values);
        message = "authorization successfully!";
      }
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice`
      );
    } catch (error) {
      console.error("Error get information:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error getting tokens:", error);
    return new Response(JSON.stringify({ error: "Authentication failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

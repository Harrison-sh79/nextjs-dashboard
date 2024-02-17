"use client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
/* Instruments */
import {
  useSelector,
  useDispatch,
  summaryData,
  getSummaryAsync,
} from "@/lib/redux";
import { useRouter } from "next/navigation";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};
type YouTubeApiResponse = {
  items: VideoItem[];
};

function Youtube() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [videoList, setVideoList] = useState<VideoItem[]>([]);

  // const getChannel = (tokenInfo) => {
  //   oauth2Client.setCredentials(tokenInfo);
  //   const apikey = process.env.YOUTUBE_API_KEY;
  //   var youtube = google.youtube({
  //     version: "v3",
  //     auth: apikey,
  //   });
  //   return youtube.channels.list({
  //     auth: oauth2Client,
  //     part: "snippet,statistics",
  //     mine: true,
  //   });
  // };

  const getVideosFromYouTubeAPI = async () => {
    const apiUrl = "http://localhost:3000/api/videos";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: YouTubeApiResponse = await response.json();
      setVideoList(data.items);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    router.push("/api/auth");
  }, []);

  return (
    <Box>
      Youtube Channel
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {videoList.map((video, index) => (
          <React.Fragment key={video.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={video.title} src={video.thumbnail} />
              </ListItemAvatar>
              <ListItemText
                primary={video.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {video.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < videoList.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Youtube;

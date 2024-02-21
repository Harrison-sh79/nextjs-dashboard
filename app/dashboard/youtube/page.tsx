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

  const getVideosFromYouTubeAPI = () => {
    fetch("/oauth/googleCallback")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setVideoList(data);
      })
      .catch((error) => console.error("Error fetching channel info:", error));
  };

  const handleAuthentication = () => {
    router.push("/oauth");
  };

  useEffect(() => {}, []);

  return (
    <Box>
      Youtube Channel
      <Box>
        <Button onClick={handleAuthentication}>Authenticate First</Button>
      </Box>
      <Box>
        <Button onClick={getVideosFromYouTubeAPI}>Fetch Video List</Button>
      </Box>
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

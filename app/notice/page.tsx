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

function Notice() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAuthentication = () => {
    router.push("/oauth");
  };

  useEffect(() => {}, []);

  return <Box>Oauth Success</Box>;
}

export default Notice;

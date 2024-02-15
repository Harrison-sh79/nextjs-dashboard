"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useRouter } from "next/navigation";
import { headerSlice, useSelector, useDispatch, openStatus, title } from "@/lib/redux";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function SideBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const openstatus = useSelector(openStatus);

  return (
    <Drawer variant="permanent" open={openstatus} className="h-full">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <div className="flex flex-row items-center gap-2 ml-3">
          <img
            className="w-10"
            src="/images/VMAX_Logo_Main.png"
            alt="VMAX logo"
          />
          <img
            className="w-2"
            src="/images/Lightning.svg"
            alt="logo lightning"
          />
          <p className="font-bold text-[1rem]">Shop</p>
        </div>
        <IconButton
          onClick={() => dispatch(headerSlice.actions.toggleDrawer())}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton
          onClick={() => {
            router.push("/dashboard");
            dispatch(headerSlice.actions.changeTitle('Dashboard'));
          }}
        >
          <ListItemIcon>
            <DashboardIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            router.push("/dashboard/orders");
            dispatch(headerSlice.actions.changeTitle('Orders'));
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
        <ListSubheader component="div" inset>
          Saved reports
        </ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

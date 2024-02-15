"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { UserButton } from "@clerk/nextjs";
import {
  headerSlice,
  useSelector,
  useDispatch,
  openStatus,
  title,
} from "@/lib/redux";
// import { useUser } from "@clerk/clerk-react";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header() {
  /* Redux : get header drawer status via 'openStatus' and header title via 'title' */
  const dispatch = useDispatch();
  const openstatus = useSelector(openStatus);
  // const selectedTitle = useSelector(title);
  const [currentTitle, setCurrentTitle] = React.useState("Dashboard");

  /* Get user info from clerk */
  // const { isSignedIn, user, isLoaded } = useUser();

  React.useEffect(() => {
    if (!localStorage.getItem("selectedTitle") && localStorage.getItem("selectedTitle") !== '' ) {
      setCurrentTitle(localStorage.getItem("selectedTitle") || 'Dashboard');
    }
  }, []);

  return (
    <AppBar
      position="absolute"
      open={openstatus}
      style={{
        backgroundImage: "linear-gradient(to right, #F90091, #2800A6)",
      }}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(headerSlice.actions.toggleDrawer())}
          sx={{
            marginRight: "36px",
            ...(openstatus && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {currentTitle}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <div className="flex flex-row items-center justify-center gap-2 ml-4">
          <UserButton afterSignOutUrl="/" />
          {/* <Typography variant="caption" color="text.white">
            {user?.firstName}
          </Typography> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}

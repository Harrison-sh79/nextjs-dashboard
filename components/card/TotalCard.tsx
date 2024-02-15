import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { summaryItemType, summaryNumType } from "@/lib/types";
import Counter from "./Counter";
import { IconComponent } from "../icon/IconComponent";
import { Stack } from "@mui/material";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function TotalCard({
  summaryNumItems,
  summaryNums,
}: {
  summaryNumItems: summaryItemType[];
  summaryNums: summaryNumType;
}) {
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Ratio / Avg
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {summaryNumItems.slice(4).map((sumNumItem, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <IconComponent iconName={sumNumItem.iconSrc as any} />
              </ListItemIcon>
              <ListItemText id={sumNumItem.title} primary={sumNumItem.title} />
              {summaryNums && (
                <Counter
                  to={
                    (sumNumItem?.dataKey !== "conversion_rate"
                      ? summaryNums[sumNumItem?.dataKey]
                      : 0.0045) * (sumNumItem.unit !== "%" ? 1 : 100)
                  }
                  toFixedVal={sumNumItem.toFixedVal ? sumNumItem.toFixedVal : 0}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import { summaryNumType, summaryItemType } from "@/lib/types";
import Counter from "./Counter";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function SumNumCard({
  sumNumItem,
  summaryNums,
}: {
  sumNumItem: summaryItemType;
  summaryNums: summaryNumType;
}) {
  return (
    <React.Fragment>
      <Title>{sumNumItem.title}</Title>
      <Typography component="p" variant="h4">
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
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
    </React.Fragment>
  );
}

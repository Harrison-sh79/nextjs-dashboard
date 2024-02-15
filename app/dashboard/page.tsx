"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "@/components/Chart";
import Deposits from "@/components/Deposits";
import Orders from "@/components/Orders";
import Copyright from "@/components/copyright/Copyright";
import SumNumCard from "@/components/card/SumNumCard";
import TotalCard from "@/components/card/TotalCard";
import { summaryNumItems } from "@/lib/constants";
import { fetchSummaryData } from "@/api";
import { summaryNumType } from "@/lib/types";

export default function Home() {
  const [summaryNums, setSummaryNums] = React.useState<summaryNumType>();
  
  React.useEffect(() => {
    const getData = async () => {
      const result = await fetchSummaryData(1);
      console.log("🚀 ~ file: page.tsx:22 ~ getData ~ result:", result)
      setSummaryNums(result.data as any);
    }
    getData()
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* First Line : Sale Amount, Orders, Customers, Visits */}
        {summaryNumItems.slice(0, 4).map((sumNumItem, index) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 140,
              }}
            >
              <SumNumCard sumNumItem={sumNumItem} summaryNums={summaryNums as any} />
            </Paper>
          </Grid>
        ))}
        {/* Chart & CTR , Convention, Avg Customers */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TotalCard summaryNumItems={summaryNumItems} summaryNums={summaryNums as any}/>
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

import AdsClickIcon from "@mui/icons-material/AdsClick";
import CachedIcon from "@mui/icons-material/Cached";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const summaryNumItems = [
    {
      title: "Sales Amount",
      dataKey: "sales_amount",
      unit: "$",
      iconColor: "#C4C9FE",
      iconSrc: "/images/Sales_B.png",
    },
    {
      title: "Orders",
      dataKey: "order_number",
      iconColor: "#F9D5E5",
      iconSrc: "/images/Consumer_B.png",
    },
    {
      title: "Customers",
      dataKey: "customer_number",
      iconColor: "#FFDB95",
      iconSrc: "/images/Customers_B.png",
    },
    {
      title: "Visits",
      dataKey: "visit_number",
      iconColor: "#C4E2FE",
      iconSrc: "/images/Visit_B.png",
    },
    {
      title: "CTR",
      dataKey: "click_through_rate",
      unit: "%",
      iconColor: "#BFF4E8",
      iconSrc: "AdsClick",
      toFixedVal: 2,
    },
    {
      title: "Conversion",
      dataKey: "conversion_rate",
      unit: "%",
      iconColor: "#FFC2C2",
      iconSrc: "Cached",
      toFixedVal: 2,
    },
    {
      title: "Avg Order",
      dataKey: "average_order_per_customer",
      iconColor: "#F0F4A1",
      iconSrc: "ShoppingCartOutlined",
      toFixedVal: 2,
    },
  ];
  
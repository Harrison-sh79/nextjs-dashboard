export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type summaryNumType = {
  average_order_per_customer: number;
  brand_id: number;
  click_through_rate: number;
  conversion_rate: number;
  customer_number: number;
  id: number;
  order_number: number;
  sales_amount: number;
  visit_number: number;
  [key: string]: number;
};

export type summaryItemType = {
  title: string;
  dataKey: string;
  unit?: string;
  iconColor: string;
  iconSrc: string;
  toFixedVal?: number;
  [key: string ]: string | number | undefined;
};

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

export enum OrderStatusColors {
  PENDING = "primary",
  PAID = "success",
  SHIPPED = "success",
  DELIVERED = "success",
  CANCELLED = "danger"
}

export enum OrderStatusFa {
  PENDING = "در انتظار",
  PAID = "پرداخت شده",
  SHIPPED = "ارسال شده",
  DELIVERED = "تحویل داده شده",
  CANCELLED = "لغو شده"
}

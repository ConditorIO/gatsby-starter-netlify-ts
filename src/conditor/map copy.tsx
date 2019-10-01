import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface MapProps extends WidgetProps<string[]> {
  decimals: number;
}

export const Map: React.FC<MapProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="text">
      {data => (children ? children(data) : <>{data}</>)}
    </Widget>
  );
};

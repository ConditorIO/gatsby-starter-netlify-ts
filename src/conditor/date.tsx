import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface DateProps extends WidgetProps<string> {}

export const Date: React.FC<WidgetProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="date">
      {data => (children ? children(String(data)) : <>{String(data)}</>)}
    </Widget>
  );
};

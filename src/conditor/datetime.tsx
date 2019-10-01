import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface DateTimeProps extends WidgetProps<string> {}

export const DateTime: React.FC<WidgetProps> = ({
  children,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps} type="datetime">
      {data => (children ? children(data) : <>{String(data)}</>)}
    </Widget>
  );
};

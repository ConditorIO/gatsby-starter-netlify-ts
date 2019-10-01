import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface NumberProps extends WidgetProps<number> {}

export const Number: React.FC<NumberProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="number">
      {data => (children ? children(data) : <>{String(data)}</>)}
    </Widget>
  );
};

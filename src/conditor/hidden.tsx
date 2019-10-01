import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface HiddenProps extends WidgetProps<string> {}

export const Hidden: React.FC<HiddenProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="hidden">
      {data => (children ? children(data) : <>{String(data)}</>)}
    </Widget>
  );
};

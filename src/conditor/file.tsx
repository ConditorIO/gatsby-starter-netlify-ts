import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface FileProps extends WidgetProps<string> {}

export const File: React.FC<WidgetProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="file">
      {data => (children ? children(data) : null)}
    </Widget>
  );
};

import React, { ReactElement } from "react";
import { WidgetProps, Widget } from "./widget";

export interface ObjectProps extends WidgetProps {
  children: ReactElement;
}

export const Object: React.FC<ObjectProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="group">
      {data => (children ? children(data) : <>{data}</>)}
    </Widget>
  );
};

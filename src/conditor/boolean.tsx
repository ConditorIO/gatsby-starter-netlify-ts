import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface BooleanProps extends WidgetProps<boolean> {}

export const Boolean: React.FC<BooleanProps> = ({
  children,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps} type="boolean">
      {data => (children ? children(!!data) : <>{String(data)}</>)}
    </Widget>
  );
};

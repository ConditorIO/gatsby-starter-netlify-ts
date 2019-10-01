import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface SelectMultipleProps extends WidgetProps<string[]> {
  multiple: true;
  options: string[] | { [k: string]: string };
}

export interface SelectSingleProps extends WidgetProps<string> {
  multiple?: false;
  options: string[] | { [k: string]: string };
}

export const Select: React.FC<SelectSingleProps | SelectMultipleProps> = ({
  children,
  ...widgetProps
}) => {
  return (
    <Widget {...widgetProps} type="select">
      {data =>
        children ? (
          children(data)
        ) : (
          <>{typeof data === "string" ? String(data) : data.join(", ")}</>
        )
      }
    </Widget>
  );
};

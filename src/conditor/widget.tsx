import React, { useContext, ReactElement } from "react";
import { CollectionContext } from "./collection";

export interface WidgetProps<T = any> extends SimpleWidgetProps {
  children?: (data: T) => ReactElement | null;
}

export interface SimpleWidgetProps {
  name: string;
  type: string;
  label?: string;
  default?: string;
  placeholder?: string;
  optional?: boolean;
  hidden?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({ name, children, hidden }) => {
  const context = useContext(CollectionContext);

  if (hidden) {
    return null;
  }

  return children ? children(context[name]) : context[name];
};

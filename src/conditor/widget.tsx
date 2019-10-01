import React, { useContext, ReactElement } from "react";
import { CollectionContext } from "./collection";

export interface WidgetProps<T = any> {
  name: string;
  type: string;
  children?: (data: T) => ReactElement | null;
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

import React, { useContext } from "react";
import { CollectionContext } from "./collection";

export interface WidgetProps {
  name: string;
  children: (data: any) => JSX.Element;
  label?: string;
  default?: string;
  placeholder?: string;
  optional?: boolean;
  hidden?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({ name, children }) => {
  const context = useContext(CollectionContext);
  return children(context[name]);
};

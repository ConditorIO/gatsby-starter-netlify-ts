import React, { ReactElement } from "react";
import { Widget, SimpleWidgetProps } from "./widget";
import { CollectionContext } from "./collection";

export interface ObjectProps extends SimpleWidgetProps {
  children: ReactElement;
}

export const Object: React.FC<ObjectProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="group">
      {data => (
        <CollectionContext.Provider value={data}>
          {children}
        </CollectionContext.Provider>
      )}
    </Widget>
  );
};

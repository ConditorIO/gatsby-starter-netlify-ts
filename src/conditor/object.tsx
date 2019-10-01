import React, { ReactElement } from "react";
import { Widget, WidgetProps } from "./widget";
import { CollectionContext } from "./collection";

export interface ObjectProps extends WidgetProps<Record<string, any>> {}

export const Object: React.FC<ObjectProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="group">
      {data => (
        <CollectionContext.Provider value={data}>
          {children && children(data)}
        </CollectionContext.Provider>
      )}
    </Widget>
  );
};

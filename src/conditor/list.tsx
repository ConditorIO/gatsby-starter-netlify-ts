import React, { ReactElement, ReactNode } from "react";
import { Widget, SimpleWidgetProps } from "./widget";
import { CollectionContext } from "./collection";

export interface ListProps extends SimpleWidgetProps {
  children: ReactNode[];
}

export const List: React.FC<ListProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="list">
      {(data: any[]) => (
        <>
          {data.map((d, i) => (
            <CollectionContext.Provider value={d} key={i}>
              {children}
            </CollectionContext.Provider>
          ))}
        </>
      )}
    </Widget>
  );
};

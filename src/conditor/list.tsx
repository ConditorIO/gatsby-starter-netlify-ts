import React, { ReactElement, ReactNode } from "react";
import { Widget, SimpleWidgetProps, WidgetProps } from "./widget";
import { CollectionContext } from "./collection";

export interface ListProps extends WidgetProps<any> {}

export const List: React.FC<ListProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="list">
      {(data: any[]) => (
        <>
          {data.map(
            (d, i) =>
              children && (
                <CollectionContext.Provider value={d} key={i}>
                  {children(d)}
                </CollectionContext.Provider>
              ),
          )}
        </>
      )}
    </Widget>
  );
};

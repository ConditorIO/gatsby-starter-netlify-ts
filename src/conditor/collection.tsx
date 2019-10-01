import React, { createContext } from "react";

export interface CollectionData {
  [k: string]: any;
}

export interface CollectionProps {
  name: string;
  data: CollectionData;
  label?: string;
  labelSingular?: string;
}

export const CollectionContext = createContext<CollectionData>({});

export const Collection: React.FC<CollectionProps> = ({ data, children }) => (
  <CollectionContext.Provider value={data}>
    {children}
  </CollectionContext.Provider>
);

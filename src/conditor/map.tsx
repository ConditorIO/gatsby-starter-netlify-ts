import React from "react";
import { WidgetProps, Widget } from "./widget";
import { Point, LineString, Polygon } from "geojson";

export interface PointMapProps extends WidgetProps<Point> {
  mapType?: "Point" | string;
}

export interface LineStringMapProps extends WidgetProps<LineString> {
  mapType: "LineString";
}

export interface PolygonMapProps extends WidgetProps<Polygon> {
  mapType: "Polygon";
}

type MapProps = (PointMapProps | LineStringMapProps | PolygonMapProps) & {
  decimals: number;
};

export const Map: React.FC<MapProps> = ({ children, ...widgetProps }) => {
  return (
    <Widget {...widgetProps} type="map">
      {data => (children ? children(data) : <>{JSON.stringify(data)}</>)}
    </Widget>
  );
};

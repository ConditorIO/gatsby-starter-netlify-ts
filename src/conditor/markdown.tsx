import React from "react";
import { WidgetProps, Widget } from "./widget";

export interface MarkdownProps extends WidgetProps<string> {
  html?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({
  children,
  html,
  ...widgetProps
}) => {
  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <Widget {...widgetProps} type="markdown">
      {data =>
        children ? (
          children(data)
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data }} />
        )
      }
    </Widget>
  );
};

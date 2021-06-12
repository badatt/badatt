import React, { ReactNode } from 'react';

interface Props {
  content: any;
  className: string;
}

const FormatHtml: React.FC<Props> = ({ className , content }) => (
  <span
    className={`${className} format-html`}
    dangerouslySetInnerHTML={{
      __html: content
    }}
  />
);

export default FormatHtml;

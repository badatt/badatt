import React from 'react';

import * as Styled from './styles';

interface Props {
  title: string;
  subtitle: string;
  subtitle2: string;
  content: React.ReactNode;
  startDate: string;
  endDate: string;
}

const Timeline: React.FC<Props> = ({ title, subtitle, subtitle2, content, startDate, endDate }) => (
  <Styled.Timeline>
    <Styled.Point />
    <Styled.Details>
      <Styled.Date>
        {startDate} - {endDate}
      </Styled.Date>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Subtitle>{subtitle}</Styled.Subtitle>
      <Styled.Subtitle2>{subtitle2}</Styled.Subtitle2>
    </Styled.Details>
    <Styled.Content>{content}</Styled.Content>
  </Styled.Timeline>
);

export default Timeline;

import React from 'react';

import Container from 'components/ui/Container';

import * as Styled from './styles';

const Footer: React.FC = () => (
  <Styled.Footer>
    <Container>
      <Styled.Links>
        <Styled.Link href="https://github.com/badatt" rel="noreferrer noopener" target="_blank">
          Github
        </Styled.Link>
        <Styled.Link
          href="https://www.linkedin.com/in/balu-praveen-datty-210561a4"
          rel="noreferrer noopener"
          target="_blank"
        >
          Linkedin
        </Styled.Link>
      </Styled.Links>
    </Container>
  </Styled.Footer>
);

export default Footer;

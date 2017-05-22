import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';
import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 3em 0;
  border-top: 1px solid #666;
`;

function Footer() {
  return (
    <Wrapper>
      <div>
        <LocaleToggle />
      </div>
    </Wrapper>
  );
}

export default Footer;

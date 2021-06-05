import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  padding: 20px 16px 16px;
  background-color: #020f16;
  @media screen and (max-width: 750px) {
    margin-left: 0px;
    min-height: auto !important;
  }
`;

export default function FloatingElement({
  style = undefined,
  children,
  stretchVertical = false,
}) {
  return (
    <Wrapper
      style={{
        height: stretchVertical ? 'calc(100% - 10px)' : undefined,
        ...style,
      }}
    >
      {children}
    </Wrapper>
  );
}

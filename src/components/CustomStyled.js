import styled from 'styled-components';

export const Spacer = styled.span`
  flex: 1;
`;

export const Card = styled.div`
  position: relative;
  background: white;
  box-shadow: lightgray 1px 1px 5px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: lightgray solid 1px;
`;

export const ActionBar = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;

export const Row = styled.div`
display: flex
`;

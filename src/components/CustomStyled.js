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
  margin: 5px;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: lightgray solid 1px;
  & h1, h2, h3, h4, p {
    margin: 0px;
  }
  & p {
    font-size: .8em;
  }
`;

export const ActionBar = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SideBar = styled.div`
  position: fixed;
  width: 350px;
  height: 100vh;
  top: 60px;
  padding: 15px;
  right: 0px;
  overflow-y: scroll;
`;

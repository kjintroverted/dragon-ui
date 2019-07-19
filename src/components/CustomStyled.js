import styled from 'styled-components';

export const Spacer = styled.span`
  flex: 1;
`;

export const BottomAnchor = styled.span`
  position: fixed;
  bottom: .313em;
  right: .313em;
`;

export const Card = styled.div`
  position: relative;
  background: white;
  box-shadow: lightgray 1px 1px .313em;
  border-radius: .313em;
  padding: .625em;
  display: flex;
  flex-direction: column;
  margin: .313em;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: lightgray solid 1px;
  & h1, h2, h3, h4, p {
    margin: 0em;
  }
  & p {
    font-size: .8em;
  }
`;

export const ActionBar = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const RowCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentWithSideBar = styled.div`
  flex: 1; 
  display: grid;
  grid-template-columns: 1fr 400px;
  margin-bottom: 70px;
  @media screen and (max-width: 1000px){
    grid-template-columns: 1fr;
  }
`;

export const SideBar = styled.div`
  position: fixed;
  width: 22em;
  height: 100vh;
  top: 3.75em;
  padding: 1em;
  right: 0em;
  overflow-y: scroll;
  z-index: 100;

  @media screen and (max-width: 1000px){
    background-color: white;
    box-shadow: lightgrey 1px 1px .313em;
    right: -25em;
    transition: right .3s ease;

    &.open {
      right: 0em;
    }
  }
`;

export const SideBarToggle = styled.div`
  position: fixed;
  bottom: .313em;
  right: .313em;
  display: none;
  z-index: 101;

  @media screen and (max-width: 1000px){
    display: initial;
  }
`;

export const BasicBox = styled.div`
  width: 75px;
  height: 75px;
    margin-left: 10px;
`;

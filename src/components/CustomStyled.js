import styled from 'styled-components';

export const ActionBar = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const BasicBox = styled.div`
  width: 4.6875em;
  height: 4.6875em;
  margin-left: 0.625em;
  margin-bottom: 0.625em;
`;

export const BottomAnchor = styled.span`
  position: fixed;
  bottom: 0.313em;
  right: 0.313em;
`;

export const Card = styled.div`
  position: relative;
  background: white;
  box-shadow: lightgray 1px 1px 0.313em;
  border-radius: 0.313em;
  padding: 0.625em;
  display: flex;
  flex-direction: column;
  margin: 0.313em;
`;

export const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ContentWithSideBar = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 25em;
  @media screen and (max-width: 62.5em) {
    grid-template-columns: 1fr;
  }
`;

export const FooterBar = styled.div`
display: flex;
  align-items: center;
  border-top: lightgray solid 1px;
  margin-top: 0.8em;
  & h1,
  h2,
  h3,
  h4,
  p {
    margin: 0.3em 0em;
  }
  & p {
    font-size: 0.7em;
  }
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: lightgray solid 1px;
  margin-bottom: 1em;
  & h1,
  h2,
  h3,
  h4,
  p {
    margin: 0em;
  }
  & p {
    font-size: 0.8em;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 25%;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: .5rem;
  align-items: center;
`;

export const RowCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Spacer = styled.span`
  flex: 1;
`;

export const SideBar = styled.div`
  position: fixed;
  width: 22em;
  height: 100vh;
  top: 4em;
  padding: 0em 1em;
  right: 0em;
  overflow-y: scroll;
  z-index: 1100;

  @media screen and (max-width: 62.5em) {
    background-color: white;
    box-shadow: lightgrey 1px 1px 0.313em;
    top: 0em;
    right: -25em;
    transition: right 0.3s ease;

    &.open {
      right: 0em;
    }
  }
`;

export const SideBarToggle = styled.div`
  position: fixed;
  bottom: 0.313em;
  right: 0.313em;
  display: none;
  z-index: 1101;

  @media screen and (max-width: 62.5em) {
    display: initial;
  }
`;

export const TopAnchor = styled.span`
  position: absolute;
  top: -0.8em;
  left: 0em;
  z-index: 100;
`;

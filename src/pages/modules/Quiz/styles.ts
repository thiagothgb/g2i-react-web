import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  color: #601919;
  background-image: radial-gradient(
    circle 979px at 1.5% 3%,
    rgba(255, 198, 147, 1) 0%,
    rgba(255, 246, 233, 1) 100%
  );
  min-height: 100vh;
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;

  header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      background: inherit;
      border: 0;
      align-self: flex-end;

      svg {
        font-size: 1.3rem;
        color: #ff3f3f;
      }
    }
  }

  & > button {
    border: 0;
    background: transparent;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  max-width: 600px;
  min-width: 300px;
  flex-wrap: wrap;
  word-wrap: break-word;
  padding: 40px 0px;
  flex-direction: column;
  justify-content: space-around;
  font-size: 2rem;
`;

export const ActionsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

interface ActionButtonProps {
  selected: boolean;
}

export const ActionButton = styled.button.attrs({
  type: 'button',
})<ActionButtonProps>`
  border: 0;
  border-radius: 4px;
  background: inherit;
  display: flex;
  align-items: center;
  padding: 10px;

  svg {
    margin-right: 8px;
  }

  ${props =>
    props.selected &&
    css`
      background: ${darken(0.2, 'rgba(255, 198, 147, 1)')};
    `}
`;

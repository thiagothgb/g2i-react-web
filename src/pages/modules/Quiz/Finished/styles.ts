import styled from 'styled-components';
import { Link } from '../../Dashboard/styles';

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
`;

export const List = styled.ul`
  text-align: left;
`;

interface ListItemProps {
  correct: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  list-style: none;
  align-items: center;
  padding: 5px;

  svg {
    font-size: 1rem;
    margin-right: 10px;
  }

  color: ${props => (props.correct ? '#007E33' : '#ff4444')};
`;

export const PlayAgainButton = styled(Link)`
  width: 100%;
  color: #601919;
  font-size: 1.3rem;
`;

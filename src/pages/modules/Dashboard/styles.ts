import styled, { keyframes } from 'styled-components';
import { Link as ReacDomLink } from 'react-router-dom';

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

const transform = keyframes`
  0%, 100% {
    -webkit-clip-path: polygon(0 0, calc(100% - (33.3333333333px)) calc(0% + (33.3333333333px)), 100% 100%, calc(0% + (33.3333333333px)) calc(100% - (33.3333333333px)));
            clip-path: polygon(0 0, calc(100% - (33.3333333333px)) calc(0% + (33.3333333333px)), 100% 100%, calc(0% + (33.3333333333px)) calc(100% - (33.3333333333px)));
  }
  50% {
    -webkit-clip-path: polygon(calc(0% + (33.3333333333px)) calc(0% + (33.3333333333px)), 100% 0, calc(100% - (33.3333333333px)) calc(100% - (33.3333333333px)), 0 100%);
            clip-path: polygon(calc(0% + (33.3333333333px)) calc(0% + (33.3333333333px)), 100% 0, calc(100% - (33.3333333333px)) calc(100% - (33.3333333333px)), 0 100%);
  }
`;

export const BeginButton = styled.div`
  width: 120px;
  height: 70px;
  background-color: #ddfff7;
  position: relative;
  box-shadow: 10px 10px 42px 0 rgba(0, 0, 0, 0.75);
  z-index: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  &:after,
  &:before {
    mix-blend-mode: multiply;
    filter: none;
    z-index: -1;
    content: '';
    width: calc(100% + (25px * 2));
    height: calc(100% + (25px * 2));
    position: absolute;
    display: block;
    animation: ${transform} 10s ease-in-out infinite;
    transform: translateX(-5px) translateY(-5px);
  }

  &:after {
    animation-delay: -5s;
    background-color: #93e1d8;
    clip-path: polygon(
      0 0,
      calc(100% - (33.3333333333px)) calc(0% + (33.3333333333px)),
      100% 100%,
      calc(0% + (33.3333333333px)) calc(100% - (33.3333333333px))
    );
  }

  &:before {
    background-color: #aa4465;
    clip-path: polygon(
      calc(0% + (33.3333333333px)) calc(0% + (33.3333333333px)),
      100% 0,
      calc(100% - (33.3333333333px)) calc(100% - (33.3333333333px)),
      0 100%
    );
  }

  &:hover:after {
    animation-delay: -0.1s;
  }

  &:hover:after,
  &:hover:before {
    animation-duration: 0.2s;
  }

  div {
    background: #fff;
    position: absolute;
    z-index: 999;
    b {
      position: absolute;
    }
  }
`;

export const Link = styled(ReacDomLink)`
  width: 120px;
  height: 70px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  color: #ddfff7;
  text-decoration: none;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 40px 0px;
  flex-direction: column;
  justify-content: space-around;
  font-size: 2rem;
`;

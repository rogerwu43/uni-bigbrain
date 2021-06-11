import { Link } from 'react-router-dom';
import styled from 'styled-components';

import lobbyBackground from '../images/lobby-background.png';

// Parents (Level 0).

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  font-style: italic;
  font-weight: 500px;
`;

export const HorizontalDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 10px auto;
  width: 100%;
`;

export const LargeCreateButton = styled.button`
  background-color: #0A43B5;
  border: none;
  border-radius: 30px;
  color: white;
  display: inline-block;
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0;
  padding: 10px 21px 11px 19px;
  text-align: center;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #285ECA;
    cursor: pointer;
  }

  & > i {
    margin-right: 10px;
  }
`;

export const MediumButton = styled.button`
  border: none;
  border-radius: 5px;
  color: #7A7A7A;
  display: inline-block;
  font-family: 'Quicksand', sans-serif;
  font-size: 11px;
  font-weight: 600;
  height: 30px;
  margin: 0 10px;
  padding: 5px 12px 6px;
  text-align: center;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  & > i {
    font-size: 12px;
    margin-right: 10px;
  }
`;

export const MiniLink = styled(Link)`
  color: blue;
  font-size: 14px;

  &:visited {
    color: blue;
  }
`;

export const PageTitle = styled.h1`
  border-color: grey;
  border-style: solid;
  border-width: 1px 0px;
  display: inline-block;
  font-weight: 700;
  padding: 10px 30px;
`;

export const PageWrapper = styled.div`
  background-image: url(${props => props.background ? lobbyBackground : ''});
  height: calc(100% - 50px);
  margin: auto;
  max-width: 960px;
  text-align: center;

  @media (max-width: 980px) {
    margin: 0 10px;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  margin: 20px 0px;
`;

export const SubSectionTitle = styled.h3`
  font-weight: 600;
  margin: 20px 0;
`;

export const SubText = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

// Inheritors (Level 1).

export const BlueMediumButton = styled(MediumButton)`
  background-color: #3D7DD0;
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: #3E8FF3;
  }
`;

export const DarkGreenMediumButton = styled(MediumButton)`
  background-color: #5DAA80;
  color: white;
  margin: 0 5px;

  &:hover {
    cursor: default;
  }
`;

export const GreenMediumButton = styled(MediumButton)`
  background-color: #4CAF50;
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: #5DC661;
  }
`;

export const OrangeMediumButton = styled(MediumButton)`
  background-color: #EB3115;
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: #FF3B1C;
  }
`;

export const RedMediumButton = styled(MediumButton)`
  background-color: #D72619;
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: #E93C30;
  }
`;

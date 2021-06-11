import styled from 'styled-components';

import { BlueMediumButton, OrangeMediumButton, SectionTitle } from './Global.styles';

export const AnswerOption = styled.div`
  align-items: center;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;

  & > p {
    display: inline-block;
    max-width: 50%;
    padding: 0px 10px;
    word-wrap: break-word;
  }
`;

export const Image = styled.img`
  margin: 10px;
  max-height: 300px;
  max-width: 40%;
`;

export const Question = styled(SectionTitle)`
  display: block;
  word-wrap: break-word;
`;

export const Media = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const NotSelectedAnswer = styled(OrangeMediumButton)`
  margin-right: 10px;
`;

export const Placeholder = styled.div`
  margin: auto;
`;

export const SelectedAnswer = styled(BlueMediumButton)`
  margin-right: 10px;
`;

export const Timer = styled.div`
  border: 1px solid lightgrey;
  display: inline-block;
  font-size: 20px;
  margin: 10px;
  padding: 10px 15px;
`;

export const Video = styled.iframe`
  margin: 10px;
  max-height: 300px;
  max-width: 40%;
`;

import styled from 'styled-components';

// Divs
export const AnswerDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
;`

export const AnswerOptionList = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

export const CurrentImage = styled.div`
  align-items: center;
  border: 1px dashed grey;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;

  button + button {
    margin-top: 10px;
  }

  & > img {
    max-height: 200px;
    max-width: 200px;
  }

  & > input {
    font-family: Quicksand, sans-serif;
    margin-bottom: 10px;
  }
`;

export const CurrentVideo = styled.div`
  align-items: center;
  border: 1px dashed grey;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;

  button + button {
    margin-top: 10px;
  }

  & > iframe {
    margin-bottom: 10px;
    max-height: 200px;
    max-width: 200px;
  }

  & > img {
    margin-bottom: 10px;
    max-height: 200px;
    max-width: 200px;
  }

  & > input {
    font-family: Quicksand, sans-serif;
    height: 24px;
    margin-bottom: 10px;
    width: 80%;
  }
`;

export const HorizontalDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 10px auto;
  width: 80%;
`;

export const InputOptions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const MediaOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  width: 80%;
`;

export const StatOptions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  & > p {
    font-size: 14px;
    font-weight: 600;
    margin: 0px 0px 5px 0px;
  }

  & > select {
    border: none;
    font-family: Quicksand, sans-serif;
    font-size: 12px;
    padding: 10px;
    width: 200px;
  }

  p + select {
    margin-bottom: 20px;
  }
`;

// buttons
export const OptionsButton = styled.button`
  border: none;
  border-radius: 5px;
  color: white;
  display: inline-block;
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 15px 6px 12px;
  text-align: center;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  & > i {
    margin-right: 10px;
  }

  & + & {
    margin-bottom: 10px;
  }
`;

export const DiscardButton = styled(OptionsButton)`
  background-color: #D72619;
  font-size: 12px;

  &:hover {
    background-color: #E93C30;
  }
`;

export const SaveButton = styled(OptionsButton)`
  background-color: #4CAF50;
  font-size: 24px;
  margin-bottom: 10px;
  padding: 20px 50px;

  &:hover {
    background-color: #5DC661;
  }
`;

// Forms
export const EditQuestion = styled.form`
  margin: auto;
  max-width: 960px;
  padding: 10px 0px;

  @media (max-width: 980px) {
    margin: 0px 10px;
  }
`;

// inputs
export const AnswerInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
  width: 80%;
`;

export const QuestionInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-family: Quicksand, sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  width: 80%;
`;

// p
export const FormError = styled.p`
  color: red;
  font-style: italic;
  text-align: center;
`;

export const Select = styled.select`
  background-color: white;
`;

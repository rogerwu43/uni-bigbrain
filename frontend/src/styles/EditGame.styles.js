import styled from 'styled-components';

export const EditGameQuestion = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  display: flex;
  height: 44px;
  margin: 5px 0px;
  overflow: hidden;

  & > div {
    padding: 0px 6px;
  }

  & > p {
    flex: 1;
    font-weight: 600;
    overflow: hidden;
    padding-left: 15px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const EditName = styled.i`
  font-size: 20px;
  padding: 5px;

  &:hover {
    background-color: #C1C1C1;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const GameThumbnail = styled.img`
  display: block;
  margin: auto;
  margin-bottom: 10px;
  max-height: 50px;
  max-width: 50px;
`;

export const ThumbnailForm = styled.form`
  margin: 20px 10px;
  text-align: left;

  & > button {
    display: block;
  }

  & > img {
    margin-bottom: 10px;
    max-height: 100px;
    max-width: 100px;
  }

  & > input {
    display: block;
    margin-bottom: 15px;
  }

  & > p {
    margin: 0px 0px 10px;
  }
`;

export const TitleForm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
`;

export const TitleInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-family: Quicksand, sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  width: 100%;
`;

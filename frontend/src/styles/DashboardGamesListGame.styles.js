import styled from 'styled-components';

export const DashboardGamesListGame = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 150px;
  margin: 10px 0px 10px;
`;

export const Data = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

export const Details = styled.div`
  display: flex;
  height: 100px;
  padding: 5px;
`;

export const Options = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: flex-start;
  padding: 0px 5px 5px;
`;

export const SubDetails = styled.div`
  align-items: center;
  background-color: #F2F2F2;
  display: flex;
  height: 50px;
  justify-content: flex-start;

  & > p {
    background-color: #6E6E6E;
    border-radius: 14px;
    color: white;
    font-size: 12px;
    margin: 0 15px;
    padding: 1px 10px 2px;
  }
`;

export const Thumbnail = styled.div`
  align-items: flex-end;
  background-color: #CCCCCC;
  background-image: url(${props => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px;
  display: flex;
  height: 100px;
  justify-content: center;
  margin: 0px 5px 0px 0px;
  min-height: 100px;
  min-width: 100px;
  width: 100px;

  & > p {
    background-color: #000000;
    color: white;
    font-size: 14px;
    margin: 0px;
    padding: 5px 0px;
    width: 100%;
  }
`;

export const DefaultThumbnail = styled(Thumbnail)`
  background-size: 50px;
`;

export const Title = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  margin: 0px 0px 5px 0px;

  & > p {
    font-size: 20px;
    font-weight: 600;
    margin: 0px;
    overflow: hidden;
    padding: 0px 20px 0px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

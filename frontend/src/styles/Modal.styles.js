import styled from 'styled-components';

export const Modal = styled.div`
  background: white;
  display: ${props => props.active ? 'block' : 'none'};
  padding: 10px 10px 30px;
  position: fixed;
  height: auto;
  left:50%;
  max-width: 900px;
  top:50%;
  transform: translate(-50%,-50%);
  width: 80%;
  max-height: 70%;
  overflow-y: auto;
`;

export const ModalContent = styled.div`
  overflow-y: initial;
  background-color: #fefefe;
  width: 100%;
  text-align: center;
`;

export const ModalHeader = styled.div`
  font-size: 20px;
  text-align: left;
  margin: 10px;
`;

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.active ? 'block' : 'none'};position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  width:100%;
`;

export const ModalClose = styled.div`
  color: #aaaaaa;
  float: right;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

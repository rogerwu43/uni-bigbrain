import styled from 'styled-components';

export const CreateGameModal = styled.div`
  background: white;
  display: ${props => props.active ? 'block' : 'none'};
  padding: 10px 10px 30px;
  position: fixed;
  height: auto;
  left:50%;
  max-width: 900px;
  top:50%;
  transform: translate(-50%,-50%);
  width: 90%;
`;

export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.active ? 'block' : 'none'};position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  width:100%;
`;

export const FormError = styled.p`
  color: red;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalContent, ModalBackground } from '../styles/Modal.styles';
import { BlueMediumButton } from '../styles/Global.styles'
import OutsideClickHandler from 'react-outside-click-handler';

function Popup ({ closeModal, content, active }) {
  return (
    <ModalBackground active={active}>
      <OutsideClickHandler onOutsideClick={closeModal}>
        <Modal active={active}>
          <ModalContent>
            <p>{content}</p>
            <BlueMediumButton onClick={closeModal}>OK</BlueMediumButton>
          </ModalContent>
        </Modal>
       </OutsideClickHandler>
    </ModalBackground>
  );
}
export default Popup;

Popup.propTypes = {
  content: PropTypes.string,
  active: PropTypes.bool,
  closeModal: PropTypes.func
}

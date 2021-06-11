import React from 'react';
import PropTypes from 'prop-types';

import * as GS from '../styles/Global.styles';
import { Modal, ModalContent, ModalBackground } from '../styles/Modal.styles';

function Confirmation ({ closeModal, content, onConfirm, active }) {
  return (
    <ModalBackground active={active}>
        <Modal active={active}>
          <ModalContent>
            <p>{content}</p>
            <br/>
            <GS.GreenMediumButton onClick={onConfirm}>Yes</GS.GreenMediumButton>
            <GS.RedMediumButton onClick={closeModal}>No</GS.RedMediumButton>
          </ModalContent>
        </Modal>
    </ModalBackground>
  );
}

export default Confirmation;

Confirmation.propTypes = {
  content: PropTypes.string,
  onConfirm: PropTypes.func,
  active: PropTypes.bool,
  closeModal: PropTypes.func
}

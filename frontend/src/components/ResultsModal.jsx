import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalClose, ModalBackground } from '../styles/Modal.styles';
import OutsideClickHandler from 'react-outside-click-handler';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/ResultsModal.styles';

function ResultsModal ({ closeModal, content, active }) {
  const children = content.map((val, i) => {
    return (
      <S.SessionDiv key={i}>
        Session ID: <GS.MiniLink to={ '/results/' + val }>{val}</GS.MiniLink>
      </S.SessionDiv>
    )
  });

  return (
    <ModalBackground active={active}>
      <OutsideClickHandler onOutsideClick={closeModal}>
        <Modal active={active}>
          <ModalClose onClick={closeModal}>x</ModalClose>
          <GS.SectionTitle>Past Results</GS.SectionTitle>
          <S.ResultsModalContent>
            {children}
          </S.ResultsModalContent>
        </Modal>
       </OutsideClickHandler>
    </ModalBackground>
  );
}
export default ResultsModal;

ResultsModal.propTypes = {
  content: PropTypes.array,
  active: PropTypes.bool,
  closeModal: PropTypes.func
}

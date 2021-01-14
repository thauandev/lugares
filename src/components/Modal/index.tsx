/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';

// import { Container } from './styles';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: Function;
}

const ModalItem: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return <Modal isOpen={isOpen}>{children}</Modal>;
};

export default ModalItem;

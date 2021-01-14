/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';

import Input from '../Input';

import Edit from '../../assets/edit.svg';
import Delete from '../../assets/delete.svg';

import {
  ResultContainer,
  Card,
  ContainerCard,
  FlagCard,
  EditCard,
  Button,
  InfoCard,
  LocalCard,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  // handleDelete: void;
  onRequestClose: Function;
  openModal: Function;
  flag: string;
  country: string;
  local: string;
  date: string;
}

const MetaItem: React.FC<ModalProps> = ({
  isOpen,
  // handleDelete,
  onRequestClose,
  openModal,
  flag,
  country,
  local,
  date,
}) => {
  return (
    <ResultContainer>
      <Card>
        <ContainerCard>
          <FlagCard>
            <img src={flag} alt="Bandeira" />

            <p>{country}</p>
          </FlagCard>
          <EditCard>
            <button type="button" onClick={() => openModal}>
              <img src={Edit} alt="" />
            </button>
            <Modal isOpen={isOpen}>
              <Input
                name="local"
                placeholder="   Digite o local que deseja conhecer"
              />
              <Input name="date" placeholder="   mês/ano" />

              <Button type="submit">
                <span>Editar</span>
              </Button>

              <button type="button" onClick={() => onRequestClose}>
                Fechar
              </button>
            </Modal>

            <button type="button">
              <img src={Delete} alt="" />
            </button>
          </EditCard>
        </ContainerCard>

        <LocalCard>
          <hr />
          <InfoCard>
            <p>{`Local: ${local}`}</p>
            <p>
              {`Meta:
            ${date}`}
            </p>
          </InfoCard>
        </LocalCard>
      </Card>
    </ResultContainer>
  );
};

export default MetaItem;

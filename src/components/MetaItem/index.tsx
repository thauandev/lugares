/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';
import { Form } from '@unform/web';

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
  id: string;
  flag: string;
  country: string;
  local: string;
  date: string;
  toDelete: (id: string) => void;
  toEdit: (data: any, i: any) => void;
}

const MetaItem: React.FC<ModalProps> = ({
  id,
  flag,
  country,
  local,
  date,
  toDelete,
  toEdit,
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ResultContainer>
      <Form onSubmit={toEdit}>
        <Card>
          <ContainerCard>
            <FlagCard>
              <img src={flag} alt="Bandeira" />

              <p>{country}</p>
            </FlagCard>
            <EditCard>
              <button type="button" onClick={openModal}>
                <img src={Edit} alt="Edição" />
              </button>
              <Modal isOpen={modalIsOpen}>
                <Input
                  name="local"
                  placeholder="   Digite o local que deseja conhecer"
                />
                <Input name="date" placeholder="   mês/ano" />

                <Button type="submit">
                  <span>Editar</span>
                </Button>

                <button type="button" onClick={closeModal}>
                  Fechar
                </button>
              </Modal>

              <button type="button" onClick={() => toDelete(id)}>
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
      </Form>
    </ResultContainer>
  );
};

export default MetaItem;

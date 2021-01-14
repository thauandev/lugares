/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { uuid } from 'uuidv4';
import Modal from 'react-modal';

import Select from '../../components/Select';
import Header from '../../components/Header';
import Input from '../../components/Input';

import api from '../../services/api';

import Edit from '../../assets/edit.svg';
import Delete from '../../assets/delete.svg';

import {
  Container,
  InputContainer,
  Button,
  ResultContainer,
  Card,
  ContainerCard,
  FlagCard,
  EditCard,
  LocalCard,
  InfoCard,
} from './styles';

interface Countries {
  value: string;
}

interface Meta {
  country: string;
  local: string;
  date: string;
  flag: string;
  id: string;
}

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [meta, setMeta] = useState<Meta[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    async function loadCountries() {
      const response = await api.get('/all');

      const { data } = response;

      const list = Array.from(data).map((d: any) => {
        return {
          value: d.name,
        };
      });

      setCountries(list);
    }
    loadCountries();
  }, []);

  async function handleForm(data: Meta) {
    const { country, local, date } = data;

    const response = await api.get(`/name/${country}`);
    const list = response.data.reduce((acc: any, cur: any, i: any) => {
      acc[i] = cur;
      return acc;
    }, {});

    if (response) {
      const resultCountry = {
        country,
        local,
        date,
        flag: list[0].flag,
        id: uuid(),
      };
      setMeta([...meta, resultCountry]);
    } else {
      console.log('Ocorreu um erro na busca');
    }
  }

  function handleDelete(id: string) {
    const deleteMeta = meta.filter(m => m.id !== id);
    setMeta([...deleteMeta]);
  }

  function handleEdit(data: any, i: any) {
    const { local, date } = data;
    console.log(i);
    const deleteMeta = meta.filter(m => m.id !== i);

    meta.map(m => {
      if (m.id === i) {
        const result = {
          ...m,
          i,
          local,
          date,
        };

        return setMeta([...deleteMeta, result]);
      }
      return m;
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <Header />
      <Form onSubmit={handleForm}>
        <InputContainer>
          <Select name="country">
            <option selected disabled>
              Selecione...
            </option>
            {countries.map(({ value }) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
          <Input
            name="local"
            placeholder="   Digite o local que deseja conhecer"
          />
          <Input name="date" placeholder="   mês/ano" />

          <Button type="submit">
            <span>Adicionar</span>
          </Button>
        </InputContainer>
      </Form>

      <ResultContainer>
        {meta.map(m => (
          <Card key={m.id}>
            <ContainerCard>
              <FlagCard>
                <img src={m.flag} alt="Bandeira" />

                <p>{m.country}</p>
              </FlagCard>
              <EditCard>
                <button type="button" onClick={openModal}>
                  <img src={Edit} alt="" />
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <Form onSubmit={event => handleEdit(event, m.id)}>
                    <Input
                      name="local"
                      placeholder="   Digite o local que deseja conhecer"
                    />
                    <Input name="date" placeholder="   mês/ano" />

                    <Button type="submit">
                      <span>Editar</span>
                    </Button>
                  </Form>
                  <button onClick={closeModal}>Fechar</button>
                </Modal>
                <button type="button" onClick={() => handleDelete(m.id)}>
                  <img src={Delete} alt="" />
                </button>
              </EditCard>
            </ContainerCard>

            <LocalCard>
              <hr />
              <InfoCard>
                <p>{`Local: ${m.local}`}</p>
                <p>
                  {`Meta:
                  ${m.date}`}
                </p>
              </InfoCard>
            </LocalCard>
          </Card>
        ))}
      </ResultContainer>
    </Container>
  );
};

export default Home;

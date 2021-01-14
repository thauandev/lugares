import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  background-color: #4f9419;
  display: flex;
  justify-content: space-between;

  select {
    width: 303px;
    height: 48px;
    margin-left: 72px;
    margin-top: 126px;
    margin-bottom: 73px;
    border-radius: 7px;
    background: #ffffff;
    border: none;
  }
`;

export const Button = styled.button`
  width: 203px;
  height: 49px;
  margin-right: 72px;
  margin-bottom: 73px;
  border: none;

  margin-top: 126px;

  background: #006c18;
  border-radius: 7px;

  span {
    color: #fff;
  }
`;

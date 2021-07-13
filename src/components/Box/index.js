import styled from 'styled-components';

const Box = styled.div`
  background: #fff;
  border-radius:8px;
  padding: 16px;
  margin-bottom: 10px;

  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weigth: 800;
  }

  .title {
    font-size: 32px;
    font-weigth: 400;
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 18px;
    font-weigth: 400;
    margin-bottom: 20px;
  }

  .smallTitle {
    font-size: 16px;
    font-weigth: 700;
    color: #333;
    margin-bottom: 20px;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2F4;
  }

  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333;
      opacity: 1;
    }
  }

  button {
    border: 0;
    padding: 8px 12px;
    color: #FFF;
    border-radius: 10000px;
    background-color: #6F92BB;
  }
`;

export default Box
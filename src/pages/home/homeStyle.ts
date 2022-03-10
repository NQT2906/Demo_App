import { Typography, Image, Button, Upload, Card } from "antd";
import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 10%;
  background-color: #fec107;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .headerText {
    font-size: 20px;
  }

  @media screen and (max-width: 650px) {
    .headerText {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 390px) {
    .headerText {
      font-size: 12px;
    }
  }
`;

export const HeaderTypography = styled(Typography)`
  // font-size: 2.5vh;
  color: black;
  text-align: center;
  font-weight: bold;
`;

export const ContentContainer = styled.div`
  background-color: #fefefe;
  height: 80%;
  width: 100%;
  color: white;
`;

export const ContentContainerCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fefefe;
  width: 100%;
  height: 70%;
  color: white;
`;

export const ContentContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 15%;
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

export const ContentContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fefefe;
  width: 100%;
  height: 15%;
`;

export const ContentSideContainer = styled.div<{ upload?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .ant-btn-primary {
    ${(props) =>
      !props.upload ? "background-color: #f5f5f5" : "background-color: #fec107"}
  }

  .submitButton {
    width: 8vw;
    height: 8vh;
  }

  @media screen and (max-width: 1440px) {
    .submitButton {
      width: 10vw;
      height: 6vh;
    }
  }

  .contentCard {
    width: 20vw;
    height: 30vh;
  }
  .contentImage {
    width: 20vw;
    height: 30vh;
  }

  @media screen and (max-width: 1024px) {
    .contentCard {
      width: 30vw;
      height: 30vh;
    }
    .contentImage {
      width: 30vw;
      height: 30vh;
    }
  }

  @media screen and (max-width: 850px) {
    .contentCard {
      width: 30vw;
      height: 25vh;
    }
    .contentImage {
      width: 30vw;
      height: 25vh;
    }
  }
  @media screen and (max-width: 700px) {
    .contentCard {
      width: 30vw;
      height: 20vh;
    }
    .contentImage {
      width: 30vw;
      height: 20vh;
    }
  }
`;

export const UploadContainer = styled(Upload)`
  margin-top: 10px;
  .ant-btn-primary {
    background-color: #fec107;
    color: black;
  }
`;

export const HistoryContainer = styled.div`
  margin-top: 10px;
  .ant-btn-primary {
    background-color: #fec107;
    color: black;
  }
`;

export const ButtonUpload = styled(Button)`
  border-radius: 10px;
  background-color: #fec107;
  border: none;
`;

export const ContentImage = styled(Image)`
  // width: 20vw;
  // height: 30vh;
`;

export const ContentPosition = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

export const ContentCard = styled(Card)<{ isResult?: boolean | false }>`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  ${(props) => (props.isResult ? "overflow-y: scroll" : "overflow-y: hidden")};
  ${(props) =>
    !props.isResult
      ? "justify-content: center"
      : "justify-content: flex-start"};
  ${(props) =>
    !props.isResult ? "align-items: center" : "align-items: flex-start"};
`;

export const ContentCardText = styled(Typography.Paragraph)`
  font-size: 16px;
  text-align: justify;
`;

export const SubmitButton = styled(Button)`
  // width: 8vw;
  // height: 8vh;
  font-weigth: bold;
  color: white;
  border: none;
  border-radius: 10px;
  background-color: #fec107;
`;

export const FooterContainer = styled.div`
  background-color: #fec107;
  width: 100%;
  height: 10%;
`;

export const ContentAuthorContainer = styled.div`
  // width: 34%;
  width: 100%;
  margin-top: 5px;

  // .authorImage {
  //   width: 90px;
  //   height: 90px;
  // }
  // &:hover {
  //   cursor: pointer;
  // }
  // -webkit-user-drag: none;
  // -khtml-user-drag: none;
  // -moz-user-drag: none;
  // -o-user-drag: none;
  // user-drag: none;
`;

export const FooterTypography = styled(Typography)`
  font-size: 20px;
  color: black;
  text-align: center;
  font-weight: bold;
`;

import { Typography, Image, Button, Upload, Card } from "antd";
import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 10%;
  background-color: #fec107;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderTypography = styled(Typography)`
  font-size: 20px;
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

export const ContentContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fefefe;
  width: 100%;
  color: white;
  margin-top: 10px;
`;

export const ContentContainerCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fefefe;
  height: 80%;
  width: 100%;
  color: white;
`;

export const ContentContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
`;

export const UploadContainer = styled(Upload)`
  margin-top: 10px;
  .ant-btn-primary {
    background-color: #fec107;
  }
`;

export const ButtonUpload = styled(Button)`
  border-radius: 10px;
  margin-right: 10px;
  background-color: #fec107;
  border: none;
  color: black;
`;

export const ContentImage = styled(Image)`
  width: 20vw;
  height: 30vh;
`;

export const ContentPosition = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

export const ContentCardLeft = styled(Card)`
  width: 20vw;
  height: 30vh;
`;

export const ContentCard = styled(Card)`
  width: 20vw;
  height: 30vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ContentCardText = styled(Typography)`
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  width: 100px;
  height: 60px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FooterTypography = styled(Typography)`
  font-size: 20px;
  color: black;
  text-align: center;
  font-weight: bold;
`;

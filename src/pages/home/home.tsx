/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import {
  ButtonUpload,
  SubmitButton,
  ContentContainer,
  ContentSideContainer,
  FooterContainer,
  HeaderContainer,
  HeaderTypography,
  LayoutContainer,
  UploadContainer,
  ContentContainerTop,
  ContentContainerCenter,
  ContentContainerBottom,
} from "./homeStyle";
import {
  UploadOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import InputOutput from "../../components/inOutput";
import History from "../../components/history";
import CarouselAuthor from "../../components/carousel";
import { SERVER_URL } from "../../common/constants";
import { Divider } from "antd";
import ListImage from "../../components/listImage";

function Home() {
  const [imageSrc, setImageSrc] = useState("");
  const [image64, setImage64] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "POST",
        url: `${SERVER_URL}/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage64("data:image/png;base64," + response.data.image);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleFileUpload = (info: any) => {
    setImageSrc(URL.createObjectURL(info.file));
    setSelectedFile(info.file);
    setUpload(true);
  };

  const handleFileRemove = () => {
    setImageSrc("");
    setSelectedFile("");
    setUpload(false);
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeaderTypography className="headerText">
          VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY UNIVERSITY OF
          INFORMATION TECHNOLOGY
          <br />
          GRADUATION THESIS WEB DEMO AERIAL IMAGE OBJECT DETECTION
        </HeaderTypography>
      </HeaderContainer>
      <ContentContainer>
        <ContentContainerTop>
          {/* <CarouselAuthor /> */}
          <ListImage />
        </ContentContainerTop>
        <ContentContainerCenter>
          <InputOutput image={imageSrc} position="Input" />
          <ContentSideContainer upload={upload}>
            <SubmitButton
              className="submitButton"
              disabled={!upload ? true : false}
              type="primary"
              icon={
                loading ? (
                  <ReloadOutlined spin={true} style={{ fontSize: "50px" }} />
                ) : (
                  <ArrowRightOutlined style={{ fontSize: "50px" }} />
                )
              }
              onClick={handleSubmit}
            />
          </ContentSideContainer>
          <InputOutput image={image64} position="Output" />
        </ContentContainerCenter>
        <ContentContainerBottom>
          <UploadContainer
            name={"file"}
            onChange={handleFileUpload}
            onRemove={handleFileRemove}
            beforeUpload={() => false}
            maxCount={1}
          >
            <ButtonUpload type="primary" icon={<UploadOutlined />} size="large">
              Click to Upload
            </ButtonUpload>
          </UploadContainer>
          <History />
        </ContentContainerBottom>
      </ContentContainer>
      <FooterContainer>
        <CarouselAuthor />
      </FooterContainer>
    </LayoutContainer>
  );
}

export default Home;

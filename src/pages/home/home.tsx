import React, { useState } from "react";
import axios from "axios";
import {
  ButtonUpload,
  SubmitButton,
  ContentContainer,
  ContentImage,
  ContentSideContainer,
  FooterContainer,
  FooterTypography,
  HeaderContainer,
  HeaderTypography,
  LayoutContainer,
  UploadContainer,
  ContentCard,
  ContentCardLeft,
  ContentContainerTop,
  ContentContainerCenter,
  ContentContainerBottom,
} from "./homeStyle";
import {
  UploadOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  InboxOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import InputOutput from "../../components/inOutput";
import { Avatar } from "antd";

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
      // const response = await axios({
      //   method: "GET",
      //   url: "http://192.168.20.166:5000/history",
      // });
      const response = await axios({
        method: "POST",
        url: "http://192.168.20.166:5000/upload",
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

  // const handleFileSelect = (event: any) => {
  //   setImageSrc(URL.createObjectURL(event.target.files[0]));
  //   setSelectedFile(event.target.files[0]);
  //   setUpload(!upload);
  // };

  const handleFileUpload = (info: any) => {
    // setImageSrc(URL.createObjectURL(info.file.originFileObj));
    // setSelectedFile(info.file.originFileObj);
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
        <HeaderTypography>
          VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY UNIVERSITY OF
          INFORMATION TECHNOLOGY
        </HeaderTypography>
        <HeaderTypography>
          GRADUATION THESIS WEB DEMO AERIAL IMAGE OBJECT DETECTION
        </HeaderTypography>
      </HeaderContainer>
      <ContentContainer>
        <ContentContainerTop>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
          {/* <UploadContainer
            name={"file"}
            onChange={handleFileUpload}
            onRemove={handleFileRemove}
            beforeUpload={() => false}
            maxCount={1}
          >
            <ButtonUpload type="primary" icon={<UploadOutlined />}>
              Click to Upload
            </ButtonUpload>
          </UploadContainer> */}
        </ContentContainerTop>
        <ContentContainerCenter>
          <InputOutput image={imageSrc} position="Input" />
          <ContentSideContainer upload={upload}>
            <SubmitButton
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
            <ButtonUpload type="primary" icon={<UploadOutlined />}>
              Click to Upload
            </ButtonUpload>
          </UploadContainer>
        </ContentContainerBottom>
      </ContentContainer>
      <FooterContainer>
        <FooterTypography>
          VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY UNIVERSITY OF
          INFORMATION TECHNOLOGY
        </FooterTypography>
        <FooterTypography>
          GRADUATION THESIS WEB DEMO AERIAL IMAGE OBJECT DETECTION
        </FooterTypography>
      </FooterContainer>
    </LayoutContainer>
  );
}

export default Home;

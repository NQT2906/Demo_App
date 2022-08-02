/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
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
  ContentContainerTopText,
} from "./homeStyle";
import {
  UploadOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import InputOutput from "../../components/inOutput";
import History from "../../components/history";
import CarouselAuthor from "../../components/carousel";
import { SERVER_URL, TOPIC } from "../../common/constants";
import ListImage from "../../components/listImage";
import Download from "../../components/download";
import Detail from "../../components/details";
import { message } from "antd";

function Home() {
  const [imageSrc, setImageSrc] = useState("");
  const [image64, setImage64] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [textLocation, setTextLocation] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // List were created by information in https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  // Types below maybe contain animated and img-crop-ant can't handle it (it will transform file to png)
  // img-crop-ant can handle file type BMP, ICO, RAW
  const listTypeAnimatedImage = [
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/avif",
    "image/apng",
  ];

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
      setTextLocation(response.data.textLocation);
      setTextTitle(response.data.name);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleFileUpload = (info: any) => {
    if (
      listTypeAnimatedImage.includes(info.file.type) ||
      info.file.size / 1024 / 1024 > 2
    ) {
    } else {
      setImageSrc(URL.createObjectURL(info.file.originFileObj));
      setSelectedFile(info.file.originFileObj);
    }
    setUpload(true);
  };

  const handleFileRemove = () => {
    setImageSrc("");
    setSelectedFile("");
    setUpload(false);
  };

  const props = {
    name: "file",
    multiple: false,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info: any) {
      setImageSrc(URL.createObjectURL(info.file));
      setSelectedFile(info.file);
      setUpload(true);
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    window.addEventListener("resize", function () {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeaderTypography className="headerText">
          UNIVERSITY OF INFORMATION TECHNOLOGY
          <br />
          VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY
        </HeaderTypography>
        <ListImage />
      </HeaderContainer>
      <ContentContainer>
        <ContentContainerTop>
          {/* <CarouselAuthor /> */}
          {/* <ListImage /> */}
          {/* <ContentContainerTopDivider /> */}
          <ContentContainerTopText>
            <HeaderTypography className="headerTopic">
              GRADUATION THESIS WEB DEMO
            </HeaderTypography>
            <HeaderTypography className="headerDemo">{TOPIC}</HeaderTypography>
          </ContentContainerTopText>
        </ContentContainerTop>
        <ContentContainerCenter className="containerCenter">
          <InputOutput imageInput={imageSrc} position="Input" />
          <ContentSideContainer upload={upload}>
            <SubmitButton
              className="submitButton"
              disabled={!upload ? true : false}
              type="primary"
              icon={
                loading ? (
                  <ReloadOutlined spin={true} style={{ fontSize: "200%" }} />
                ) : (
                  <ArrowRightOutlined style={{ fontSize: "200%" }} />
                )
              }
              onClick={handleSubmit}
            />
          </ContentSideContainer>
          <InputOutput
            imageInput={image64}
            output={image64}
            position="Output"
          />
        </ContentContainerCenter>
        <ContentContainerBottom className="containerBottom">
          <UploadContainer
            name={"file"}
            onChange={handleFileUpload}
            onRemove={handleFileRemove}
            beforeUpload={(file) => {
              const isJpgOrPng =
                file.type === "image/jpeg" || file.type === "image/png";
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isJpgOrPng) {
                message.error("You can only upload JPG/PNG file!");
              } else {
                if (!isLt2M) {
                  message.error("Image must smaller than 2MB!");
                }
              }

              return isJpgOrPng && isLt2M;
            }}
            maxCount={1}
            showUploadList={false}
          >
            <ButtonUpload
              type="primary"
              icon={<UploadOutlined />}
              // size="large"
              className="buttonBottom"
            >
              {!(width <= 900) ? "Upload" : null}
            </ButtonUpload>
          </UploadContainer>
          <History width={width} />
          <Download width={width} text={textLocation} title={textTitle} />
          <Detail width={width} location={textLocation} title={textTitle} />
        </ContentContainerBottom>
      </ContentContainer>
      <FooterContainer>
        <CarouselAuthor />
      </FooterContainer>
    </LayoutContainer>
  );
}

export default Home;

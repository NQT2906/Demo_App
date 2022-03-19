import React, { useState } from "react";
import {
  ButtonUpload,
  ContentImage,
  DownloadContainer,
  HistoryContainer,
} from "../pages/home/homeStyle";
import {
  ContentModalContainer,
  ContentModaText,
  ModalContainer,
} from "./historyStyle";
import {
  HistoryOutlined,
  LoadingOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { SERVER_URL } from "../common/constants";
import { Divider, Spin } from "antd";

const History = ({ width }: { width: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [created, setCreated] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const [name, setName] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  // const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getHistory = async () => {
    setLoading(false);
    try {
      const response = await axios({
        method: "GET",
        url: `${SERVER_URL}/history`,
      });
      let createdTemp: string[] = [];
      let imageTemp: string[] = [];
      let nameTemp: string[] = [];
      let locationTemp: string[] = [];
      response.data.images.map((value: any) => {
        createdTemp = [...createdTemp, value.created];
        imageTemp = [...imageTemp, "data:image/png;base64," + value.image];
        nameTemp = [...nameTemp, value.name];
        locationTemp = [...locationTemp, value.textLocation];
        return 0;
      });
      setCreated(createdTemp);
      setImage(imageTemp);
      setName(nameTemp);
      setLocation(locationTemp);
      // setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
  };

  const showModal = async () => {
    setIsModalVisible(true);
    getHistory();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // // Maybe use in future
  // const handleRemove = async (name_image: string) => {
  //   try {
  //     const data = {
  //       image_name: name_image,
  //     };
  //     const response = await axios({
  //       method: "POST",
  //       url: `${SERVER_URL}/remove`,
  //       data: data,
  //       headers: {
  //         "Content-Type": "text/plain",
  //       },
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const downloadTxtFile = (text: string, title: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = title + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  return (
    <>
      <HistoryContainer>
        <ButtonUpload
          type="primary"
          icon={<HistoryOutlined />}
          // size="large"
          onClick={showModal}
          className="buttonBottom"
        >
          {!(width <= 900) ? "History" : null}
        </ButtonUpload>
      </HistoryContainer>
      {/* 
      <ModalContainer
        title="History"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "scroll",
        }}
      >
        {!loading ? (
          <Spin indicator={antIcon} />
        ) : (
          image.map((value) => {
            count += 1;
            return (
              <ContentModalContainer key={"key" + key}>
                <ContentImage src={value.toString()} />
                <ContentModaText>{name[key]}</ContentModaText>
                <ContentModaText>
                  {created[key].split(" ")[1].split(".")[0].toString() +
                    " " +
                    created[key].split(" ")[0].toString()}
                </ContentModaText>
                <Divider style={{ color: "black" }} />
              </ContentModalContainer>
            );
          })
        )}
      </ModalContainer> */}

      {loading ? (
        <ModalContainer
          title="History"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={{ height: "75vh", overflowY: "scroll" }}
        >
          {image.map((value, key) => {
            return (
              <ContentModalContainer key={"key" + key}>
                {/* Maybe use in future */}

                <ContentImage
                  src={value.toString()}
                  width={"60%"}
                  height={"35%"}
                />
                {/* For OCR */}
                {/* <ContentCard className="contentCard" isResult={true}>
                  <ContentCardText copyable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </ContentCardText>
                </ContentCard> */}
                <ContentModaText>
                  {"Image name: "}
                  {name[key]}
                </ContentModaText>

                <ContentModaText>
                  {"Created time: "}
                  {created[key].split(" ")[1].split(".")[0].toString() +
                    " " +
                    created[key].split(" ")[0].toString()}
                </ContentModaText>
                <DownloadContainer>
                  <ButtonUpload
                    type="primary"
                    icon={<CloudDownloadOutlined />}
                    // size="large"
                    onClick={() => {
                      downloadTxtFile(location[key], name[key]);
                    }}
                    className="buttonBottom"
                  >
                    {!(width <= 900) ? "Download" : null}
                  </ButtonUpload>
                </DownloadContainer>
                <Divider style={{ color: "black" }} />
              </ContentModalContainer>
            );
          })}
        </ModalContainer>
      ) : (
        <ModalContainer
          title="History"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Spin indicator={antIcon} />
        </ModalContainer>
      )}
    </>
  );
};

export default History;

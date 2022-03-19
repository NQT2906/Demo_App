import React, { useState } from "react";
import {
  ButtonUpload,
  ContentImage,
  HistoryContainer,
} from "../pages/home/homeStyle";
import {
  ContentModalContainer,
  ContentModaText,
  ModalContainer,
  DownloadContainer,
} from "./historyStyle";
import {
  HistoryOutlined,
  LoadingOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { SERVER_URL } from "../common/constants";
import { Divider, Spin } from "antd";
import TableAnnotation from "./table";

const History = ({ width }: { width: number }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [created, setCreated] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const [name, setName] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
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

  const downloadTxtFile = (text: string, title: string) => {
    const element = document.createElement("a");
    const file = new Blob([text.substring(0, text.length)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = title + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  const ModalHistory = () => {
    return (
      <ModalContainer
        title="History"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        loading={loading}
      >
        {loading ? (
          image.map((value, key) => {
            return (
              <ContentModalContainer key={"key" + key}>
                <ContentImage
                  src={value.toString()}
                  width={"60%"}
                  height={"35%"}
                />
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
                <TableAnnotation location={location[key]} title={name[key]} />

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
          })
        ) : (
          <Spin indicator={antIcon} />
        )}
      </ModalContainer>
    );
  };

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
      <ModalHistory />
    </>
  );
};

export default History;

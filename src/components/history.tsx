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
} from "./historyStyle";
import { HistoryOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { SERVER_URL } from "../common/constants";
import { Divider, Spin } from "antd";

const History = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [created, setCreated] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
  const [name, setName] = useState<string[]>([]);
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
      response.data.images.map((value: any) => {
        createdTemp = [...createdTemp, value.created];
        imageTemp = [...imageTemp, "data:image/png;base64," + value.image];
        nameTemp = [...nameTemp, value.name];
        return 0;
      });
      setCreated(createdTemp);
      setImage(imageTemp);
      setName(nameTemp);
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

  let count = -1;

  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  return (
    <>
      <HistoryContainer>
        <ButtonUpload
          type="primary"
          icon={<HistoryOutlined />}
          size="large"
          onClick={showModal}
        >
          See history
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
              <ContentModalContainer key={"key" + count}>
                <ContentImage src={value.toString()} />
                <ContentModaText>{name[count]}</ContentModaText>
                <ContentModaText>
                  {created[count].split(" ")[1].split(".")[0].toString() +
                    " " +
                    created[count].split(" ")[0].toString()}
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
          {image.map((value) => {
            count += 1;
            return (
              <ContentModalContainer key={"key" + count}>
                <ContentImage src={value.toString()} />
                <ContentModaText>{name[count]}</ContentModaText>
                <ContentModaText>
                  {created[count].split(" ")[1].split(".")[0].toString() +
                    " " +
                    created[count].split(" ")[0].toString()}
                </ContentModaText>
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

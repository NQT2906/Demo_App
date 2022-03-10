/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ContentAuthorContainer } from "../pages/home/homeStyle";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const ListImage = () => {
  const itemsJson = [
    {
      image:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      name: "Nguyễn Quang Thuận",
      birthday: "29/06/2000",
      facebook: "https://www.facebook.com/nqt290600/",
      google: "",
      github: "https://github.com/NQT2906/",
    },
    {
      image:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      name: "Nguyễn Quang Thuận1",
      birthday: "29/06/2000",
      facebook: "https://www.facebook.com/nqt290600/",
      google: "",
      github: "https://github.com/NQT2906/",
    },
    {
      image:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      name: "Nguyễn Quang Thuận2",
      birthday: "29/06/2000",
      facebook: "https://www.facebook.com/nqt290600/",
      google: "",
      github: "https://github.com/NQT2906/",
    },
  ];

  return (
    <>
      {itemsJson.map((value, key) => {
        return (
          <Avatar
            key={"key" + key}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            // icon={<AntDesignOutlined />}
            src={value.image}
          />
        );
      })}
    </>
  );
};

export default ListImage;

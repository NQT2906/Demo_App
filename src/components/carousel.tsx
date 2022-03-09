/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ContentAuthorContainer } from "../pages/home/homeStyle";
import { ANIMATION_TIME, SWIPE_TIME } from "../common/constants";
import { Modal } from "antd";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  AuthorImage,
  CarouselContainer,
  TypoLink,
  TypoText,
} from "./carouselStyle";

const CarouselAuthor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [google, setGoogle] = useState("");
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ModalAuthor = () => {
    return (
      <Modal
        title="Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AuthorImage src={image} preview={false} width={200} height={200} />
        {name ? <TypoText>Full Name: {name}</TypoText> : null}
        {birthday ? <TypoText>Birthday: {birthday}</TypoText> : null}
        {google ? (
          <>
            <TypoText>Google: </TypoText>
            <TypoLink href={google} target="_blank">
              {google}
            </TypoLink>{" "}
          </>
        ) : null}
        {facebook ? (
          <>
            <TypoText>Facebook: </TypoText>
            <TypoLink href={facebook} target="_blank">
              {facebook}
            </TypoLink>{" "}
          </>
        ) : null}
        {github ? (
          <>
            <TypoText>Github: </TypoText>
            <TypoLink href={github} target="_blank">
              {github}
            </TypoLink>{" "}
          </>
        ) : null}
      </Modal>
    );
  };

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
    {
      image:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      name: "Nguyễn Quang Thuận3",
      birthday: "29/06/2000",
      facebook: "https://www.facebook.com/nqt290600/",
      google: "",
      github: "https://github.com/NQT2906/",
    },
    {
      image:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      name: "Nguyễn Quang Thuận4",
      birthday: "29/06/2000",
      facebook: "https://www.facebook.com/nqt290600/",
      google: "",
      github: "https://github.com/NQT2906/",
    },
  ];

  const itemCarousel = () => {
    return itemsJson.map((value, key) => {
      return (
        <AuthorImage
          className="authorImage"
          key={"key" + key}
          preview={false}
          src={value.image}
          style={{ borderRadius: "100px" }}
          // width={90}
          // height={90}
          // width={"50%"}
          // height={"50%"}
          onClick={() => {
            setImage(value.image);
            setName(value.name);
            setBirthday(value.birthday);
            setGoogle(value.google);
            setFacebook(value.facebook);
            setGithub(value.github);
            showModal();
          }}
        />
      );
    });
  };

  const responsive = {
    0: { items: 1 },
    624: { items: 2 },
    1248: { items: 3 },
  };

  return (
    <ContentAuthorContainer>
      {/* <AliceCarousel
        mouseTracking
        items={itemCarousel()}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls
        disableDotsControls
        infinite={true}
        autoPlay={true}
        innerWidth={window.innerWidth}
        animationDuration={ANIMATION_TIME}
        autoPlayInterval={SWIPE_TIME}
      /> */}
      <CarouselContainer
        infiniteLoop
        useKeyboardArrows
        autoPlay
        centerMode={true}
        centerSlidePercentage={30}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        verticalSwipe="standard"
        swipeable={true}
        emulateTouch={true}
      >
        {itemsJson.map((value, key) => {
          return (
            <AuthorImage
              className="authorImage"
              key={"key" + key}
              preview={false}
              src={value.image}
              style={{ borderRadius: "100px" }}
              onClick={() => {
                setImage(value.image);
                setName(value.name);
                setBirthday(value.birthday);
                setGoogle(value.google);
                setFacebook(value.facebook);
                setGithub(value.github);
                showModal();
              }}
            />
          );
        })}
      </CarouselContainer>
      {/* <p>© Web Designed by Thuan Nguyen Quang</p> */}
      <ModalAuthor />
    </ContentAuthorContainer>
  );
};

export default CarouselAuthor;

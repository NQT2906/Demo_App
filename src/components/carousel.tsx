/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Modal } from "antd";

import {
  AuthorImage,
  CarouselContainer,
  TypoLink,
  TypoText,
  ContentAuthorContainer,
  ThumbnailAuthorImage,
} from "./carouselStyle";
import { listAuthor } from "../assets/data/listAuthor";
import { ContentContainerSponsor, SponsorImage } from "./listImageStyle";
import { listSponsor } from "../assets/data/listSponsor";
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

  return (
    // <ContentAuthorContainer>
    //   {listAuthor.map((value, key) => {
    //     return (
    //       <ThumbnailAuthorImage
    //         key={"key" + key}
    //         src={value.image}
    //         className="sponsorImage"
    //         preview={false}
    //         onClick={() => {
    //           setImage(value.image);
    //           setName(value.name);
    //           setBirthday(value.birthday);
    //           setGoogle(value.google);
    //           setFacebook(value.facebook);
    //           setGithub(value.github);
    //           showModal();
    //         }}
    //       />
    //     );
    //   })}
    //   <ModalAuthor />
    // </ContentAuthorContainer>
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
        {listAuthor.map((value, key) => {
          return (
            <ThumbnailAuthorImage
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

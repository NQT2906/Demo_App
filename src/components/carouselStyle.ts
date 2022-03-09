import { Modal, Image, Typography } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  .ant-modal-content {
    height: 80vh;
    display: flex;
    flex-direction: column;
  }
`;

export const ContentModalContainer = styled.div`
  .ant-divider {
    height: 2px;
  }
`;

export const ContentModaText = styled.p`
  font-size: 16px;
`;

export const AuthorImage = styled(Image)`
  &:hover {
    cursor: pointer;
  }
  // -webkit-user-drag: none;
  // -khtml-user-drag: none;
  // -moz-user-drag: none;
  // -o-user-drag: none;
  // user-drag: none;
`;

export const CarouselContainer = styled(Carousel)`
  .authorImage {
    width: 90px;
    height: 90px;
  }
  // -webkit-user-drag: none;
  // -khtml-user-drag: none;
  // -moz-user-drag: none;
  // -o-user-drag: none;
  // user-drag: none;
`;

export const TypoText = styled(Typography)``;
export const TypoLink = styled(Typography.Link)``;

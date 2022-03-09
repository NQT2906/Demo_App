import { Modal } from "antd";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  // .ant-modal-content {
  //   height: 80vh;
  // }
  color: black;
`;

export const ContentModalContainer = styled.div`
  .ant-divider {
    height: 2px;
  }
`;

export const ContentModaText = styled.p`
  font-size: 16px;
`;

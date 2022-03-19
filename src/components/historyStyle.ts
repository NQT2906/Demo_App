import { Modal } from "antd";
import styled from "styled-components";

export const ModalContainer = styled(Modal)<{ loading: boolean }>`
  .ant-modal-body {
    height: 75vh;
    overflow-y: scroll;
    ${(props) => (!props.loading ? "display: flex" : null)};
    ${(props) => (!props.loading ? "flex-direction: column" : null)};
    ${(props) => (!props.loading ? "justify-content: center" : null)};
  }
  color: black;
`;

export const ContentModalContainer = styled.div`
  .ant-divider {
    height: 2px;
  }
  display: flex;
  flex-direction: column;
`;

export const ContentModaText = styled.p`
  font-size: 16px;
`;

export const DownloadContainer = styled.div`
  margin-top: 10px;
  .ant-btn-primary {
    background-color: #fec107;
    color: black;
  }
  align-self: flex-end;
`;

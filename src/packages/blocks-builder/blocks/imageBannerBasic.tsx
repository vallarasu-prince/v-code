// ImageBannerBasic.tsx
import React from "react";
import { Col, Row } from "antd";

const ImageBannerBasic = ({
  backgroundImage,
  justifyContent,
  children,
}: any) => {
  return (
    <Row style={{ width: "100%" }}>
      <img style={{ width: "100%" }} src={backgroundImage} />
    </Row>
  );
};

export default ImageBannerBasic;

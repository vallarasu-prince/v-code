// TwoColImageBanner.tsx
import React from "react";
import { Col, Row } from "antd";

const TwoColImageBanner = ({ justifyContent, children }: any) => {
  return (
    <Row style={{ width: "100%", justifyContent }}>
      <Col span={12}>{children}</Col>
      <Col span={12}>{/* Add the second column content here */}</Col>
    </Row>
  );
};

export default TwoColImageBanner;

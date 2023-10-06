import RowComponent from "../../components/rowComponent";
import { BlockItem } from "./types";

export const renderBlockPreview = (block: any) => {
  switch (block.type) {
    
    case "ImageBannerBasic":
      return (
        <div style={{ width: "100%" }}>
          <img
            src={block.props.backgroundImage}
            alt="Block Preview"
            style={{ width: "100%" }}
          />
        </div>
      );

    case "RowComponent":
      return <RowComponent {...block} />;

    case "Img":
      return (
        <div style={{ width: "100%" }}>
          <img
            src={block.props.backgroundImage}
            alt="Block Preview"
            style={{ width: "100%" }}
          />
        </div>
      );

    default:
      return null;
  }
};

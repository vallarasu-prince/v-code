import { EmptyCard } from "../common";
import RowComponent from "../elements/rowComponent";
import { BlockItem } from "./types";

export const renderBlockPreview = (block: any, blockItemIdx: any) => {
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

    case "text":
      return <h1 {...block}>{block.props.text}</h1>;

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

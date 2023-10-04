import { BlockItem } from "./types";

export const renderBlockPreview = (block: BlockItem) => {
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

    default:
      return null;
  }
};

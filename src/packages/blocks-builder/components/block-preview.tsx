import { BlockItem } from "./types";

export const renderBlockPreview = (block: BlockItem) => {
  switch (block.type) {
    case "ImageBannerBasic":
      return (
        <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
          <img
            src={block.props.backgroundImage}
            alt="Block Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      );

    default:
      return null;
  }
};
import RowComponent from "../elements/rowComponent";
import { BlockItem } from "./types";

export const renderBlockPreview = (
  items: any,
  index: any,
  block: any,
  onElementSelected: any,
  handleDeleteItem: any,
  handleDuplicateItem: any,
  onSortItems: any,
  editableItemIndex: any
) => {
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
      return (
        <RowComponent
          {...block}
          onElementSelected={onElementSelected}
          handleDeleteItem={handleDeleteItem}
          handleDuplicateItem={handleDuplicateItem}
          onSortItems={onSortItems}
          editableItemIndex={editableItemIndex}
          items={items}
          index={index}
        />
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

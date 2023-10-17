import { BlockItem } from "./types";

export const blockItems = [
  {
    id: "wklklklqx",
    name: "Category 1",
    type: "row",
    props: {},
    items: [],
  },
  {
    id: "wkqx",
    name: "Category 2",
    props: {
      backgroundImage:
        "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=996&t=st=1696053756~exp=1696054356~hmac=23135cdca80e41604317176a1564cbf839cee14f2de7b5185da3e266f1648b25",
    },
    items: [
      {
        id: "1",
        type: "ImageBannerBasic",
        props: {
          backgroundImage:
            "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=996&t=st=1696053756~exp=1696054356~hmac=23135cdca80e41604317176a1564cbf839cee14f2de7b5185da3e266f1648b25",
          justifyContent: "space-between",
        },
      },
      {
        id: "2",
        type: "ImageBannerBasic",
        props: {
          backgroundImage:
            "https://img.freepik.com/free-photo/vintage-grunge-blue-concrete-texture-wall-background-with-vignette_1258-28373.jpg?w=996&t=st=1696414061~exp=1696414661~hmac=a1e77ba70fdd240cc1f02ecb0cef6a25c5fd8ab408779631612c62b05716169d",
          justifyContent: "space-between",
        },
      },
    ],
  },
];

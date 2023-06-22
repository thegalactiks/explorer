import { defineMarkdocConfig } from "@astrojs/markdoc/config";
import Aside from "./src/components/Aside.astro";

export default defineMarkdocConfig({
  tags: {
    aside: {
      render: Aside,
      attributes: {
        title: { type: String },
        type: { type: String },
      },
    },
  },
});

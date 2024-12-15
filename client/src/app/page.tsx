import qs from "qs";
import { notFound } from "next/navigation";

import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import { blockRenderer } from "@/lib/block-renderer";
import { Block } from "@/types";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            links: true,
          },
        },
        "blocks.card-carousel": {
          populate: {
            cards: true,
          },
        },
        "blocks.heading": true,
      },
    },
  },
});

async function loader() {
  // const authToken = process.env.STRAPI_API_TOKEN;
  const BASE_URL = getStrapiURL();
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  const data = await fetchAPI(url.href, {
    method: "GET",
  });

  if (!data?.data) notFound();

  const blocks = data?.data?.blocks || [];
  return { blocks };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data.blocks;
  return (
    <div>
      {blocks.map((block: Block, index: number) => {
        return blockRenderer(block, index);
      })}
    </div>
  );
}

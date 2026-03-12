import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "h53ofne2",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: "skwTjJ2dCHwspE87zTxqRQIxrrtEL3KKGNlcFsKxi59GUgjZo8nXm1p8EmAMryi7menCaBSY7872zfH1cBVbIJLBzzckLkFMystvAGjUfbcLqGSRuPxEhfYxNGW9tvsavKn6CegLxa3T4Kn34af5pa7Wdtp4ssyTRVFSlQd955nVkpgHUb7n",
});

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

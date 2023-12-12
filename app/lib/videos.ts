import "server-only";

import data from "@/app/lib/data.json";

export const getVideos = () => data;

export type Video = (typeof data)[number];

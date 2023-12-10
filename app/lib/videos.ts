import "server-only";

import { z } from "zod";

import data from "@/local_files/data.json";

const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  src: z.string(),
  date: z.string().pipe(z.coerce.date()),
});

const DataSchema = z.array(VideoSchema);

export const getVideos = () => {
  const validatedData = DataSchema.safeParse(data);

  if (!validatedData.success) {
    console.log(JSON.stringify(validatedData.error, null, 2));
    return;
  }

  return validatedData.data;
};

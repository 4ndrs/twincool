import Image from "next/image";
import { getVideos } from "./lib/videos";
import Link from "next/link";

const Page = () => {
  const videos = getVideos();

  if (!videos) {
    throw new Error("no vids :(");
  }

  const video = videos[0];

  return (
    <main className="h-screen flex flex-col box-border">
      <h1 className="text-center">Twincool</h1>

      <div className="bg-red-200 flex-1 flex gap-x-3 gap-y-12 items-start flex-wrap content-start overflow-auto py-8 px-3">
        {Array.from({ length: 28 }).map((_, idx) => (
          <Link href={`/?v=${video.id}`} key={idx} className="relative">
            <Image
              alt={video.title}
              height={180}
              width={320}
              src={video.thumbnail}
            />
            <h1 className="absolute left-1/2 -bottom-8 -translate-x-1/2">
              {video.title}
            </h1>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Page;

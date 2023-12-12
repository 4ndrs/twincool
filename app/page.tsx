import Link from "next/link";
import Image from "next/image";
import GalleryModal from "./components/gallery-modal";

import { getVideos } from "./lib/videos";

const Page = () => {
  const videos = getVideos();

  if (!videos) {
    throw new Error("no vids :(");
  }

  return (
    <main className="h-screen flex flex-col box-border">
      <h1 className="text-center">Twincool</h1>

      <div className="bg-red-200 flex-1 flex gap-x-3 gap-y-12 items-start flex-wrap content-start overflow-auto py-8 px-3">
        {videos.map((video) => (
          <Link key={video.id} href={`/?v=${video.id}`} className="relative">
            <Image
              alt={video.title}
              height={180}
              width={320}
              src={video.thumbnail}
            />
            <h1 className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap">
              {video.title}
            </h1>
          </Link>
        ))}
      </div>

      <GalleryModal videos={videos} />
    </main>
  );
};

export default Page;

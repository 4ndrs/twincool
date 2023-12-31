"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";

import type { Video } from "@/app/lib/videos";

const GalleryModal = ({ videos }: { videos: Video[] }) => {
  const [hydrated, setHydrated] = useState(false);

  // bypass hydration errors (https://github.com/radix-ui/primitives/issues/1386)
  useEffect(() => setHydrated(true), []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const videoId = searchParams.get("v");

  const video = videos.find((video) => video.id === videoId);

  if (!hydrated || !video) {
    return;
  }

  const handleClose = () => router.push(pathname);

  return (
    <Dialog.Root open={true} onOpenChange={handleClose}>
      <Dialog.Portal container={document.body}>
        <Dialog.Overlay className="fixed inset-0 bg-black/25">
          <Dialog.Content className="flex h-full w-full flex-col md:flex-row">
            <div
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  // close the dialog when clicking anywhere outside other elements
                  handleClose();
                }
              }}
              className="relative flex h-full w-full flex-1 flex-col justify-around"
            >
              <video controls autoPlay loop src={video.src} className="m-5" />

              <Dialog.Title className="absolute bottom-3 right-5 bg-black p-3 text-xs text-white xl:text-base">
                {video.title}
              </Dialog.Title>
            </div>

            <div className="flex overflow-x-auto bg-black/80 md:flex-col md:overflow-y-auto">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/?v=${video.id}`}
                  className={clsx("flex-shrink-0 p-2", {
                    "bg-sky-500": video.id === videoId,
                  })}
                >
                  <Image
                    alt={video.title}
                    src={video.thumbnail}
                    height={180}
                    width={320}
                    className="h-[100px] w-auto xl:h-[180px]"
                  />
                </Link>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GalleryModal;

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
        <Dialog.Overlay className="bg-black/25 fixed inset-0">
          <Dialog.Content className="flex h-full w-full">
            <div
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  // close the dialog when clicking anywhere outside other elements
                  handleClose();
                }
              }}
              className="relative flex flex-col justify-around h-full w-full"
            >
              <video controls loop src={video.src} className="m-5" />

              <Dialog.Title className="p-3 bg-black text-white absolute bottom-3 right-5">
                {video.title}
              </Dialog.Title>
            </div>

            <div className="bg-black/80 w-[320px] flex flex-col overflow-y-auto">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/?v=${video.id}`}
                  className={clsx("p-2", {
                    "bg-sky-500": video.id === videoId,
                  })}
                >
                  <Image
                    alt={video.title}
                    src={video.thumbnail}
                    height={180}
                    width={320}
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

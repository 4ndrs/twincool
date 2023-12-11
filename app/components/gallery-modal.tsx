"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
          <Dialog.Content
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                // close the dialog when clicking anywhere outside other elements
                handleClose();
              }
            }}
            className="flex flex-col justify-around h-full w-full"
          >
            <video controls loop src={video.src} className="m-5" />

            <Dialog.Title className="p-3 bg-black text-white absolute bottom-3 right-5">
              {video.title}
            </Dialog.Title>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GalleryModal;

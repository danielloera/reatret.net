"use client";

import photos from './photos';
import { useRouter } from 'next/navigation';
import { useWindowSize } from "@uidotdev/usehooks";

export default function Home() {
  const router = useRouter();
  const size = useWindowSize();
  const numCols = Math.min(Math.ceil(size.width / 400), 4);
  const totalHeightRatio = photos.reduce((acc, curr) => acc + 1 / curr.ratio, 0);
  const heightPerCol = Math.ceil(totalHeightRatio / numCols);

  const chunkedPhotos = [];
  let chunkList = [];
  let accHeight = 0;
  for (let i = 0; i < photos.length; i += 1) {
    const photo = photos[i];
    const currHeight = 1 / photo.ratio;
    if (currHeight + accHeight > heightPerCol) {
      chunkedPhotos.push(chunkList);
      chunkList = [];
      accHeight = 0;
    }
    accHeight += currHeight;
    chunkList.push(photo);
  }
  chunkedPhotos.push(chunkList);

  let photoColumns = chunkedPhotos.map((chunk, cIdx) =>
      <div key={cIdx} className="flex flex-col gap-5">{
          chunk.map((photo, pIdx) =>
	      <div key={pIdx}>
          <img
            onClick={() => router.push(`/photo/${photo.id}`)}
            className="w-full h-full rounded-md object-cover
                       hover:outline outline-4 outline-teal-500"
            src={photo.thumbnailPath}
            alt={photo.description}/>
	      </div>)}
      </div>);

  return (
    <main className="max-w-90  w-[90%] m-auto pt-10">
     <div className="flex flex-row gap-5">
      {photoColumns}
     </div>
    </main>
  );
}

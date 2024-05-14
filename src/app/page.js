"use client";

import photos from './photos';
import Link from 'next/link';
import { useWindowSize } from "@uidotdev/usehooks";

export default function Home() {
  const size = useWindowSize();
  const colSizeScale = 4;
  const numCols = Math.round(size.width / (colSizeScale * 100));
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
      <div key={cIdx} className="flex flex-col gap-3">{
          chunk.map((photo, pIdx) =>
	      <div key={pIdx}>

          <Link href={`/photo/${photo.id}`}>
          <img
            className="w-full h-full rounded-md object-cover
                       hover:outline outline-3 outline-teal-500"
            src={photo.thumbnailPath}
            alt={photo.description}/>
	  </Link>
	      </div>)}
      </div>);

  return (
    <main className="w-[95%] m-auto pt-10">
     <div className="flex flex-row justify-center gap-3">
      {photoColumns}
     </div>
    </main>
  );
}

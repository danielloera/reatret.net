"use client";

import Link from 'next/link';
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import { Databases } from "appwrite";
import { useState, useEffect } from 'react';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const client = useAppWriteContext();
  const databases = new Databases(client);
    useEffect(() => {
    const fetchData = async () => {
      const result = await client.getAllPhotos();
      setPhotos(result.documents);
    };

    fetchData();
  }, []);

  const size = useWindowSize();
  const colSizeScale = 4;
  const numCols = Math.round(size.width / (colSizeScale * 100));
  const totalHeightRatio = photos.reduce((acc, curr) => acc + curr.height / curr.width, 0);
  const heightPerCol = Math.ceil(totalHeightRatio / numCols);

  const chunkedPhotos = [];
  let chunkList = [];
  let accHeight = 0;
  for (let i = 0; i < photos.length; i += 1) {
    const photo = photos[i];
    const currHeight = photo.height / photo.width;
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
              src={photo.photo_full_res_url}
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

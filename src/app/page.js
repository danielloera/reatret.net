"use client";

import Link from 'next/link';
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

const PULSE_ANIMATION = "animate-pulse"

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [clickedPhoto, setClickedPhoto] = useState(null);
  const client = useAppWriteContext();
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
  photos.forEach((photo) => {
    const currHeight = photo.height / photo.width;
    if (chunkedPhotos.length + 1 < numCols && currHeight + accHeight > heightPerCol) {
      chunkedPhotos.push(chunkList);
      chunkList = [];
      accHeight = 0;
    }
    accHeight += currHeight;
    chunkList.push(photo);
  });
  chunkedPhotos.push(chunkList);

  if (photos.length == 0) return (<Loader></Loader>);

  let photoColumns = chunkedPhotos.map((chunk, cIdx) =>
      <div key={cIdx} className="flex flex-col gap-3">{
          chunk.map((photo, pIdx) => {
        const animation = photo.id == clickedPhoto ? PULSE_ANIMATION : "";
	      return <div key={pIdx}
             className={`bg-stone-900 rounded-md w-[600] h-[400] ${animation}`}
             onclick={() => setClickedPhoto(photo.id)}>
          <Link href={`/photo/${photo.id}`}>
            <img
              className="w-full h-full rounded-md object-cover
                         hover:outline hover:animate-pulse outline-3 outline-teal-500"
              src={photo.thumbnail_url}
              alt={photo.description}/>
	        </Link>
	      </div>})}
      </div>);

  return (
    <main className="w-[95%] m-auto pt-10">
     <div className="flex flex-row justify-center gap-3">
      {photoColumns}
     </div>
    </main>
  );
}

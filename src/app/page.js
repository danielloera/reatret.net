"use client";

import Link from 'next/link';
import Image from 'next/image'
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import { useState, useEffect } from 'react';

const COL_SIZE_SCALE = 4;

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isConstructing, setIsConstructing] = useState(true);
  const size = useWindowSize();
  const client = useAppWriteContext();

  useEffect(() => {
    setIsFetching(true);
    const fetchData = async () => {
      const result = await client.getAllPhotos();
      setPhotos(result.documents);
      setIsFetching(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsConstructing(true);
    const numCols = Math.round(size.width / (COL_SIZE_SCALE * 100));
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
    setColumns(chunkedPhotos);
    setIsConstructing(false);
  }, [isFetching, size]);


  if (isFetching || isConstructing) return (<Loader></Loader>);

  let photoColumns = columns.map((chunk, cIdx) =>
      <div key={cIdx} className="flex flex-col gap-3">{
          chunk.map((photo, pIdx) =>
	      <div key={pIdx}
             className={`bg-stone-800 rounded-lg w-[${photo.width}px] h-[${photo.height}px]`}>
          <Link href={`/photo/${photo.id}`}>
            <Image
              className="w-full h-full rounded-md object-cover
                         hover:outline hover:animate-pulse outline-3 outline-teal-500"
              width={photo.width}
              height={photo.height}
              src={photo.thumbnail_url}
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

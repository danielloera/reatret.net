"use client";

import Image from 'next/image'
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import AppBar from './common/app_bar';
import { useState, useEffect, useMemo } from 'react';
import { InView } from "react-intersection-observer";

const COL_SIZE_SCALE = 6;

function setShuffledList(setter, list) {
  let shuffled = list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  setter(shuffled);
}

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const size = useWindowSize();
  const client = useAppWriteContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const result = await client.getAllPhotos();
      setPhotos(result.documents);
      setIsFetching(false);
    };
    fetchData();
  }, [client]);

  // This memoized value will only be recalculated when `photos` or `size.width` changes.
  const photoColumns = useMemo(() => {
    if (photos.length === 0 || !size.width) return [];

    const numCols = Math.max(1, Math.round(size.width / (COL_SIZE_SCALE * 100)));
    const columns = Array.from({ length: numCols }, () => ({ photos: [], heightRatio: 0 }));

    photos.forEach((photo) => {
        // Find the column with the minimum current height to add the next photo
        let shortestColIndex = 0;
        for (let i = 1; i < columns.length; i++) {
            if (columns[i].heightRatio < columns[shortestColIndex].heightRatio) {
                shortestColIndex = i;
            }
        }
        columns[shortestColIndex].photos.push(photo);
        columns[shortestColIndex].heightRatio += photo.height / photo.width;
    });

    return columns;
  }, [photos, size.width]);


  if (isFetching) return <Loader/>;

  return (
    <main className="">
      <AppBar buttons={
        <span
          className="cursor-pointer"
          onClick={() => setShuffledList(setPhotos, photos)}>
          🔀
        </span>}/>
      <div className="w-full min-h-[200vh] p-3 m-auto">
       <div className="flex flex-row justify-center gap-3">
        {photoColumns.map((col, cIdx) => (
          <div key={cIdx} className="flex flex-col gap-3 w-full">
            {col.photos.map((photo, pIdx) => {
              const colWidth = Math.round(size.width / photoColumns.length);
              const adjustedPhotoHeight = Math.round((colWidth / photo.width) * photo.height);
              return (
              <InView key={photo.id} triggerOnce={true} rootMargin="300px">
                {({ inView, ref }) => (
                  <div ref={ref} className="bg-stone-800 rounded-lg">
                    <a href={`/photo/${photo.id}`} target="_blank">
                      {inView ? (
                        <Image
                          className="w-full h-auto rounded-md object-cover hover:outline outline-3 outline-teal-500"
                          width={colWidth}
                          height={adjustedPhotoHeight}
                          quality={50} // Quality can be slightly higher for better visuals
                          src={photo.thumbnail_url}
                          alt={photo.description}
                          priority={pIdx === 0}
                        />
                      ) : (
                        // This div acts as a placeholder, preventing layout shift
                        <Image
                          className="w-full h-full rounded-md object-cover
                                     hover:outline outline-3 outline-teal-500
                                     animate-[pulse_1s_linear_infinite]"
                          width={colWidth}
                          height={adjustedPhotoHeight}
                          unoptimized
                          src="gray.svg"
                          alt={photo.description}/>)}
                    </a>
                  </div>
                )}
              </InView>
            )})}
          </div>
        ))}
       </div>
      </div>
    </main>
  );
}
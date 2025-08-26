"use client";

import Image from 'next/image'
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import AppBar from './common/app_bar';
import { useState, useEffect, useMemo } from 'react';
import { InView } from "react-intersection-observer";
import Link from 'next/link'

const COL_SIZE_SCALE = 4;

function shuffleArray(array) {
  const newArray = [...array]; // Create a copy to avoid mutating the original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

export default function Home() {
  const [photos, setPhotos] = useState([]);

  const [pageIndex, setPageIndex] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const size = useWindowSize();
  const client = useAppWriteContext();

  useEffect(() => {
      // This flag will be used to ignore the result of the first, outdated fetch
      let ignore = false;

      const fetchData = async () => {
          setIsPageLoading(true);

          const result = await client.getPhotoPage(pageIndex);

          // Only update state if the effect has not been cleaned up
          if (!ignore) {
              if (result.documents && result.documents.length > 0) {
                  setPhotos(prevPhotos => [...prevPhotos, ...result.documents]);
              } else {
                  setHasMore(false);
              }

              setIsPageLoading(false);
          }
      };

      if (hasMore) {
          fetchData();
      }

      return () => {
          ignore = true;
      };
  }, [client, pageIndex, hasMore]);

  const photoColumns = useMemo(() => {
    if (photos.length === 0 || !size.width) return [];

    const numCols = Math.max(1, Math.round(size.width / (COL_SIZE_SCALE * 100)));
    const columns = Array.from({ length: numCols }, () => ({ photos: [], heightRatio: 0 }));

    photos.forEach((photo) => {
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


  if (isPageLoading && pageIndex === 0) return <Loader/>;

  return (
    <main className="">
      <AppBar buttons={
        <span
          className="cursor-pointer pl-4"
          onClick={() => setPhotos(currentPhotos => shuffleArray(currentPhotos))}>
          🔀
        </span>}/>
      <div className="w-full min-h-[200vh] p-3 m-auto">
       <div className="flex flex-row justify-center gap-3">
        {photoColumns.map((col, cIdx) => {
          const colWidth = Math.round(size.width / photoColumns.length);
          return <div key={cIdx} className="flex flex-col gap-3 w-full">
            {col.photos.map((photo, pIdx) => {
              const adjustedPhotoHeight = Math.round((colWidth / photo.width) * photo.height);
              return (
              <InView key={photo.id} triggerOnce={true} rootMargin="300px">
                {({ inView, ref }) => (
                  <div ref={ref} className="bg-stone-800 rounded-lg">
                    <Link href={`/photo/${photo.id}`}>
                      <Image
                        className={`w-full h-auto rounded-md object-cover hover:outline outline-3 outline-teal-500 ${!inView && "animate-[pulse_1s_linear_infinite]"}`}
                        width={colWidth}
                        height={adjustedPhotoHeight}
                        quality={50}
                        src={inView ? photo.thumbnail_url : "/gray.svg"}
                        alt={photo.description}
                        unoptimized={!inView}
                        priority={pIdx < 2}
                      />
                    </Link>
                  </div>
                )}
              </InView>
            )})}
          </div>
        })}
       </div>

        <InView
            as="div"
            threshold={0}
            onChange={(inView) => {
                if (inView && hasMore && !isPageLoading) {
                    setPageIndex((prev) => prev + 1);
                }
            }}>
            {isPageLoading && (
                <div className="flex justify-center my-8">
                    <span className="pt-mono-regular text-white">Loading...</span>
                </div>
            )}
        </InView>

        <div className="flex justify-center mt-4">
        {!hasMore && (
            <div
                className="pt-mono-regular text-sm
                           sm:text-base text-center text-stone-400">
                no more.
            </div>
            )}
        </div>
      </div>
    </main>
  );
}

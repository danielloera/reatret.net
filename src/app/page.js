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
  const [isFetching, setIsFetching] = useState(true); // For initial page load

  const [pageIndex, setPageIndex] = useState(0); // Start at page 0
  const [isPageLoading, setIsPageLoading] = useState(false); // For "Load More" button
  const [hasMore, setHasMore] = useState(true); // To hide the button when done

  const size = useWindowSize();
  const client = useAppWriteContext();

  useEffect(() => {
      // This flag will be used to ignore the result of the first, outdated fetch
      let ignore = false;

      const fetchData = async () => {
          if (pageIndex === 0) {
              setIsFetching(true);
          } else {
              setIsPageLoading(true);
          }

          const result = await client.getPhotoPage(pageIndex);

          // Only update state if the effect has not been cleaned up
          if (!ignore) {
              if (result.documents && result.documents.length > 0) {
                  setPhotos(prevPhotos => [...prevPhotos, ...result.documents]);
              } else {
                  setHasMore(false);
              }

              setIsFetching(false);
              setIsPageLoading(false);
          }
      };

      if (hasMore) {
          fetchData();
      }

      // This is the cleanup function. It runs when the component unmounts.
      return () => {
          ignore = true;
      };
  }, [client, pageIndex, hasMore]); // Added hasMore to dependency array for correctness

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


  if (isFetching && pageIndex === 0) return <Loader/>;

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
                          quality={50}
                          src={photo.thumbnail_url}
                          alt={photo.description}
                          priority={true}
                        />
                      ) : (
                        // This acts as a placeholder, preventing layout shift
                        <Image
                          className="w-full h-full rounded-md object-cover
                                     hover:outline outline-3 outline-teal-500
                                     animate-[pulse_1s_linear_infinite]"
                          width={colWidth}
                          height={adjustedPhotoHeight}
                          priority={true}
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

       <div className="flex justify-center mt-8">
        {hasMore && (
          <button
              onClick={() => setPageIndex(prev => prev + 1)}
              disabled={isPageLoading}
              className="bg-transparent pt-mono-regular text-white py-2 px-6 rounded-lg
                         hover:outline outline-3 outline-teal-500 disabled:bg-stone-600">
              load more
          </button>
            )}
        </div>

       <div className="flex justify-center">
        {!hasMore && (
          <div
              className="pt-mono-regular text-sm
                         sm:text-base text-center">
              no more.
          </div>
            )}
        </div>
      </div>
    </main>
  );
}
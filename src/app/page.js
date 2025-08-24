"use client";

import Image from 'next/image'
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import AppBar from './common/app_bar';
import { useState, useEffect, useMemo } from 'react';
import { InView } from "react-intersection-observer";
import Link from 'next/link';

const COL_SIZE_SCALE = 6;

const SCROLL_POSITION_KEY = "scrollPosition";
const IMAGE_GRID_KEY = "imageGrid";
const PAGE_KEY = "page";

function setShuffledList(setter, list) {
  let shuffled = list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  setter(shuffled);
}

const handleNavigation = () => {
  sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
};

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCacheLoading, setIsCacheLoading] = useState(true);
  const [isFetchEnabled, setIsFetchEnabled] = useState(false);

  const [pageIndex, setPageIndex] = useState(0); // Start at page 0
  const [isPageLoading, setIsPageLoading] = useState(false); // For subsequent page loads
  const [hasMore, setHasMore] = useState(true); // To stop fetching when done

  const size = useWindowSize();
  const client = useAppWriteContext();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const cachedPhotos = sessionStorage.getItem(IMAGE_GRID_KEY);
    const pageIdx = sessionStorage.getItem(PAGE_KEY);

    if (cachedPhotos && pageIndex != null) {
      setPhotos(JSON.parse(cachedPhotos));
      setPageIndex(pageIdx);
      setIsFetching(false);
      setIsPageLoading(false);
      setIsFetchEnabled(false);
      sessionStorage.removeItem(IMAGE_GRID_KEY);
      sessionStorage.removeItem(PAGE_KEY);
    } else {
      setIsFetchEnabled(true);
    }

    }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);

    if (savedPosition) {
      setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition, 10));
      }, 0);
    }

    sessionStorage.removeItem(SCROLL_POSITION_KEY);
    }, [photos]);

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

      // We only fetch if we are not already loading and there are more pages
      if (hasMore && isFetchEnabled) {
          fetchData();
      }

      return () => {
          ignore = true;
      };
  }, [client, pageIndex, hasMore, isFetchEnabled]);

  const photoColumns = useMemo(() => {
    if (photos.length === 0 || !size.width) return [];
    sessionStorage.setItem(IMAGE_GRID_KEY, JSON.stringify(photos));

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
                    <Link href={`/photo/${photo.id}`} onClick={handleNavigation}>
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
                    </Link>
                  </div>
                )}
              </InView>
            )})}
          </div>
        ))}
       </div>

        <InView
            as="div"
            threshold={0}
            onChange={(inView) => {
                if (inView && hasMore && !isPageLoading) {
                   setPageIndex((prev) => {
                      var newIdx = prev + 1;
                      sessionStorage.setItem(PAGE_KEY, newIdx);
                      return newIdx;
                    });
                   setIsFetchEnabled(true);
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

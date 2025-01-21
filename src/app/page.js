"use client";

import Link from 'next/link';
import Image from 'next/image'
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppWriteContext } from './appwrite_provider';
import Loader from './common/loader';
import AppBar from './common/app_bar';
import { useState, useEffect } from 'react';
import { InView } from "react-intersection-observer";

const COL_SIZE_SCALE = 6;
const SCROLL_POSITION_NAME = 'reatretnet_scrollPosition';

function setShuffledList(setter, list) {
  let shuffled = list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  setter(shuffled);
}

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const size = useWindowSize();
  const client = useAppWriteContext();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isFetching) return;
    // Set scroll position if saved.
    const storedScrollPosition = window.localStorage.getItem(SCROLL_POSITION_NAME);
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition));
    }

    // Save current scroll position.
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);


  useEffect(() => {
    if (isFetching) return;
    // Save scroll position to local storage on state change
    window.localStorage.setItem(SCROLL_POSITION_NAME, scrollPosition);
  }, [scrollPosition, isFetching]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getAllPhotos();
      setPhotos(result.documents);
    };
    fetchData();
  }, [client]);

  useEffect(() => {
    if (photos.length == 0) return;
    const numCols = Math.round(size.width / (COL_SIZE_SCALE * 100));
    const totalHeightRatio = photos.reduce((acc, curr) => acc + curr.height / curr.width, 0);
    const heightPerCol = Math.ceil(totalHeightRatio / numCols);
    const colWidth = Math.round(window.innerWidth / numCols);

    var chunkedPhotos = [];
    let chunkList = [];
    let accHeight = 0;
    photos.forEach((photo) => {
      const currHeight = photo.height / photo.width;
      if (currHeight + accHeight > heightPerCol && chunkedPhotos.length + 1 < numCols) {
        chunkedPhotos.push(chunkList);
        chunkList = [];
        accHeight = 0;
      }
      accHeight += currHeight;
      chunkList.push(photo);
    });
    chunkedPhotos.push(chunkList);

    let photoColumns = chunkedPhotos.map((chunk, cIdx) =>
      <div key={cIdx} className="flex flex-col gap-3">{
          chunk.map((photo, pIdx) =>{
        const adjustedPhotoHeight = Math.round((colWidth / photo.width) * photo.height);
	      return (
        <InView key={pIdx} triggerOnce={true} rootMargin="300px 0px">
          {({ inView, ref, entry }) => (
          <div ref={ref}
               className={`bg-stone-800 rounded-lg w-[${colWidth}px] h-[${adjustedPhotoHeight}px]`}>
            <Link href={`/photo/${photo.id}`}>{
              inView ?
              <Image
                className="w-full h-full rounded-md object-cover
                           hover:outline outline-3 outline-teal-500
                           hover:animate-[pulse_2s_linear_infinite]"
                width={colWidth}
                loading="lazy"
                height={adjustedPhotoHeight}
                quality={40}
                src={photo.thumbnail_url}
                alt={photo.description}/>
             :
              <Image
                  className="w-full h-full rounded-md object-cover
                             hover:outline outline-3 outline-teal-500
                             hover:animate-[pulse_2s_linear_infinite]"
                  width={colWidth}
                  height={adjustedPhotoHeight}
                  src="null"
                  alt={photo.description}/>}
  	        </Link>
  	      </div>)}
        </InView>)
      })}
      </div>);

    setColumns(photoColumns);
    setIsFetching(false);
  }, [size, photos]);


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
        {columns}
       </div>
      </div>
    </main>
  );
}

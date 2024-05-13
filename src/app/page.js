"use client";

import photos from './photos';
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();

  const chunkedPhotos = [];
  const chunkSize = 3;
  for (let i = 0; i < photos.length; i += chunkSize) {
    chunkedPhotos.push(photos.slice(i, i + chunkSize));
  }

  let photoColumns = chunkedPhotos.map((chunk, cIdx) =>
      <div key={cIdx} className="flex flex-col gap-5">{
          chunk.map((photo, pIdx) =>
	      <div key={pIdx}>
                  <img
                    onClick={() => router.push(`/photo/${photo.id}`)}
                    className="w-full h-full rounded-md object-cover
		               hover:outline outline-4 outline-teal-500"
                    src={photo.thumbnailPath}
                    alt={photo.description}
                    width={600}
                    height={400} />
	      </div>)}
      </div>);

  return (
    <main className="max-w-7xl w-[90%] m-auto pt-10">
     <div className="flex flex-col md:flex-row gap-5">
      {photoColumns}
     </div>
    </main>
  );
}

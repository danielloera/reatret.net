"use client";

import photos from './photos';
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();

  let photoElements = photos.map((entry) =>
    <img
      className="hover:outline outline-4 outline-emerald-500
                 rounded-md w-full md:w-1/3"
      onClick={() => router.push(`/photo/${entry.id}`)}
      key={entry.id}
      src={entry.thumbnailPath}
      alt={entry.description}
      width={600}
      height={400} />);

  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center
                     gap-y-4
                     gap-x-2 md:max-2xl:gap-x-8 justify-center p-4">
      {photoElements}
    </main>
  );
}

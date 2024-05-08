import photos from './photos';

export default function Home() {
  let photoElements = photos.map((entry) =>
    <img
      className="hover:invert w-full md:w-1/3"
      key={entry.name}
      src={entry.photoPath}
      alt={entry.description}
      width={600}
      height={400} />);

  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center
                     gap-y-4
                     gap-x-2 sm:max-2xl:gap-x-8 justify-center p-4">
      {photoElements}
    </main>
  );
}

    // app/not-found.js
    import Link from 'next/link';

    export default function NotFound() {
      return (
        <div className="pt-mono-regular text-center pt-[33vh] pb-[45vh]">
          <h2 className="pb-5">Not Found :(</h2>
          <Link href="/" className="text-fuchsia-300">Return Home</Link>
        </div>
      );
    }
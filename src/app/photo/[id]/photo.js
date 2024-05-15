"use client";

import { useAppWriteContext } from '../../appwrite_provider';
import { useState, useEffect } from 'react';
import './styles.css'

export default function Photo(props) {
  const [photo, setPhoto] = useState(null);
  const client = useAppWriteContext();
    useEffect(() => {
    const fetchData = async () => {
      const result = await client.getPhoto(props.id);
      setPhoto(result.documents[0]);
    };
    fetchData();
  }, []);

  if (photo == null) return (<div class="loader"></div>);

  return (
    <main>
    <div className="gradient-bg">
      <img
        className="m-auto w-auto max-h-[80vh]"
        key={photo.id}
        src={photo.photo_full_res_url}
        alt={photo.description}
        width={600}
        height={400} />
    </div>
      <h1
        className="
         text-teal-500
          pt-mono-bold
          pt-4 sm:pt-8 lg:pt-12 ps-4 sm:ps-8 lg:ps-12
          text-xl sm:text-4xl md:text-6xl">
        {photo.title}
      </h1>
      <p
        className="
          text-fuchsia-200
          pt-mono-regular
          p-4 sm:p-8 lg:p-12
          text-base sm:text-xl md:text-3xl">
        {photo.description}
      </p>
    </main>
  );
}

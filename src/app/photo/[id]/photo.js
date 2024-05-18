"use client";

import { useAppWriteContext } from '../../appwrite_provider';
import Loader from '../../common/loader';
import { useState, useEffect } from 'react';
import './styles.css'
import Image from 'next/image'

const DEFAULT_EXIF = "N/A";

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

  if (photo == null) return (<Loader></Loader>);

  const shutterSpeed =
          photo.shutter_speed  == null ?
          DEFAULT_EXIF :
          `1/${Math.round(photo.shutter_speed)}`;
  const focalLength =
          photo.focal_length == null ?
          DEFAULT_EXIF :
          `${photo.focal_length}mm`;
  const exposureTime =
          photo.exposure_time  == null ?
          DEFAULT_EXIF :
          `1/${Math.round(1/photo.exposure_time)}`;
  const fNumber =
          photo.f_number == null ?
          DEFAULT_EXIF :
          `f/${photo.f_number}`;
  const iso = photo.iso ?? DEFAULT_EXIF;
  const cameraMake = photo.camera_make ?? DEFAULT_EXIF;
  const cameraModel = photo.camera_model ?? DEFAULT_EXIF;
  const lensMake = photo.lens_make ?? DEFAULT_EXIF;
  const lensModel = photo.lens_model ?? DEFAULT_EXIF;
  let dateElement = null;
  if (photo.date != null) {
    dateElement = (
      <div className="courier-prime-regular
                      pt-1 lg:pt-2
                      ps-4 sm:ps-8 lg:ps-12
                      text-sm md:text-base lg:text-lg">
        {new Date(photo.date).toLocaleDateString(
          "en-US",
          {year: 'numeric', month: 'short', day: 'numeric' })}
      </div>);
  }

  return (
    <main>
      <div className="gradient-bg">
        <Image
          className="m-auto w-auto max-h-[80vh]"
          key={photo.id}
          src={photo.full_res_url}
          alt={photo.description}
          width={photo.width}
          height={photo.height} />
      </div>
      <h1
        className="
         text-teal-500
          pt-mono-bold
          ps-4 sm:ps-8 lg:ps-12
          pt-4 sm:pt-8
          text-2xl sm:text-3xl lg:text-4xl">
        {photo.title}
      </h1>
      {dateElement}
      <p
        className="
          text-fuchsia-300
          pt-mono-regular
          pl-4 sm:pl-8 lg:pl-12
          pt-2 lg:pt-8
          pb-6 lg:pb-12
          text-base md:text-xl">
        {photo.description}
      </p>
      <table className="
                m-auto md:ms-12
                text-sm md:text-base
                min-w-[95%] md:min-w-fit">
        <tr>
          <th>Shutter Speed</th>
          <td>{shutterSpeed}</td>
        </tr>
        <tr>
          <th>Focal Length</th>
          <td>{focalLength}</td>
        </tr>
        <tr>
          <th>Exposure Time</th>
          <td>{exposureTime}</td>
        </tr>
        <tr>
          <th>F Number</th>
          <td>{fNumber}</td>
        </tr>
        <tr>
          <th>ISO</th>
          <td>{iso}</td>
        </tr>
        <tr>
          <th>Camera Make</th>
          <td>{cameraMake}</td>
        </tr>
        <tr>
          <th>Camera Model</th>
          <td>{cameraModel}</td>
        </tr>
        <tr>
          <th>Lens Make</th>
          <td>{lensMake}</td>
        </tr>
        <tr>
          <th>Lens Model</th>
          <td>{lensModel}</td>
        </tr>
      </table>
    </main>
  );
}

"use client";

import { useAppWriteContext } from '../../appwrite_provider';
import Loader from '../../common/loader';
import AppBar from '../../common/app_bar';
import { useState, useEffect } from 'react';
import './styles.css'
import Image from 'next/image'
import Link from 'next/link';

const DEFAULT_EXIF = "N/A";
const ALLOWED_EXIF_REGEX = /[^0-9a-zA-Z\ -_\.]/g;
const EMPTY_STR = '';

function filterStr(str) {
  return str.replace(ALLOWED_EXIF_REGEX, EMPTY_STR);
}

export default function Photo(props) {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const client = useAppWriteContext();
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getPhoto(props.id);
      setPhoto(result.documents[0]);
    };
    fetchData();
  }, [client, props.id]);

  if (photo == null) return <Loader/>;

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
  const photoAnimation = isLoading ? "animate-[pulse_5s_linear_infinite]" : '';

  return (
    <main>
      <AppBar/>
      <div className={`gradient-bg ${photoAnimation}`}>
        <a href={photo.full_res_url} target="_blank">
        <Image
          className="m-auto w-auto h-fit max-h-[80vh]"
          key={photo.id}
          src={photo.full_res_url}
          alt={photo.description}
          onLoad={() => setIsLoading(false)}
          unoptimized
          width={photo.width}
          height={photo.height} />
        </a>
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
        <tbody>
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
            <td>{filterStr(cameraMake)}</td>
          </tr>
          <tr>
            <th>Camera Model</th>
            <td>{filterStr(cameraModel)}</td>
          </tr>
          <tr>
            <th>Lens Make</th>
            <td>{filterStr(lensMake)}</td>
          </tr>
          <tr>
            <th>Lens Model</th>
            <td>{filterStr(lensModel)}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

"use client";

import { useAppWriteContext } from '../../appwrite_provider';
import { useState, useEffect } from 'react';
import './styles.css'

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

  if (photo == null) return (<div className="loader"></div>);

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

  return (
    <main>
    <div className="gradient-bg">
      <img
        className="m-auto w-auto max-h-[80vh]"
        key={photo.id}
        src={photo.full_res_url}
        alt={photo.description}
        width={600}
        height={400} />
    </div>
      <h1
        className="
         text-teal-500
          pt-mono-bold
          pt-4 sm:pt-8 ps-4 sm:ps-8 lg:ps-12
          text-xl sm:text-4xl md:text-5xl">
        {photo.title}
      </h1>
      <p
        className="
          text-fuchsia-200
          pt-mono-regular
          p-4 sm:p-8 lg:p-12
          text-base sm:text-xl md:text-2xl">
        {photo.description}
      </p>
      <table className="
                rounded-md
                m-auto sm:ms-8 lg:ms-12
                text-base md:text-lg
                max-w-[95%]">
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

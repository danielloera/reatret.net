"use client";

import { useAppWriteContext } from '../../appwrite_provider';
import Loader from '../../common/loader';
import AppBar from '../../common/app_bar';
import { useState, useEffect } from 'react';
import './styles.css'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DEFAULT_EXIF = "N/A";
const ALLOWED_EXIF_REGEX = /[^0-9a-zA-Z\ -_\.]/g;
const EMPTY_STR = '';

function filterStr(str) {
  return str.replace(ALLOWED_EXIF_REGEX, EMPTY_STR);
}

export default function Photo(props) {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const client = useAppWriteContext();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setPhoto(null);
      const result = await client.getPhoto(props.id);
      setPhoto(result.documents[0]);
      setShowLeftArrow(true);
      setShowRightArrow(true);
    };
    fetchData();
  }, [client, props.id]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleNavigate = async (e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const adjacentPhoto = await client.getAdjacentPhoto(photo, direction);
      if (adjacentPhoto) {
        router.push(`/photo/${adjacentPhoto.id}`);
      } else {
        if (direction === 'prev') {
          triggerToast("No newer images found.");
          setShowLeftArrow(false);
        } else {
          triggerToast("No older images found.");
          setShowRightArrow(false);
        }
      }
    } catch (err) {
      console.error("Navigation error:", err);
      triggerToast("Error loading adjacent image.");
    }
  };

  if (photo == null) return <Loader />;

  const shutterSpeed =
    photo.shutter_speed == null ?
      DEFAULT_EXIF : `${photo.shutter_speed}s`;
  const focalLength =
    photo.focal_length == null ?
      DEFAULT_EXIF :
      `${photo.focal_length}mm`;
  const exposureTime =
    photo.exposure_time == null ?
      DEFAULT_EXIF :
      `1/${Math.round(1 / photo.exposure_time)}`;
  const fNumber =
    photo.f_number == null ?
      DEFAULT_EXIF :
      `f/${photo.f_number}`;
  const iso = photo.iso ?? DEFAULT_EXIF;
  const cameraMake = photo.camera_make ?? DEFAULT_EXIF;
  const cameraModel = photo.camera_model ?? DEFAULT_EXIF;
  const lensMake = photo.lens_make ?? DEFAULT_EXIF;
  const lensModel = photo.lens_model ?? DEFAULT_EXIF;
  let photoDate = photo.date;
  if (photoDate == null) {
    photoDate = '404:04:04 404';
  }
  if (photoDate.includes('Z')) {
    photoDate = new Date(photoDate);
  } else {
    photoDate = new Date(photoDate.split(' ')[0].replace(':', '-'));
  }
  let dateElement = null;
  if (photoDate != null) {
    dateElement = (
      <div className="courier-prime-regular
                      pt-1 lg:pt-2
                      ps-4 sm:ps-8 lg:ps-12
                      text-sm md:text-base lg:text-lg">
        {photoDate.toLocaleDateString(
          "en-US",
          { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>);
  }
  const photoAnimation = isLoading ? "animate-[pulse_5s_linear_infinite]" : '';

  return (
    <main className="relative min-h-screen">
      <AppBar />
      <div className={`gradient-bg ${photoAnimation} relative overflow-hidden flex justify-center items-center`}>
        <div className="relative group max-h-[80vh] w-full max-w-full flex justify-center" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
          <a href={photo.full_res_url} target="_blank" className="block max-h-[80vh] w-full">
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

          {showLeftArrow && (
            <button
              onClick={(e) => handleNavigate(e, 'prev')}
              className="nav-arrow left"
              aria-label="Previous image (newer)"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={(e) => handleNavigate(e, 'next')}
              className="nav-arrow right"
              aria-label="Next image (older)"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
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

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border border-teal-500/40 text-teal-400 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-fade-in-up flex items-center gap-2 pt-mono-regular text-sm sm:text-base">
          <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {toastMessage}
        </div>
      )}
    </main>
  );
}

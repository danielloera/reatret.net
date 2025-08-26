 "use client";

 import { useState, useRef, useEffect } from 'react';
 import "../globals.css";
 import Link from 'next/link';

 function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (isOpen) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleClose = () => onClose();
    dialogNode.addEventListener('close', handleClose);
    return () => dialogNode.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="
        border border-stone-800 rounded-md shadow-lg
        p-6
        max-w-md w-full
        bg-stone-800 text-fuchsia-300
      "
    >
      {children}
    </dialog>
  );
 }

 export default function AppBar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="
        pt-mono-regular bg-stone-900/95 h-fit fixed-top
        text-fuchsia-300
        text-xl    ps-4    pt-4    pb-4
        md:text-2xl lg:text-3xl sm:ps-6 sm:pt-4 sm:pb-4
        flex items-center">

        <Link href="/">reatret.net</Link> {props.buttons}

        <span
          className="cursor-pointer ml-auto pr-4 hover:text-white"
          onClick={() => setIsModalOpen(true)}>
          about me
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="pt-mono-regular  flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl md:text-3xl text-white">Hi, I'm Danny</h2>
          <p className="text-center">
            Welcome to my site. I love building things, riding bikes,
            taking photos, and other stuff and things.<br/>
            contact me at: <span className="text-white">danny@reatret.net</span>
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-fuchsia-500/80 text-white rounded-md hover:bg-fuchsia-400"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
 }
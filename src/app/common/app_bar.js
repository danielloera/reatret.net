import "../globals.css";
import Link from 'next/link';

export default function AppBar(props) {
  return (
    <div className="
      pt-mono-regular bg-stone-900/95 h-fit fixed-top
      text-fuchsia-300
      text-xl     ps-4    pt-4    pb-4
      md:text-2xl lg:text-3xl sm:ps-6 sm:pt-4 sm:pb-4">
        <Link href="/">reatret.net</Link> {props.buttons}
    </div>
  );
}

import photos from '../../photos';
import './styles.css'

export function generateStaticParams() {
  return  photos.map((photo) => ({
    id: photo.id.toString(),
  }));
}

export default function Page(props) {
  let photo = photos.find((photo) => photo.id === props.params.id);
  return (
    <main>
    <div className="gradient-bg">
      <img
        className="m-auto w-auto max-h-[80vh]"
        key={photo.id}
        src={photo.fullResPath}
        alt={photo.description}
        width={600}
        height={400} />
    </div>
      <h1 
        className="
         text-emerald-500  
          b612-mono-bold
          pt-4 sm:pt-8 lg:pt-12 ps-4 sm:ps-8 lg:ps-12
          text-xl sm:text-4xl lg:text-6xl">
        {photo.title}
      </h1>
      <p
        className="

          b612-mono-regular
          p-4 sm:p-8 lg:p-12
          text-base sm:text-xl lg:text-2xl">
        {photo.description}
      </p>
    </main>
  );
}

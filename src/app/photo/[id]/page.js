import AppWriteHelper from '../../appwrite_helper';
import Photo from './photo'

export async function generateStaticParams() {
  const client = new AppWriteHelper();
  const result = await client.getAllPhotos();
  return  result.documents.map((photo) => ({
    id: photo.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <main>
      <Photo id={id}/>
    </main>
  );
}

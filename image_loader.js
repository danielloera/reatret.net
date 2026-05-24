export default function loader({
  src,
  width,
  quality,
}) {
  const url = new URL(src.replace('/view?', '/preview?'));
  url.searchParams.set('width', width);
  if (quality) {
    url.searchParams.set('quality', quality);
  }
  return url.toString();
}


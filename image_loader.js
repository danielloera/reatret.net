export default function loader({
  src,
  width,
  quality,
}) {
  return `${src.replace('/view?', '/preview?')}&width=${width}&quality=${quality}`;
}


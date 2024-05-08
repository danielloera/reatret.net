import Image from "next/image";

const  PhotoEntry = class {
  constructor(name, description, photoPath) {
    this.name = name;
    this.description = description;
    this.photoPath = photoPath;
  }
};

const photos = [
  new PhotoEntry(
    'Abandoned House',
    'Abandoned, destroyed house in Laredo, TX.',
    '/abandoned_house.png'),
  new PhotoEntry(
    'Capitol',
    'Sunset over Austin, TX Capitol.',
    '/capitol.jpg'),
  new PhotoEntry(
    'Zilker Park Day',
    'Sunny day in Austin\'s Zilker Park.',
    '/day_skyline.jpg'),
  new PhotoEntry(
    'Austin Night Skyline',
    'Austin Night skyline after a long bike ride from campus.',
    '/night_skyline.jpg'),
  new PhotoEntry(
    'SF Forest',
    'Miday forest in San Francisco\'s botanical garden.',
    '/sf_forest.jpg'),
  new PhotoEntry(
    'Trail of Lights Tree',
    'The Zilker Trail of Lights tree from below.',
    '/zilker_tree.png'),
];

export default photos;
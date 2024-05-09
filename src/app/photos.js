import Image from "next/image";

const  PhotoEntry = class {
  constructor(id, title, description, thumbnailPath, fullResPath) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnailPath = thumbnailPath;
    this.fullResPath = fullResPath;
  }
};

const photos = [
  new PhotoEntry(
    'abandoned_house',
    'Abandoned House',
    'Abandoned, destroyed house in Laredo, TX.',
    '/abandoned_house_sm.png',
    '/abandoned_house_full.png'),
  new PhotoEntry(
    'capitol',
    'Capitol',
    'Sunset over Austin, TX Capitol.',
    '/capitol_sm.jpg',
    '/capitol_full.jpg'),
  new PhotoEntry(
    'day_skyline',
    'Zilker Park Day',
    'Sunny day in Austin\'s Zilker Park.',
    '/day_skyline_sm.jpg',
    '/day_skyline_full.jpg'),
  new PhotoEntry(
    'night_skyline',
    'Austin Night Skyline',
    'Austin Night skyline after a long bike ride from campus.',
    '/night_skyline_sm.jpg',
    '/night_skyline_full.jpg'),
  new PhotoEntry(
    'sf_forest',
    'SF Forest',
    'Miday forest in San Francisco\'s botanical garden.',
    '/sf_forest_sm.jpg',
    '/sf_forest_full.jpg'),
  new PhotoEntry(
    'zilker_tree',
    'Trail of Lights Tree',
    'The Zilker Trail of Lights tree from below.',
    '/zilker_tree_sm.png',
    '/zilker_tree_full.png'),
];

export default photos;
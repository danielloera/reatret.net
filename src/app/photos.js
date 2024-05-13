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
    'Mid-day forest in San Francisco\'s botanical garden.',
    '/sf_forest_sm.jpg',
    '/sf_forest_full.jpg'),
  new PhotoEntry(
    'parrot',
    'Coastal Parrot',
    'Parrot at the Corpus Christi state aquarium.',
    '/parrot_sm.JPG',
    '/parrot_full.JPG'),
  new PhotoEntry(
    'zilker_tree',
    'Trail of Lights Tree',
    'The Zilker Trail of Lights tree from below.',
    '/zilker_tree_sm.png',
    '/zilker_tree_full.png'),
  new PhotoEntry(
    'american_bank',
    'Seaside American Bank',
    'American Bank building in Corpus Christi, TX.',
    '/american_bank_sm.JPG',
    '/american_bank_full.JPG'),
  new PhotoEntry(
    'dunes',
    '"The Dunes"',
    'Seaside park in Portland, TX.',
    '/dunes_sm.JPG',
    '/dunes_full.JPG'),
  new PhotoEntry(
    'distant_pier',
    'Distant Pier.',
    'Distant pier off the shore of Portland, TX.',
    '/distant_pier_sm.JPG',
    '/distant_pier_full.JPG'),
];

export default photos;
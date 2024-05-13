import Image from "next/image";

const  PhotoEntry = class {
  constructor(id, title, description, thumbnailPath, fullResPath, ratio) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnailPath = thumbnailPath;
    this.fullResPath = fullResPath;
    this.ratio = ratio;
  }
};

const photos = [
  new PhotoEntry(
    'abandoned_house',
    'Abandoned House',
    'Abandoned, destroyed house in Laredo, TX.',
    '/abandoned_house_sm.png',
    '/abandoned_house_full.png',
    3/2),
  new PhotoEntry(
    'capitol',
    'Capitol',
    'Sunset over Austin, TX Capitol.',
    '/capitol_sm.jpg',
    '/capitol_full.jpg',
    3/2),
  new PhotoEntry(
    'day_skyline',
    'Zilker Park Day',
    'Sunny day in Austin\'s Zilker Park.',
    '/day_skyline_sm.jpg',
    '/day_skyline_full.jpg',
    3/2),
  new PhotoEntry(
    'night_skyline',
    'Austin Night Skyline',
    'Austin Night skyline after a long bike ride from campus.',
    '/night_skyline_sm.jpg',
    '/night_skyline_full.jpg',
    3/2),
  new PhotoEntry(
    'sf_forest',
    'SF Forest',
    'Mid-day forest in San Francisco\'s botanical garden.',
    '/sf_forest_sm.jpg',
    '/sf_forest_full.jpg',
    3/2),
  new PhotoEntry(
    'parrot',
    'Coastal Parrot',
    'Parrot at the Corpus Christi state aquarium.',
    '/parrot_sm.JPG',
    '/parrot_full.JPG',
    2/3),
  new PhotoEntry(
    'zilker_tree',
    'Trail of Lights Tree',
    'The Zilker Trail of Lights tree from below.',
    '/zilker_tree_sm.png',
    '/zilker_tree_full.png',
    3/2),
  new PhotoEntry(
    'american_bank',
    'Seaside American Bank',
    'American Bank building in Corpus Christi, TX.',
    '/american_bank_sm.JPG',
    '/american_bank_full.JPG',
    2/3),
  new PhotoEntry(
    'dunes',
    '"The Dunes"',
    'Seaside park in Portland, TX.',
    '/dunes_sm.JPG',
    '/dunes_full.JPG',
    3/2),
  new PhotoEntry(
    'distant_pier',
    'Distant Pier.',
    'Distant pier off the shore of Portland, TX.',
    '/distant_pier_sm.JPG',
    '/distant_pier_full.JPG',
    3/2),
];

export default photos;

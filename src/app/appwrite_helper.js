import { Client, Databases, Query } from 'appwrite';

const MAX_LIMIT_QUERY = Query.limit(9999)
const DATE_DESC_QUERY = Query.orderDesc("date")
const PAGE_SIZE = 15

export default class AppWriteHelper {

  constructor() {
    const client = new Client();
    client
      .setEndpoint('https://reatret.net/v1')
      .setProject('6643f12100122b48edf9');
    this.databases = new Databases(client);
    this.photosCache = [];
  }

  #getPhotosHelper = async (queries) =>
    await this.databases.listDocuments('photos', 'metadata', queries);

  getAllPhotos = async () => this.#getPhotosHelper([
                              DATE_DESC_QUERY, MAX_LIMIT_QUERY]);

  getPhotoPage = async (idx) => this.#getPhotosHelper([
                              Query.limit(PAGE_SIZE),
                              Query.offset(PAGE_SIZE * idx),
                              Query.orderDesc("date")
  ]);

  getPhoto = async (id) => this.#getPhotosHelper([Query.equal("id", id)]);

  fetchAdjacentPhotos = async (currentPhoto) => {
    if (!currentPhoto || !currentPhoto.date) return;

    try {
      const newerPromise = this.#getPhotosHelper([
        Query.greaterThan("date", currentPhoto.date),
        Query.orderAsc("date"),
        Query.limit(10)
      ]);

      const olderPromise = this.#getPhotosHelper([
        Query.lessThan("date", currentPhoto.date),
        Query.orderDesc("date"),
        Query.limit(10)
      ]);

      const [newerResult, olderResult] = await Promise.all([newerPromise, olderPromise]);

      const newerDocs = [...newerResult.documents].reverse();
      const olderDocs = olderResult.documents;

      this.photosCache = [
        ...newerDocs,
        currentPhoto,
        ...olderDocs
      ];
    } catch (e) {
      console.error("Error fetching adjacent photos", e);
    }
  };

  #fetchSingleAdjacentPhoto = async (date, direction) => {
    const isPrev = direction === 'prev';
    const query = isPrev ? Query.greaterThan("date", date) : Query.lessThan("date", date);
    const order = isPrev ? Query.orderAsc("date") : Query.orderDesc("date");

    const result = await this.#getPhotosHelper([query, order, Query.limit(1)]);
    return result.documents[0] || null;
  };

  /**
   * Lazily finds and returns the adjacent photo (previous/newer or next/older)
   * relative to the provided currentPhoto using a sliding window cache strategy.
   * 
   * @param {Object} currentPhoto The photo object to navigate from.
   * @param {string} direction The navigation direction ('prev' to go to newer, 'next' to go to older).
   * @returns {Promise<Object|null>} The adjacent photo object, or null if none exists.
   */
  getAdjacentPhoto = async (currentPhoto, direction) => {
    if (!currentPhoto) return null;

    // Try to locate the current photo inside the sliding window cache
    let index = this.photosCache.findIndex(p => p.id === currentPhoto.id);

    // If current photo is not cached, populate the sliding cache around it lazily
    if (index === -1) {
      await this.fetchAdjacentPhotos(currentPhoto);
      index = this.photosCache.findIndex(p => p.id === currentPhoto.id);
    }

    const isPrev = direction === 'prev';

    if (index !== -1) {
      const adjacentIndex = isPrev ? index - 1 : index + 1;

      if (adjacentIndex >= 0 && adjacentIndex < this.photosCache.length) {
        return this.photosCache[adjacentIndex];
      }

      // Boundary reached: Check the database to see if another adjacent photo exists
      const adjacentPhoto = await this.#fetchSingleAdjacentPhoto(currentPhoto.date, direction);
      if (adjacentPhoto) {
        // Slide the window cache to center around the newly navigated photo
        await this.fetchAdjacentPhotos(adjacentPhoto);
        return adjacentPhoto;
      }
      return null;
    }

    // Mismatch fallback: Direct DB fetch if the current photo wasn't found in the cache
    return await this.#fetchSingleAdjacentPhoto(currentPhoto.date, direction);
  };
}

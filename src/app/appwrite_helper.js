import { Client, Databases, Query } from 'appwrite';

const MAX_LIMIT_QUERY = Query.limit(9999)
const DATE_DESC_QUERY = Query.orderDesc("date")
const PAGE_SIZE = 25

export default class AppWriteHelper {

  constructor() {
    const client = new Client();
    client
      .setEndpoint('https://reatret.net/v1')
      .setProject('6643f12100122b48edf9');
    this.databases = new Databases(client);
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
}

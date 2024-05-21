import { Client, Databases, Query } from 'appwrite';

const MAX_LIMIT_QUERY = Query.limit(9999)
const DATE_DESC_QUERY = Query.orderDesc("date")

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

  getPhoto = async (id) => this.#getPhotosHelper([Query.equal("id", id)]);
}

import { Client, Databases, Query } from 'appwrite';

export default class AppWriteHelper {

  constructor() {
    const client = new Client();
    client
        .setEndpoint('http://192.168.50.77:60/v1')
        .setProject('6643f12100122b48edf9');

    this.databases = new Databases(client);
  }

  async getAllPhotos() {
    return await this.databases.listDocuments('photos', 'metadata');
  }

  async getPhoto(id) {
    return await this.databases.listDocuments('photos', 'metadata',
        [Query.equal("id", id)]);
  }
}

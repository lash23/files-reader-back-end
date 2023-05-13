import got from 'got'

import { FILES_API_URL, FILES_API_TOKEN } from '../config/providers.js'

const options = {
  headers: {
    Authorization: `Bearer ${FILES_API_TOKEN}`
  }
}

export class FilesApi {
  static listFiles () {
    return got.get(`${FILES_API_URL}/files`, options)?.json()
  }

  static getFile (filename) {
    return got.get(`${FILES_API_URL}/file/${filename}`, options)
  }
}

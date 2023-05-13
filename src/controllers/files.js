import { FilesApi } from '../providers/filesApi.js'
import { FilesService } from '../services/files.js'

export class FilesController {
  static getFiles = async (_req, res) => {
    const rawData = await FilesApi.listFiles()
    const filesPromise = []

    for (const file of rawData.files) {
      filesPromise.push(FilesApi.getFile(file))
    }

    const values = (await Promise.allSettled(filesPromise))
      .map((v) => {
        if (v.status === 'fulfilled') return v.value.body
        return undefined
      })
      .filter(Boolean)

    const files = FilesService.mapFiles(values)

    res.json(files)
  }

  static listRawFiles = async (_req, res) => {
    const rawData = await FilesApi.listFiles()
    res.json(rawData)
  }
}

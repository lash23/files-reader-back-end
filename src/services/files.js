import { FileItem } from '../models/FileItem.js'

export class FilesService {
  static mapFiles (rawData) {
    const sparseFiles = []

    rawData.forEach((element) => {
      const csvArray = this.getCsvArray(element)

      for (let i = 1; i < csvArray.length; i++) {
        const rows = this.getRows(csvArray[i])

        if (rows.length === 4 && rows.every(Boolean)) {
          const fileItem = this.mapFileItem(rows)

          sparseFiles.push(fileItem)
        }
      }
    })

    const mergedFiles = this.mergeFiles(sparseFiles)
    return mergedFiles
  }

  static getCsvArray (data) {
    return data.split('\n')
  }

  static getRows (data) {
    return data.split(',')
  }

  static mapFileItem (row) {
    const fileItem = new FileItem(row[0], row[1], row[2], row[3])

    return fileItem
  }

  static mergeFiles (sparseFiles) {
    const mergedFiles = []

    sparseFiles.reduce((prev, curr) => {
      if (curr.file === prev?.file) {
        mergedFiles[mergedFiles.length - 1].lines.push(...curr.lines)
      } else {
        mergedFiles.push(curr)
      }
      return curr
    }, {})

    return mergedFiles
  }
}

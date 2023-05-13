export class FileItem {
  constructor (fileName, text, number, hex) {
    this.file = fileName
    this.lines = [
      {
        text,
        number,
        hex
      }
    ]
  }
}

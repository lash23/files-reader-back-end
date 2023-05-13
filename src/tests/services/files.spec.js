import { FileItem } from '../../models/FileItem.js'
import { FilesService } from '../../services/files.js'
import { expect } from 'chai'

const csvMock =
  'file,text,number,hex\n' +
  'test2.csv,PVSSC\n' +
  'test2.csv,zjgvRuiXBywyGiajDuWGtwHCc,5,eacbb83481538e3d385181e6d51aa6ee'

const rawDataMock = [csvMock]

const csvItemMock =
  'test2.csv,zjgvRuiXBywyGiajDuWGtwHCc,5,eacbb83481538e3d385181e6d51aa6ee'

const rowsMock = [
  'test2.csv',
  'zjgvRuiXBywyGiajDuWGtwHCc',
  5,
  'eacbb83481538e3d385181e6d51aa6ee'
]
const mockFileItem = FilesService.mapFileItem(
  rowsMock[0],
  rowsMock[1],
  rowsMock[2],
  rowsMock[3]
)

const mockSparseFiles = [mockFileItem, mockFileItem]

describe('FilesService class', () => {
  describe('getCsvArray()', () => {
    it('should return an array from an string separeted by break lines', () => {
      const testCsvArray = FilesService.getCsvArray(csvMock)
      expect(testCsvArray).to.be.an('array')
    })
  })

  describe('getRows()', () => {
    it('should return an array from an string separeted by comas', () => {
      const testArrayByComas = FilesService.getRows(csvItemMock)
      expect(testArrayByComas).to.be.an('array')
    })
  })

  describe('mapFileItem()', () => {
    it('Shouldd returnn an instance of FileItem class', () => {
      const testFileItem = FilesService.mapFileItem(
        rowsMock[0],
        rowsMock[1],
        rowsMock[2],
        rowsMock[3]
      )

      expect(testFileItem).to.be.instanceOf(FileItem)
    })
  })

  describe('mergeFiles()', () => {
    const testMergedFiles = FilesService.mergeFiles(mockSparseFiles)

    it('Should return an array', () => {
      expect(testMergedFiles).to.be.an('array')
    })

    it('Should return an array where every item is an instance of FileItem', () => {
      const testCondition = testMergedFiles.every((i) => i instanceof FileItem)
      expect(testCondition).to.be.equal(true)
    })

    it('Should return an array which length is equal to de number of diferents file names in the spareFilesArray', () => {
      const randomLength = Math.floor(Math.random() * 10) + 1
      const spareFilesArray = new Array(randomLength)

      for (let i = 0; i < randomLength; i++) {
        const fileName = `file${i}.csv`
        const newitem = new FileItem(
          fileName,
          rowsMock[1],
          rowsMock[2],
          rowsMock[3]
        )
        spareFilesArray[i] = newitem
      }

      const testMergedFiles = FilesService.mergeFiles(spareFilesArray)
      expect(testMergedFiles.length).to.be.equal(randomLength)
    })

    it('Should return an array of FileItems where each item `lines` property contains the sum of lines of items with same name', () => {
      const testMergedFiles = FilesService.mergeFiles(mockSparseFiles)
      const testTotalLines = mockSparseFiles.reduce((prev, curr) => {
        const totalLines = (prev?.lines?.length || 0) + curr.lines.length
        return totalLines
      }, 0)

      expect(testMergedFiles[0].lines.length).to.be.equal(testTotalLines)
    })
  })

  describe('mapFiles()', () => {
    it('should return an array of FileItems', () => {
      const testMappedFiles = FilesService.mapFiles(rawDataMock)
      const testCondition = testMappedFiles.every((i) => i instanceof FileItem)

      expect(testCondition).to.be.equal(true)
    })
  })
})

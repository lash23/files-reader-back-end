import { FilesController } from '../../controllers/files.js'
import { FilesApi } from '../../providers/filesApi.js'
import { FilesService } from '../../services/files.js'
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)
const expect = chai.expect

const rawDataMock = {
  files: ['test5.csv']
}

const gotPromiseMock = {
  status: 'fulfilled',
  value: {
    body: {}
  }
}

describe('FilesController', () => {
  let spyListFiles;
  let spyGetFiles;
  let spyMapFiles;
  beforeEach(() => {
    spyListFiles = chai.spy.on(FilesApi, 'listFiles', () => new Promise(rawDataMock))
    spyGetFiles = chai.spy.on(FilesApi, 'getFile', () => new Promise(gotPromiseMock))
    spyMapFiles = chai.spy.on(FilesService, 'mapFiles', () => {})
  })

  afterEach(function () {
    chai.spy.restore(FilesApi)
    chai.spy.restore(FilesService)
  })

  describe('getFiles()', () => {
    it('should call FilesApi.listFiles()', () => {
      FilesController.getFiles().then(() => {
        expect(spyListFiles).to.have.been.called()
      })
    })

    it('should call FilesApi.getFile()', () => {
      FilesController.getFiles().then(() => {
        expect(spyGetFiles).to.have.been.called()
      })
    })

    it('should call FilesService.mapFiles()', () => {
      FilesController.getFiles().then(() => {
        expect(spyMapFiles).to.have.been.called()
      })
    })
  })

  describe('listRawFiles()', () => {
    it('should call FilesApi.listFiles()', () => {
      FilesController.listRawFiles().then(() => {
        expect(spyListFiles).to.have.been.called()
      })
    })
  })
})

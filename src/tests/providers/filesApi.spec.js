import got from 'got'
import chai from 'chai'
import spies from 'chai-spies'
import { FilesApi } from '../../providers/filesApi.js'

chai.use(spies)
const expect = chai.expect

describe('FilesApi provider', () => {
  let spy
  beforeEach(() => {
    spy = chai.spy.on(got, 'get', () => {})
  })

  afterEach(function () {
    chai.spy.restore(got)
  })

  describe('listFiles()', () => {
    it('should call external API by got`s get method', () => {
      FilesApi.listFiles()

      expect(spy).to.have.been.called()
    })
  })

  describe('getFile()', () => {
    it('should call external API by got`s get method', () => {
      FilesApi.getFile()

      expect(spy).to.have.been.called()
    })
  })
})

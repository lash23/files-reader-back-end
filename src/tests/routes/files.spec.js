import chai from 'chai'
import spies from 'chai-spies'
import express from 'express'
import { router } from '../../routes/files.js'
import { FilesController } from '../../controllers/files.js'
import supertest from 'supertest'

chai.use(spies)
const expect = chai.expect

const app = express()
app.use(router)

const routesMap = new Map()
routesMap.set('getData', {
  path: '/data',
  method: 'get'
})

describe('Files routes', () => {
  let spyGetFiles;
  let spyListFiles;

  beforeEach(function () {
    spyGetFiles = chai.spy.on(FilesController, 'getFiles', () => {})
    spyListFiles = chai.spy.on(FilesController, 'listRawFiles', () => {})
  })

  afterEach(function () {
    chai.spy.restore(FilesController)
  })

  describe('get /data', () => {
    it('should call FilesController.getFiles()', () => {
      const testRoute = routesMap.get('getData')

      supertest(app)
        .get(testRoute.path)
        .end(function (_err, _res) {
          expect(spyGetFiles).to.have.been.called
        })
    })
  })

  describe('get /list', () => {
    it('should call FilesController.listRawFiles()', () => {
      const testRoute = routesMap.get('getData')

      supertest(app)
        .get(testRoute.path)
        .end(function (_err, _res) {
          expect(spyListFiles).to.have.been.called
        })
    })
  })
})

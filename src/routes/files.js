import express from 'express'
import { FilesController } from '../controllers/files.js'

export const router = express.Router()
export const prefix = '/files'

router.get('/data', FilesController.getFiles)

router.get('/list', FilesController.listRawFiles)

import { GeneratePushID } from './generatedPushID'
import path = require('path')
import _ = require('lodash')
import { electron } from 'electron'

const app = electron.app || electron.remote.app

export module util{

  export const getPushID: string = GeneratePushID.pushKey();
  
  
  /**
   * path to the user AppData at this location we will create a folder call knymbusDB where all our 
   * will be stored
   */
  export function getAppPath(dbFileName: string){
    if(!dbFileName){
      throw new Error('No name was given')
    }

    if(!_.isString(dbFileName) || dbFileName.trim().length === 0){
      throw new Error('Invalid name')
    }

     let fileName = path.basename(dbFileName, path.extname(dbFileName)) + '.db'

     let escapeFileName = encodeURIComponent(fileName)

    return path.join(app.getPath('userData'), 'knymbusDB', escapeFileName)
  }
}
import { GeneratePushID } from './generatedPushID'
import path = require('path')
import _ = require('lodash')
const mkdirp = require('mkdirp')
const fs = require('fs')
const electron = require('electron');
const app = electron.app || electron.remote.app

export module util {

  export const getPushID: string = GeneratePushID.pushKey();

  /**
   * path to the data storage 
   */
  const dataStorageLoc = path.join(app.getPath('userData'), 'knymbusDB');

  /**
   * path to the user AppData at this location we will create a folder call knymbusDB where all our 
   * will be stored
   */
  export function getAppPath(dbFileName: string):string {
    if (!dbFileName) {
      return 'No name was given'
      
    }

    if (!_.isString(dbFileName) || dbFileName.trim().length === 0) {
      return 'Invalid name'
      
    }

    let fileName = path.basename(dbFileName, path.extname(dbFileName)) + '.db'

    let escapeFileName = encodeURIComponent(fileName)

    return path.join(dataStorageLoc, escapeFileName)
  }

  /**
   * This module store all its files in the knymbusDB folder under user AppData apps 
   * as such we must ensure that the folder exist at the location if not system will throw anb error
   */
 export function checkStorageLoc(callback: Function) {
    mkdirp(dataStorageLoc,function(err){
      if(err) console.log(err)
      else callback()
    })
  }
}
const electron = require('electron');
const m = require('mochainon');
const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const path = require('path');
//const tmp = require('tmp');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
import { knymbusdb } from '../index';
import { util } from '../lib/util';
const app = electron.app || electron.remote.app;



describe('var db = new knymbusDB.database("filename")', function () {

  this.timeout(20000);

  // Ensure each test case is always ran in a clean state
  let db = new knymbusdb.database('storage')

  describe('db.get()', function () {
    it('should yield an error if no key', function (done) {
      let value = db.get(null)
      m.chai.expect(value).to.be.an.instanceof(Error);
      done()
    });
  })

  describe('db.get("123")', function () {
    it('should return undefined if key does not exist', function (done) {
      let value = db.get('123')
      m.chai.expect(value).to.equal(undefined)
      done()
    })
  })

  describe('db.get("     ")', function () {
    it('blank string returns an error', function (done) {
      let value = db.get('      ')
      m.chai.expect(value).to.be.an.instanceof(Error)
      done()
    })
  })

  describe('util.getAppPath("storage")', function () {
    it('return string path', function (done) {
      let value = util.getAppPath('storage')
      console.log('string: ', value)
      m.chai.expect(value).to.be.a('string')
      done()
    })
  })


  describe('util.getAppPath()', function () {
    it('should return an Error', function (done) {
         m.chai.expect(util.getAppPath(' ')).to.be.an.instanceof(Error)
      done()
    })
  })

})
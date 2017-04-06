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



describe('knymbusDB', function() {

  this.timeout(20000);

  // Ensure each test case is always ran in a clean state
  let db = new knymbusdb.database('storage')
    
  describe('.get()', function() {

    it('should yield an error if no key', function(done) {
      let value = db.get(null) 
        m.chai.expect(value).to.be.an.instanceof(Error);
      done()
    });
  })
})
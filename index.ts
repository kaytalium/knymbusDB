import fs = require('fs')
import _ = require('lodash')
import { util } from './lib/util'


export module knymbusdb {


    /**
     * initialize database by creating a connection to file 
     * if file does not exist one will be created 
     * @example storage = new knymbus.database('storage')
     */
    export class database {

        /**
         * Store the name of the Database that we are using for this instance of the class
         */
        private dbName: string;

        /**
         * Store the database in this object so that we can have access to the various nodes 
         */
        private databaseObj: Object = {};


        /**
         * When the object is created the user must initialize the object with a database name 
         * in order for the object to get the database or create a new on if name not found
         * @param databaseName : String -> name of your database 
         */
        constructor(databaseName: string) {
            if (databaseName) {
                this.createdb(databaseName);
            }

        }

        private createdb(DBName: string) {
            if (!fs.existsSync(util.getAppPath(DBName))) {
                util.checkStorageLoc();
                fs.writeFileSync(util.getAppPath(DBName), '{}')
            }
            try {
                var doc = fs.readFileSync(util.getAppPath(DBName), { encoding: 'utf8' })
                this.databaseObj = JSON.parse(doc)
            } catch (error) {
                return new Error('Invalid Data: ' + doc)
            }

            this.dbName = DBName;
        }


        /**
         * The function aloow the user to set thier own key and value pair to the database
         * note that this does not append to key is exist but override given key values
         * @param key 
         * @param value 
         * @param callbak 
         */
        set(key: string, value: any) {

            //ensure that the key entered is a string and not null 
            if (_.isString(key) || typeof key != null) {
                _.set(this.databaseObj, key, value)
                this.save()
            }

        }

        public push(key: string, value: any) {

            if (_.isString(key) && typeof key !== null) {
                let node: string = key + '.' + _.clone(util.getPushID);
                this.set(node, value)
            }

        }

        /**
         * Remove a node with all is value from the file
         * @param key 
         */
        public remove(key: string) {
            if (_.isString(key) && typeof key !== null) {
                let unset = _.unset(this.databaseObj, key)
                if (unset) {
                    this.save()
                }

            }
        }



        public get(key: string) {
            if (_.isString(key) && typeof key !== null) {
                return _.get(this.databaseObj, key)
            }

        }

        /**
         * This function will set the key and value from the given params
         * @param key name of the child node
         * @param value Data to pass to that child
         *
         * * @example storage.update('myKeyName.year',1973)
         * before  
         * file {
         *     myKeyName:{
         *         name: "cars",
         *         year: 1975,
         *         location: "29th & 5th Avenue"
         *         }
         *     }
         * After
         * file {
         *     myKeyName:{
         *         name: "cars",
         *         year: 1973,
         *         location: "29th & 5th Avenue"
         *         }
         *     }
         */
        public update(key: string, value: any) {
            if (_.isString(key) && typeof key !== null) {
                if (_.has(this.databaseObj, key)) {
                    this.set(key, value)
                    return true
                } else {
                    return false
                }
            }

        }



        /**
         * 
         */
        private query(query: string, callback) {

        }

        /**
         * Save the database to the file 
         */
        private save(): void {
            fs.writeFileSync(util.getAppPath(this.dbName), JSON.stringify(this.databaseObj))
        }




    }

}//end of module
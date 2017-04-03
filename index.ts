import fs = require('fs')
import _ = require('lodash')

export module knymbusdb {


    /**
     * initialize database by creating a connection to file 
     * if file does not exist one will be created 
     */
    export class database {

        public dbName: string;
        private databaseObj: Object = {};
        private childfn: any = {
            call: false,
            name: ''

        }


        constructor(databaseName: string) {
            if (_.isString(databaseName) && databaseName.trim().length > 0) {
                this.dbName = databaseName + '.db'
                this.createdb();
            }
            
        }

        private createdb() {
            if (!fs.existsSync(this.dbName)) {
                fs.writeFileSync(this.dbName, '{}')
            }
            var doc = fs.readFileSync(this.dbName, { encoding: 'utf8' })
            try {
                this.databaseObj = JSON.parse(doc)
            } catch (error) {
                return new Error('Invalid Data: ' + doc)
            }

            
        }

        set(childNode: string) {
            //ensure that the value entered is a string and not null
            if (_.isString(childNode) || typeof childNode != null) {

                //check if child is chained to child and set child bind
                if (this.childfn.call) {
                    this.childfn.name = this.childfn.name + '.' + childNode;
                } else {
                    this.childfn.call = true
                    this.childfn.name = childNode
                }
                //console.log('child: ', this.childfn.name)

                if (_.has(this.databaseObj, this.childfn.name)) {
                    // console.log('node found: ', _.get(this.databaseObj, this.childfn.name))
                } else {
                    //console.log("node was not found: ", this.databaseObj)
                }


            }
            return this
        }

        public push(obj: Object) {

            let node: string;
            let _id = _.clone(generateID());
            if (this.childfn.call) {
                node = this.childfn.name + '.' + _id.toString()
                //console.log('node name: ', node)
                //console.log(_.has(this.databaseObj,node))
                _.set(this.databaseObj, node, obj)

            } else {
                _.set(this.databaseObj, _id, obj)
            }
            fs.writeFileSync(this.dbName, JSON.stringify(this.databaseObj))
        }

        public remove() {

        }

        public get() {
            console.log('child at ref: ',this.childfn.name)
            return _.get(this.databaseObj, this.childfn.name)
        }

        /**
         * This function will set the key and value from the given params
         * @param nodeName name of the child node
         * @param data Date to pass to that child
         * 
         * @example storage.set('myKeyName',{name:"cars", year:1975,location:"29th & 5th Avenue"})+
         * @result {
         *     myKeyName:{
         *         name: "cars",
         *         year: 1975,
         *         location: "29th & 5th Avenue"
         *         }
         *     }
         */
        public update(nodeName: string, data: Object) {
            if(_.isString(nodeName) && typeof nodeName !== null){

            }

        }

        /**
         * 
         */
        query(query:string,callback){
            
        }




    }

    /**
     * generate key for object when .push() is used
     */
    function generateID() {
        return "_kvp" + _.random(10, 100)
    }


}//end of module
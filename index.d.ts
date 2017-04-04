export declare module knymbusdb {
    /**
     * initialize database by creating a connection to file
     * if file does not exist one will be created
     * @example storage = new knymbus.database('storage')
     */
    class database {
        /**
         * Store the name of the Database that we are using for this instance of the class
         */
        private dbName;
        /**
         * Store the database in this object so that we can have access to the various nodes
         */
        private databaseObj;
        /**
         * When the object is created the user must initialize the object with a database name
         * in order for the object to get the database or create a new on if name not found
         * @param databaseName : String -> name of your database
         */
        constructor(databaseName: string);
        private createdb(DBName);
        /**
         * The function aloow the user to set thier own key and value pair to the database
         * note that this does not append to key is exist but override given key values
         * @param key
         * @param value
         * @param callbak
         */
        set(key: string, value: any): void;
        push(key: string, value: any): void;
        /**
         * Remove a node with all is value from the file
         * @param key
         */
        remove(key: string): void;
        get(key: string): {};
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
        update(key: string, value: any): boolean;
        /**
         *
         */
        private query(query, callback);
        /**
         * Save the database to the file
         */
        private save();
    }
}

import { knymbusdb } from './index'
/**
 * get the database we want to use from module
 * this opens a connection to the database that allow for 
 * queries the document
 */
let storage = new knymbusdb.database('storage')

var people = {
    a:{name:"John",age:23},
    b:{name:"Kevin",age:16},
    c:{name:"Susan",age:20},
    d:{name:"Mary",age:15},
}

storage.set('persons',people)

let persons = storage.get('persons')
console.log('Persons: ',people)

let John = storage.get('persons.a.age')
console.log('John: ',John)

let up = storage.update('persons.a.age',35)
console.log("Update: ",up)

let rm = storage.remove('persons.d')
console.log("remove D: ",rm)

storage.push('active',"1375")



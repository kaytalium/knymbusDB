import { knymbusdb } from './index'
/**
 * get the database we want to use from module
 * this opens a connection to the database that allow for 
 * queries the document
 */
let storage = new knymbusdb.database('storage')

var arr = [
    {name:"John",age:23},
    {name:"Kevin",age:16},
    {name:"Susan",age:20},
    {name:"Mary",age:15},
]

/**
 * 
 */
//let list = storage.child('list').child('cars').push({name:"Ford"})
let arr1:Array<Object> = [
    {darkTheme:"solar Eclipse"}
]
let list = storage.child('category').child('_kvp62').child('_kvp90').push({item:'_kvp79-says-hello'})
let myList  = storage.child('category').child('_kvp62')
console.log('this is from  test ',myList.ref())
//list.push({activetab:"quickView"})
//list.child('747.8735122726968').remove()
//storage.push(arr)




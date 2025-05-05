import Datastore from "nedb";

const usersDb=new Datastore({filename:"./db/users.db",autoload:true});

console.log("usersDB initialized:",usersDb); //check if the database is initialized

export default usersDb;
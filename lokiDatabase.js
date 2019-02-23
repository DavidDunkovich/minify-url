const loki = require('lokijs');
const validUrl = require('valid-url');
module.exports = {
    initializeDatabase: () => {
        let db = new loki('urls.db');
        var entries = db.getCollection('entries');
        if (entries === null) {
            entries = db.addCollection('entries' , { 
                unique: ['long']
            });
        }
        return entries;
    },
    insertUrl: (entries, url) => {
        if(validUrl.isUri(url)){
            try{ 
                entries.insert({ long: url })
            }
            catch (e){
                //Throws error if a url already exists
                console.log(e)
            }
        }
    }
  };


// export const getUrls = () => {
//     let db = this.initializeDatabase()
//     return db.data;
//   }
const loki = require("lokijs");
const validUrl = require("valid-url");
const Hashids = require("hashids");
const myUrl = "https://minify-url-dd.herokuapp.com/";

module.exports = {
  initializeDatabase: () => {
    let db = new loki("urls.db");
    var entries = db.getCollection("entries");
    if (entries === null) {
      entries = db.addCollection("entries", {
        unique: ["longUrl"]
      });
    }
    return entries;
  },
  insertUrl: (entries, longUrl) => {
    if (validUrl.isUri(longUrl)) {
      try {
        let urlEntry = entries.insert({ longUrl, accessedOn: new Date() });
        let hashids = new Hashids(
          "",
          0,
          "abcdefghijklmnopqrstuvwxyz0123456789"
        );
        urlEntry.hash = hashids.encode(urlEntry.$loki);
        return { shortUrl: myUrl + urlEntry.hash };
      } catch (e) {
        //Duplicate, no need to store anything, just retreive it
        const duplicateEntry = entries.findOne({ longUrl });
        return { shortUrl: myUrl + duplicateEntry.hash };
      }
    } else {
      return {
        error: "Oops, not a valid URL. Make sure it has http:// or https://"
      };
    }
  },
  findLongUrl: (entries, windowLocation) => {
    const urlHash = windowLocation.split(myUrl)[1];
    const existingEntry = entries.findOne({ hash: urlHash });
    if (existingEntry) {
      existingEntry.accessedOn = new Date();
      return existingEntry.longUrl;
    } else {
      return false;
    }
  },
  purgeOldRecords: entries => {
    let twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const oldEntries = entries.find({ accessedOn: { $lt: twoWeeksAgo } });
    if (oldEntries.length !== 0) {
      entries.remove(oldEntries);
    }
  }
};

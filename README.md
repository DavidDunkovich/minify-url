## Written By David Dunkovich

1. Initlize create-react-app with semantic-ui
2. Develop front-end with random url generator (Research safe url characters)
3. Create node express server with loki (in-memory database)
4. Create loki queries to add and retrieve url entries
5. Implement shortening algorithm 

   Insert into database if long url is unique
   
   Use auto incrementing ID of recently added entry with hashids. 
   
   Hashids takes an integer and produces a very short hash. I used the auto
   incrementing field to be the input integer
   
   Store the hash which will be used as the link
   
   If the long url is not unique to the database, then do not insert but just
   take the hash stored with that long url.
   
6. On front end page load, if the window location contains a short url, look up
the hash in the url and retrieve/redirect to long url associatied with that hash
7. Otherwise load app as normal

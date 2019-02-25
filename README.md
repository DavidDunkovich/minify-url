# Remitly Project Assignment
## By David Dunkovich

1. Initlize create-react-app with semantic-ui
2. Develop front-end with random url generator (Research safe url characters)
3. Create node express server with loki (in-memory database)
4. Create loki queries to add and retrieve url entries
5. Implement shortening algorithm
⋅⋅⋅Insert into database if long url is unique
⋅⋅⋅Use auto incrementing ID of recently added long url with hashids
⋅⋅⋅Store the hash which will be used as the link
6. On front end page load, if the window location contains a short url, look up
the hash in the url and retrieve/redirect to long url
7. Otherwise load app as normal

Osan 4 tehtävät

PS C:\Users\syyspe\Documents\fullstack\blogs> date

sunnuntai 10. kesäkuuta 2018 18.34.17


PS C:\Users\syyspe\Documents\fullstack\blogs> npm run test

> blogs@0.0.1 test C:\Users\syyspe\Documents\fullstack\blogs
> cross-env NODE_ENV=test jest --verbose

 PASS  tests/list_helper.test.js (5.124s)
  smoke
    √ dummy is called (15ms)
  total_likes
    √ total_likes with empty list returns 0
    √ total_likes with just one blog returns likes of that blog
    √ total likes with a bunch of blogs
  favouriteBlog
    √ favouriteBlog with empty list returns undefined
    √ favouriteBlog with just one blog returns that blog
    √ favouriteBlog with many blogs returns correct number of likes
  mostBlogs
    √ mostBlogs with empty list returns undefined
    √ mostBlogs with just one blog returns that author and 1
    √ mostBlogs with many blogs returns correct author and blog count
  mostLikes
    √ mostLikes with empty list returns undefined
    √ mostLikes with just one blog returns that author and likes
    √ mostLikes with many blogs returns correct author and likes


 RUNS  tests/api.test.js

Test Suites: 1 passed, 1 of 2 total
 RUNS  tests/api.test.js

 PASS  tests/api.test.js (32.64s)al
  0. login
    √ user ok (140ms)
  blog tests 1. basics
    √ api returns blogs as json (125ms)
    √ all blogs are returned (174ms)
    √ a specific blog is amongst returned blogs (93ms)
  blog tests 2. adding blogs
    √ adding a blog (343ms)
    √ adding a blog with undefined likes sets likes to zero (498ms)
    √ adding a blog without title responds 400 (250ms)
    √ adding a blog without url responds 400 (245ms)
  blog tests 3. deleting blogs
    √ deleting a blog (651ms)
  blog tests 4. modifying blogs
    √ updating likes of one random blog (453ms)
  user tests 1. basics
    √ all users are returned (93ms)
    √ user is created (469ms)
    √ existing username is rejected (233ms)
  user tests 2. invalid or missing data
    √ undefined username (172ms)
    √ undefined password (235ms)
    √ too short password (244ms)
    √ undefined adultness (616ms)

Test Suites: 2 passed, 2 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        65.016s
Ran all test suites.
PS C:\Users\syyspe\Documents\fullstack\blogs>
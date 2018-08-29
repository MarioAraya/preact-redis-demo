// import fetch = require('node-fetch')

// function fetchCatAvatars(userId) {
//   return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
//     .then(response => response.json())
//     .then(user => {
//       const promises = user.cats.map(catId => 
//         fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
//           .then(response => response.json())
//           .then(catData => catData.imageUrl))
//       return Promise.all(promises)
//     })
// }

// fetchCatAvatars(123)
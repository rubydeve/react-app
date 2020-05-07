
let user = localStorage.getItem("user")
console.log(user)
export const config = { apiUrl: 'http://localhost:3001/api/v1' , cableUrl: `ws://localhost:3001/cable?token=${JSON.parse(user)['id']}`}

  

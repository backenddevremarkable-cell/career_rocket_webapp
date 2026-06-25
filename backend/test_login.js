const axios = require('axios');
axios.post('http://localhost:3001/api/studentlogin', {mobileNo: '9521005427'})
  .then(r => console.log(r.data))
  .catch(e => console.log(e.response ? e.response.data : e.message));

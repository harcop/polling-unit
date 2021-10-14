const axios = require('axios');
const FormData = require('form-data');
const https = require('https');

const url = 'https://www.inecnigeria.org/wp-content/themes/independent-national-electoral-commission/custom/views/lgaView.php';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })

const stateCode = '28'
const formData = new FormData()
formData.append('state_id', stateCode)
let config = {
    method: 'post',
    url: url,
    headers: { 
      ...formData.getHeaders()
    },
    data : formData
};
axios.post(url, formData, { httpsAgent,     
    headers: { 
    ...formData.getHeaders()
  }})
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.log(error)
})

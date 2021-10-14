const { states } = require('./allStatesName');
const axios = require('axios');
const fs = require('fs')
const FormData = require('form-data');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

async function getAllUnit() {
    const urlState = 'https://www.inecnigeria.org/wp-content/themes/independent-national-electoral-commission/custom/views/lgaView.php';
    for(const state of states) {
        console.log(state, 'here')
        const allData = [];
        const { stateCode, stateName } = state;

        const formData = new FormData()
        formData.append('state_id', stateCode)

        const lgs = await axios.post(urlState, formData, {         
            httpsAgent,     
            headers: { 
            ...formData.getHeaders()
          }})
          let { data: data1 } = lgs

        for(const lg in data1) {
            console.log(lg, 'here---------')
            const { id: lgId, name: lgName } = data1[lg]
            const urlLg = 'https://www.inecnigeria.org/wp-content/themes/independent-national-electoral-commission/custom/views/wardView.php';

            const formDataWard = new FormData()
            formDataWard.append('lga_id', lgId);
            formDataWard.append('state_id', stateCode)


            const wards = await axios.post(urlLg, formDataWard, {         
                httpsAgent,     
                headers: { 
                ...formDataWard.getHeaders()
            }})

            let { data: data2 } = wards

            for(const ward in data2) {
                console.log(ward, 'here 3 !!!!!!!')
                const urlWard = 'https://www.inecnigeria.org/wp-content/themes/independent-national-electoral-commission/custom/views/pollingView.php';
                const { id: wardId, name: wardName } = data2[ward]

                const formDataUnit = new FormData()
                formDataUnit.append('lga_id', lgId);
                formDataUnit.append('state_id', stateCode);
                formDataUnit.append('ward_id', wardId)

                const units = await axios.post(urlWard,   formDataUnit, {         
                    httpsAgent,     
                    headers: { 
                    ...formDataUnit.getHeaders()
                }})
                const { data: data3 } = units

                for(const unit in data3) {
                    if(unit) {
                        console.log('===',unit, 'here unit')
                        const { name: unitName, units: unitId, remark } = data3[unit]
                        const poll = {
                            STATE: stateName,
                            LG: lgName,
                            WARD: wardName,
                            POLLING_UNIT_ID: unitId,
                            POLLING_UNIT_NAME: unitName,
                            REMARK: remark
                        }
                        console.log(poll)
                        allData.push(poll)
                    }
                }
            }
        }
    fs.writeFileSync(`./unitData/${stateName}`, JSON.stringify(allData))
    }
    return 'done'
}

getAllUnit()
.then(response => {
    console.log(response)
})
.catch(error => {
    console.log(error)
})
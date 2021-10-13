const fs = require('fs');

const allStates = `
<option value="1">ABIA</option>
<option value="2">ADAMAWA</option>
<option value="3">AKWA IBOM</option>
<option value="4">ANAMBRA</option>
<option value="5">BAUCHI</option>
<option value="6">BAYELSA</option>
<option value="7">BENUE</option>
<option value="8">BORNO</option>
<option value="9">CROSS RIVER</option>
<option value="10">DELTA</option>
<option value="11">EBONYI</option>
<option value="12">EDO</option>
<option value="13">EKITI</option>
<option value="14">ENUGU</option>
<option value="37">FEDERAL CAPITAL TERRITORY</option>
<option value="15">GOMBE</option>
<option value="16">IMO</option>
<option value="17">JIGAWA</option>
<option value="18">KADUNA</option>
<option value="19">KANO</option>
<option value="20">KATSINA</option>
<option value="21">KEBBI</option>
<option value="22">KOGI</option>
<option value="23">KWARA</option>
<option value="24">LAGOS</option>
<option value="25">NASARAWA</option>
<option value="26">NIGER</option>
<option value="27">OGUN</option>
<option value="28">ONDO</option>
<option value="29">OSUN</option>
<option value="30">OYO</option>
<option value="31">PLATEAU</option>
<option value="32">RIVERS</option>
<option value="33">SOKOTO</option>
<option value="34">TARABA</option>
<option value="35">YOBE</option>
<option value="36">ZAMFARA</option>
`
function splitState() {
  const states = allStates.split('\n').join('').split('</option>')
  const allStateCode = []
  for(const state of states) {
    if(state === '') {
      continue
    }
    const stateSplit = state.split('<option value=')[1].split('>');
    const [stateCode, stateName] = stateSplit
    allStateCode.push({
      stateCode: Number(stateCode.split('"')[1]),
      stateName
    })
  }
  return allStateCode
}
const state = splitState();
fs.writeFileSync('./allStates', JSON.stringify(state))

export class Snippets {
  static onlyTelefoneNumbers(str) {
    return str.replace(/\(/g,"").replace(/\)/g,"").replace(/-/g,"").replace(/ /g,"").substring(0,11);
  }
  static buildPhoneMask(str) {
    const ddd              = str.substring(0,2);
    const mobile           = str.length === 11 ? str.substring(2,3) : ""
    const phoneNumberPart1 = mobile ? str.substring(3,7) : str.substring(2,6);
    const phoneNumberPart2 = str.length > 6 ? mobile ? str.substring(7,11) : str.substring(6,11) : "";
    // (00) 0 0000-0000
    return ``
      +`${ddd ? "(" :""}`
      +`${ddd}`
      +`${ddd.length >=2 ? ")" : ""}`
      +`${mobile ? " " : ""}`
      +`${mobile}`
      +`${phoneNumberPart1 ? " ": ""}`
      +`${phoneNumberPart1}`
      +`${phoneNumberPart2 ? "-":""}`
      +`${phoneNumberPart2}`
  }
  static cropName(value) {
    if(value.length > 23) return value.substring(0,23)+'...'
    return value
  }
}

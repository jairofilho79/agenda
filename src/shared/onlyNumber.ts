export class Snippets {
  static onlyTelefoneNumbers(str) {
    return str.replace(/\(/g,"").replace(/\)/g,"").replace(/-/g,"").replace(/ /g,"");
  }
}

export function convertToCamelCase(obj) {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = key.replace(/(\_[a-z])/g, match => match[1].toUpperCase());
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
      if (typeof obj[key] === 'object') {
        newObj[newKey] = convertToCamelCase(obj[key]);
      } else {
        newObj[newKey] = obj[key];
      }
    }
  }
  return newObj;
}

export function prefixObjectValues(object, prefix) {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = prefix + object[key];
    return result;
  }, {});
}

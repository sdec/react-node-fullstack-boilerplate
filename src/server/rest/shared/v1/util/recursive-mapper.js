const _ = require('lodash');

function recursiveMap(mapFn, object) {
  if (_.isArray(object)) {
    const result = [];
    _.forEach(object, (part) => {
      result.push(recursiveMap(mapFn, part));
    });
    return result;
  }

  return mapFn(object);
}

export default {
  map: (mapFn, object) => {
    if (!object) {
      return object;
    }
    return recursiveMap(mapFn, object);
  }
};

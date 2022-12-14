const buildParams = (prefix, obj, add) => {
  const rbracket = /\[\]$/;

  if (Array.isArray(obj)) {
    // Serialize array item.
    obj.forEach((v, i) => {
      if (rbracket.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v);
      } else {
        buildParams(`${prefix}[${(typeof v === 'object' ? i : '')}]`, v, add);
      }
    });
  } else if (obj && obj.toString() === '[object Object]') {
    // if it is an empty object, then send this param without any value to remove the answer
    if (Object.keys(obj).length === 0) {
      add(prefix, '');
    } else {
      // Serialize object item.
      Object.keys(obj).forEach(name => buildParams(`${prefix}[${name}]`, obj[name], add));
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
};

export const toQueryString = o => {
  const s = [];
  // enc = encodeURIComponent,
  const add = (key, value) => {
    let addValue;
    // If value is a function, invoke it and return its value
    if (typeof value === 'function') {
      addValue = value();
    } else if (value == null) {
      addValue = '';
    } else {
      addValue = value;
    }
    s[s.length] = `${encodeURIComponent(key)}=${encodeURIComponent(addValue)}`;
  };
  // If an array was passed in, assume that it is an array of form elements.
  if (Array.isArray(o)) {
    o.forEach(arrItem => {
      add(arrItem.name, arrItem.value);
    });
  } else {
    Object.keys(o).forEach(prefix => buildParams(prefix, o[prefix], add));
  }

  // spaces should be + according to spec
  return s.join('&').replace(/%20/g, '+');
};

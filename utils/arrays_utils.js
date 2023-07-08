export const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  const neww = (object) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  array1 = new Set(array1.map(neww));
  return array2.every((object) => array1.has(neww(object)));
};

export const filterArray = (array, property) => {
  return array
    .filter((item) => item.name == property)
    .map((s) => {
      return s.value;
    });
};

export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

export const randomize = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    console.log(args)
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const throttle = (func, delay=1000) => {
  let timerId;
  let lastExecTime = 0;

  return (...args) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastExecTime > delay) {
      func.apply(null, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(null, args);
        lastExecTime = new Date().getTime();
      }, delay);
    }
  };
};
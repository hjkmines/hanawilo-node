const axios = require('axios');

const isAnagram = (str1, str2) => {
    return formatStr(str1) === formatStr(str2);
}
  
// Helper function
const formatStr = (str) => {
    return str
        .replace(/[^\w]/g, '')
        .toLowerCase()
        .split('')
        .sort()
        .join('');
}

const chunkArray = (arr, len) => {
    // Init chunked arr
    const chunkedArr = [];
  
    // Loop through arr
    arr.forEach(val => {
      // Get last element
      const last = chunkedArr[chunkedArr.length - 1];
  
      // Check if last and if last length is equal to the chunk len
      if (!last || last.length === len) {
        chunkedArr.push([val]);
      } else {
        last.push(val);
      }
    });
  
    return chunkedArr;
  };

const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: x => x,
  createUser: () => {
    const user = { firstName: 'Brad' };
    user['lastName'] = 'Traversy';
    return user;
  },
  fetchUser: () =>
    axios
      .get('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.data)
      .catch(err => 'error')
};


const reverseString = (str) => {
return str
      .toLowerCase()
      .split('')
      .reverse()
      .join('');
}

module.exports = {
    isAnagram, 
    chunkArray, 
    functions, 
    reverseString
}
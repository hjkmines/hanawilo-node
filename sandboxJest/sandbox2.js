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
    const user = { firstName: 'Tony' };
    user['lastName'] = 'Kim';
    return user;
  },
  fetchUser: () =>
    axios
      .get('https://jsonplaceholder.typicode.com/users/2')
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

// Below is for the assignment 
const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for(let j = i + 1; i < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

const fetchProfile = async () => {
  try {
    const { results } = await axios.get('https://randomuser.me/api/')
  } catch (err) {
    throw new Error('Error fetching for profile')
  }

  return results;
}

const removeNumberFromArray = (arr, numberToRemove) => {
  if (!arr.length) {
    throw new Error('Missing array');
  } else if (arr.includes(numberToRemove)) {
    const index = arr.indexOf(numberToRemove); 
    return arr.splice(index, 1);
  } else {
    throw new Error(`Array does not include number ${numberToRemove}`)
  }
}

const addNewProperty = (obj, property, value) => {
  if (!property && !value) {
    throw new Error('Missing both property and value');
  } else {
    return obj[property] = value; 
  }
}

const sortArray = (arr) => {
  if (!arr) {
    throw new Error('Missing array'); 
  } else {
    return arr.sort()
  }
}

const upperCaseWords = (words) => {
  if (!arr) {
    throw new Error('Missing array'); 
  } else {
    return words.map(word => word.toUpperCase());
  }
}

module.exports = {
    isAnagram, 
    chunkArray, 
    functions, 
    reverseString, 
    twoSum, 
    fetchProfile, 
    removeNumberFromArray, 
    addNewProperty, 
    sortArray, 
    upperCaseWords
}


import _ from 'lodash-es';

let arrayBlock = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'k', 'l'];

let result = _.chunk(arrayBlock, 2);

console.log(result);
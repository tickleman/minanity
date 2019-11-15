"use strict";

/**
 * Launch it with :
 * node --use_strict minanity
 */

let Position = require('./World/Position');
let Minan = require('./Thing/Animal/Minan');

let test = new Minan(new Position(0, 0, 0));
console.log(test.toString());

console.log('Hello, world !');

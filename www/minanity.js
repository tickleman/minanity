import Minan    from '../Thing/Animal/Minan.js';
import Paper    from './Paper.js';
import Position from '../World/Position.js';
import Tree     from '../Thing/Plant/Tree.js';

let paper = new Paper;
paper.things.push(new Minan(new Position(0, 0, 0)));
paper.things.push(new Tree(new Position(100, 0, 0)));
paper.load();
console.log(paper);

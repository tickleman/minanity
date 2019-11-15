import Minan    from '../Thing/Animal/Minan.js';
import Position from '../World/Position.js';
import Tree     from '../Thing/Plant/Tree.js';
import paper    from './paper.js';

paper.things.push(new Minan(new Position(0, 0, 0)));
paper.things.push(new Tree(new Position(100, 0, 0)));

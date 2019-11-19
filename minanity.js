import Paper    from './Front/Paper.js';
import Position from './World/Position.js';

import Activity from './Activity/Activity.js';
import Nothing  from './Activity/Nothing.js';

import Creature from './Thing/Creature/Creature.js';

import Minan    from './Thing/Creature/Minan.js';

import Food     from './Thing/Plant/Food.js';
import Rock     from './Thing/Plant/Rock.js';
import Tree     from './Thing/Plant/Tree.js';
import Giant_Mushroom from "./Thing/Plant/Giant_Mushroom.js";
import Mushrooms from "./Thing/Plant/Mushrooms.js";

let paper = new Paper(
	document.getElementsByTagName('canvas')[0],
	document.getElementsByTagName('img')
);

paper.load();
paper.things.push(new Mushrooms(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
paper.things.push(new Food(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
paper.things.push(new Rock(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
for (let n = 0; n < 100; n ++) {
	paper.things.push(new Minan(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
}
paper.things.push(new Giant_Mushroom(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
paper.things.push(new Tree(new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)).start());
paper.calculateFps();

setInterval(() => {
	for (let creature of paper.things) if (creature instanceof Creature) {
		creature.decide();
	}
}, 1000);

window.paper = paper;
window.Activity = Activity;
window.Creature = Creature;
window.Nothing  = Nothing;

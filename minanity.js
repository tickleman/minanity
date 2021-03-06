import Activity       from './Activity/Activity.js';
import Creature       from './Thing/Creature/Creature.js';
import Food           from './Thing/Plant/Food.js';
import Giant_Mushroom from './Thing/Plant/Giant_Mushroom.js';
import Minan          from './Thing/Creature/Minan.js';
import Nothing        from './Activity/Nothing.js';
import Paper          from './Front/Paper.js';
import Position       from './World/Position.js';
import Rock           from './Thing/Plant/Rock.js';
import Tree           from './Thing/Plant/Tree.js';
import Mushrooms      from './Thing/Plant/Mushrooms.js';
import Player         from './Thing/Creature/Player.js';
import World          from './World/World.js';

let paper = new Paper(
	document.getElementsByTagName('canvas')[0],
	document.getElementsByTagName('img')
);
let player = new Player(new Position(0, 0));

paper.load();
paper.things.push(player);
paper.things.push(new Mushrooms(new Position(Math.random() * 2000 - 1000, Math.random() * 1000 - 500)).start());
paper.things.push(new Food(new Position(Math.random() * 2000 - 1000, Math.random() * 1000 - 500)).start());
paper.things.push(new Rock(new Position(Math.random() * 2000 - 1000, Math.random() * 1000 - 500)).start());
paper.things.push(new Giant_Mushroom(new Position(Math.random() * 2000 - 1000, Math.random() * 1000 - 500)).start());
paper.things.push(new Tree(new Position(Math.random() * 2000 - 1000, Math.random() * 1000 - 500)).start());
for (let n = 0; n < 200; n ++) {
	let minan = new Minan(new Position(0, 0));
	do {
		minan.position.x = Math.random() * 2500 - 1250;
		minan.position.y = Math.random() * 1400 - 700;
	} while (
		World.somethingAt(minan.position.x, minan.position.y, minan.size.width, minan.size.height, minan.id)
	);
	paper.things.push(minan.start());
}
paper.calculateFps();
paper.interact(player);

setInterval(() => {
	for (let creature of paper.things) if (creature instanceof Creature) {
		creature.decide();
	}
}, 1000);

window.paper    = paper;
window.Activity = Activity;
window.Creature = Creature;
window.Nothing  = Nothing;

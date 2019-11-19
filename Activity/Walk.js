
import Activity from './Activity.js';
import World    from '../World/World.js';

class Walk extends Activity
{

	//----------------------------------------------------------------------------------------------------------- bypass
	/**
	 * @type array [dx, dy, min_distance]
	 */
	bypass;

	//--------------------------------------------------------------------------------------------------------- creature
	/**
	 * @type Creature
	 */
	creature;

	/**
	 * @type number
	 */
	dx;

	/**
	 * @type number
	 */
	dy;

	//--------------------------------------------------------------------------------------------------------------- to
	/**
	 * @type Position
	 */
	to;

	//-------------------------------------------------------------------------------------------------------- calculate
	calculate()
	{
		let position = this.creature.position;
		let width  = (this.to.x - position.x);
		let height = (this.to.y - position.y);
		let angle  = Math.atan(Math.abs(height / width));
		this.dx    = Math.sign(width)  * (Walk.DISTANCE * Math.cos(angle));
		this.dy    = Math.sign(height) * (Walk.DISTANCE * Math.sin(angle));
	}

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param creature Creature
	 * @param to       Position
	 */
	constructor(creature, to)
	{
		super(creature);
		this.creature     = creature;
		this.to           = to;

		creature.boredom -= 10;

		this.calculate();

		walks[creature.id] = this;
		if (!interval) {
			interval = setInterval(doWalk, 1000 / 48);
		}
	}

	//---------------------------------------------------------------------------------------------------------- destroy
	destroy(creature)
	{
		delete walks[creature.id];
		if (interval && !Object.keys(creature).length) {
			clearInterval(interval);
			interval = undefined;
		}
	}

}

Walk.DISTANCE = 2;

//----------------------------------------------------------------------------------------------------------- creatures
/**
 * @type Walk[]|object
 */
let walks = {};

//------------------------------------------------------------------------------------------------------------ interval
/**
 * @type number
 */
let interval = undefined;

//-------------------------------------------------------------------------------------------------------------- doWalk
function doWalk()
{
	let next_x, next_y, position, size, to;
	for (let walk of Object.values(walks)) {
		position = walk.creature.position;
		size     = walk.creature.size;
		to       = walk.to;

		if (
			(Math.abs(to.x - position.x) < Walk.DISTANCE)
			&& (Math.abs(to.y - position.y) < Walk.DISTANCE)
		) {
			position.x = to.x;
			position.y = to.y;
			walk.creature.do(new Nothing(walk.creature));
			continue;
		}

		// bypass move
		if (walk.bypass) {
			next_x = position.x + walk.bypass[0];
			next_y = position.y + walk.bypass[1];
			walk.bypass[2] -= Walk.DISTANCE;
			if (walk.bypass[2] < 0) {
				walk.bypass = undefined;
				walk.calculate();
			}
		}
		// straight forward move
		else {
			next_x = position.x + walk.dx;
			next_y = position.y + walk.dy;
		}
		// look forward
		if (World.somethingAt(next_x, next_y, size.width, size.height, walk.creature.id)) {
			// there is something : will choose another way but will not move at this turn
			if (!walk.bypass) {
				// look left
				next_x = position.x + walk.dy;
				next_y = position.y - walk.dx;
				if (World.somethingAt(next_x, next_y, size.width, size.height, walk.creature.id)) {
					// look right
					next_x = position.x - walk.dy;
					next_y = position.y + walk.dx;
					if (World.somethingAt(next_x, next_y, size.width, size.height, walk.creature.id)) {
						continue;
					}
					walk.bypass = [-walk.dy, walk.dx];
				}
				else {
					walk.bypass = [walk.dy, -walk.dx];
				}
				walk.bypass[2] = Math.sqrt(size.width * size.width + size.height * size.height);
			}
			continue;
		}
		// walk
		position.x = next_x;
		position.y = next_y;
	}
}

export default Walk;

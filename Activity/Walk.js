
import Activity from './Activity.js';

class Walk extends Activity
{

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

		let position = creature.position;
		let width  = (to.x - position.x);
		let height = (to.y - position.y);
		let angle  = Math.atan(Math.abs(height / width));
		this.dx    = Math.sign(width)  * (Walk.DISTANCE * Math.cos(angle));
		this.dy    = Math.sign(height) * (Walk.DISTANCE * Math.sin(angle));

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
	for (let walk of Object.values(walks)) {
		let position = walk.creature.position;
		let to       = walk.to;

		if (
			(Math.abs(to.x - position.x) < Walk.DISTANCE)
			&& (Math.abs(to.y - position.y) < Walk.DISTANCE)
		) {
			position.x = to.x;
			position.y = to.y;
			walk.creature.do(new Nothing(walk.creature));
			continue;
		}

		position.x += walk.dx;
		position.y += walk.dy;
	}
}

export default Walk;

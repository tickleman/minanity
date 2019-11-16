
import Activity  from './Activity.js';

class Nothing extends Activity
{

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param creature Creature
	 */
	constructor(creature)
	{
		super(creature);
		creatures[creature.id] = creature;
		if (!interval) {
			interval = setInterval(doNothing, 1000);
		}
	}

	//---------------------------------------------------------------------------------------------------------- destroy
	destroy(creature)
	{
		delete creatures[creature.id];
		if (interval && !Object.keys(creature).length) {
			clearInterval(interval);
			interval = undefined;
		}
	}

}

//----------------------------------------------------------------------------------------------------------- creatures
/**
 * @type Creature[]|object
 */
let creatures = {};

//------------------------------------------------------------------------------------------------------------ interval
/**
 * @type number
 */
let interval = undefined;

//----------------------------------------------------------------------------------------------------------- doNothing
function doNothing()
{
	for (let creature of Object.values(creatures)) if (creature.boredom < 100) creature.boredom ++;
}

export default Nothing;

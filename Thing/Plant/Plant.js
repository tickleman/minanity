
import Thing from '../Thing.js'
import World from '../../World/World.js'

/**
 * Plant
 */
class Plant extends Thing
{

	//------------------------------------------------------------------------------------------------------- constructor
	/**
	 * @param position Position
	 */
	constructor(position)
	{
		super(position)
		World.obstacles[this.id] = this
	}

}

export default Plant

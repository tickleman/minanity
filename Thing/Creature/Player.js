
import Minan from './Minan.js'

/**
 * Minan controlled by a player
 */
class Player extends Minan
{
	//------------------------------------------------------------------------------------------------------- constructor
	/**
	 * @param position Position
	 */
	constructor(position)
	{
		super(position)
		this.do(undefined)
	}

}

export default Player

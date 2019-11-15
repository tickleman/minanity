
/**
 * Thing
 *
 * @property position Position
 */
class Thing
{

	/**
	 * @param position Position
	 */
	constructor(position)
	{
		this.position = position;
	}

	/**
	 * @returns string
	 */
	toString()
	{
		return `${this.constructor.name}: ${this.position.toString()}`;
	}

}

module.exports = Thing;

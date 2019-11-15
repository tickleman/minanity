
/**
 * Dimensions are in decimeters
 * With the precision of node's 53 bits integers : -900000000000000 to 900000000000000 (14-15)
 * With the precision of MySQL's 32 bits INT for x and y : -2147483648 to 2147483647 (9-10)
 * > x and y go from -210000km to 210000km
 * With the precision of MySQL's 16 bits SMALLINT for z : -32768 to 32768 (4-5)
 * > Z go from -3200km to 3200km
 *
 * @property x integer
 * @property y integer
 * @property z integer
 */
class Position
{

	/**
	 * @param x integer
	 * @param y integer
	 * @param z integer
	 */
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * @returns string
	 */
	toString()
	{
		return `(${this.x}, ${this.y}, ${this.z})`;
	}

}

module.exports = Position;

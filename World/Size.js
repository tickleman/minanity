
/**
 * Sizes are in decimeters
 * With the precision of node's 53 bits integers : -900000000000000 to 900000000000000 (14-15)
 * With the precision of MySQL's 32 bits INT for x and y : -2147483648 to 2147483647 (9-10)
 * > x and y go from -210000km to 210000km
 * With the precision of MySQL's 16 bits SMALLINT for z : -32768 to 32768 (4-5)
 * > Z go from -3200km to 3200km
 *
 * @property depth  integer
 * @property height integer
 * @property width  integer
 */
class Size
{

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param width  integer
	 * @param height integer
	 * @param depth  integer
	 */
	constructor(width, height, depth = 0)
	{
		this.depth  = depth;
		this.height = height;
		this.width  = width;
	}

	//--------------------------------------------------------------------------------------------------------- toString
	/**
	 * @returns string
	 */
	toString()
	{
		return `(${this.width}, ${this.height}, ${this.depth})`;
	}

}

export default Size;

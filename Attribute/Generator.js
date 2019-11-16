
class Generator
{

	/**
	 * @type string
	 */
	attribute;

	/**
	 * @type number
	 */
	count;

	/**
	 * @type number milliseconds
	 */
	delay;

	/**
	 * @type number Generator.INFINITE for infinite
	 */
	repeat;

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param attribute string
	 * @param count     number
	 * @param repeat    number
	 * @param delay     number milliseconds
	 */
	constructor(attribute, count = 1, repeat = 1, delay = 1000)
	{
		this.attribute = attribute;
		this.count     = count;
		this.delay     = delay;
		this.repeat    = repeat;
	}

}

Generator.INFINITE = -1;

export default Generator;

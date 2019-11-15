
import Position from '../World/Position.js';

/**
 * Thing
 */
class Thing
{

	/**
	 * @type Position
	 */
	position;

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param position Position
	 */
	constructor(position)
	{
		this.position = position;
	}

	//------------------------------------------------------------------------------------------------------------- draw
	/**
	 * @param paper Paper
	 */
	draw(paper)
	{
		let pen      = paper.pen;
		let position = this.position;
		let world    = paper.world;
		let x = position.x - world.x - 8;
		let y = position.y - world.y - 8;

		pen.strokeStyle = 'black';
		pen.strokeRect(x, y, 16, 16);
	}

	//--------------------------------------------------------------------------------------------------------- toString
	/**
	 * @return string
	 */
	toString()
	{
		return `${this.constructor.name}: ${this.position.toString()}`;
	}

}

export default Thing;

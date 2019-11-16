
import Position from '../World/Position.js';
import Size     from '../World/Size.js';

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
		let position = paper.shift(this.position, this.size);
		let size     = this.size;

		let pen = paper.pen;
		pen.strokeStyle = 'black';
		pen.strokeRect(position.x, position.y, size.width, size.height);
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

/**
 * @type Size
 */
Thing.prototype.size = new Size(16, 16, 16);

export default Thing;

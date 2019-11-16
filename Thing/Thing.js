
import Position from '../World/Position.js';
import Size     from '../World/Size.js';

let next_id = 0;

/**
 * Thing
 */
class Thing
{

	/**
	 * @type number
	 */
	id;

	/**
	 * @type Position
	 */
	position;

	/**
	 * type Size
	 */
	size;

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param position Position
	 */
	constructor(position)
	{
		this.id       = next_id++;
		this.position = position;
		this.size     = Thing.prototype.size;
	}

	//------------------------------------------------------------------------------------------------------------- draw
	/**
	 * @param paper Paper
	 */
	draw(paper)
	{
		let position = paper.shift(this.position, this.size);
		let size     = this.size;

		if (paper.images.hasOwnProperty(this.constructor.name)) {
			paper.pen.drawImage(paper.images[this.constructor.name], position.x, position.y);
		}
		else {
			let pen = paper.pen;
			pen.strokeStyle = 'black';
			pen.strokeRect(position.x, position.y, size.width, size.height);
		}
	}

	//------------------------------------------------------------------------------------------------------------ start
	/**
	 * @returns Thing
	 */
	start()
	{
		return this;
	}

	//--------------------------------------------------------------------------------------------------------- toString
	/**
	 * @returns string
	 */
	toString()
	{
		return `${this.constructor.name} ${this.id}`;
	}

}

/**
 * @type Size
 */
Thing.prototype.size = new Size(16, 16, 16);

export default Thing;

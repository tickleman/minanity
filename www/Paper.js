
import Position from '../World/Position.js';
import Thing    from '../Thing/Thing.js';

class Paper
{

	/**
	 * @type HTMLCanvasElement
	 */
	canvas = document.getElementsByTagName('canvas')[0];

	/**
	 * @type number
	 */
	height = 0;

	/**
	 * @type CanvasRenderingContext2D
	 */
	pen = this.canvas.getContext('2d');

	position = new class {
		center = new Position(0, 0, 0);
		top    = new Position(0, 0, 0);
	};

	/**
	 * @type Thing[]
	 */
	things = [];

	/**
	 * @type number
	 */
	width = 0;

	//------------------------------------------------------------------------------------------------------------- draw
	draw()
	{
		for (let thing of this.things) {
			thing.draw(this);
		}
		requestAnimationFrame(() => { paper.draw(); });
	}

	//------------------------------------------------------------------------------------------------------------- load
	load()
	{
		let paper = this;
		document.addEventListener('DOMContentLoaded', () => {
			paper.resize();
			addEventListener('resize', () => { paper.resize(); });
		});
	}

	//----------------------------------------------------------------------------------------------------------- resize
	resize()
	{
		this.height = window.innerHeight;
		this.width  = window.innerWidth;
		this.bottom = this.height - 1;
		this.right  = this.width  - 1;

		this.canvas.height = this.height;
		this.canvas.style  = 'height: ' + this.height + 'px; width: ' + this.width + 'px;';
		this.canvas.width  = this.width;

		this.position.top.x = (Math.round(this.position.center.x - this.width)  / 2);
		this.position.top.y = (Math.round(this.position.center.y - this.height) / 2);

		this.draw();
	}

	//------------------------------------------------------------------------------------------------------------ shift
	/**
	 * Calculate the position of the top-left corner of anything that has a position and size on the paper
	 *
	 * @param position Position
	 * @param size     Size
	 * @return Position
	 */
	shift(position, size)
	{
		let paper_top = this.position.top;
		return new Position(
			position.x - paper_top.x - (size.width  / 2),
			position.y - paper_top.y - (size.height / 2),
			position.z - paper_top.z - (size.depth  / 2)
		);
	}

	//------------------------------------------------------------------------------------------------------------- text
	/**
	 * This is the same than pen.text, but y is the position of the top-left corner of the text
	 *
	 * @param text string
	 * @param x    number
	 * @param y    number
 	 */
	text(text, x, y)
	{
		this.pen.fillText(text, x, y + this.textBaseLinePosition());
	}

	//--------------------------------------------------------------------------------------------- textBaseLinePosition
	/**
	 * @return number
	 */
	textBaseLinePosition()
	{
		return parseInt(this.pen.font) / 1.4;
	}

	//------------------------------------------------------------------------------------------------------- textHeight
	/**
	 * @return number
	 */
	textHeight()
	{
		return parseInt(this.pen.font) / 1.1;
	}

	//-------------------------------------------------------------------------------------------------------- textWidth
	/**
	 * @param text string
	 * @return number
	 */
	textWidth(text)
	{
		return this.pen.measureText(text).width;
	}

}

export default Paper;


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

	/**
	 * @type Thing[]
	 */
	things = [];

	/**
	 * @type number
	 */
	width = 0;

	/**
	 * @type Position
	 */
	world = new Position(0, 0, 0);

	//------------------------------------------------------------------------------------------------------------- draw
	draw()
	{
		for (let thing of this.things) {
			thing.draw(this);
		}
		requestAnimationFrame(() => { paper.draw(); });
	}

	//----------------------------------------------------------------------------------------------------------- resize
	resize()
	{
		this.world.x -= Math.round((window.innerWidth  - this.width)  / 2);
		this.world.y -= Math.round((window.innerHeight - this.height) / 2);

		this.height = window.innerHeight;
		this.width  = window.innerWidth;
		this.bottom = this.height - 1;
		this.right  = this.width  - 1;

		this.canvas.height = this.height;
		this.canvas.style  = 'height: ' + this.height + 'px; width: ' + this.width + 'px;';
		this.canvas.width  = this.width;

		this.draw();
	}

	//------------------------------------------------------------------------------------------------------------- text
	/**
	 * this is the same than pen.text, but y is the position of the top-left corner of the text
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

//---------------------------------------------------------------------------------------------------------------- init
let paper = new Paper();
document.addEventListener('DOMContentLoaded', () => {
	paper.resize();
	addEventListener('resize', () => { paper.resize(); });
});

export default paper;

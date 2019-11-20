
import Position from '../World/Position.js';
import Thing    from '../Thing/Thing.js';

class Paper
{

	/**
	 * @type number
	 */
	animation_request;

	/**
	 * @type HTMLCanvasElement
	 */
	canvas;

	/**
	 * @type boolean
	 */
	debug = false;

	/**
	 * @type Image[]|object
	 */
	images = {};

	/**
	 * @type number
	 */
	fps;

	/**
	 * @type number
	 */
	frames = 0;

	/**
	 * @type number
	 */
	height = 0;

	/**
	 * @type CanvasRenderingContext2D
	 */
	pen;

	position = new class {
		center = new Position(0, 0);
		top    = new Position(0, 0);
	};

	/**
	 * @type Thing[]
	 */
	things = [];

	/**
	 * @type number
	 */
	width = 0;

	//----------------------------------------------------------------------------------------------------- calculateFps
	/**
	 * @param standalone boolean
	 */
	calculateFps(standalone = true)
	{
		let paper = this;
		if (standalone !== false) {
			setTimeout(function() { paper.calculateFps(); }, 1000);
		}
		this.fps    = this.frames;
		this.frames = 0;
	}

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param canvas HTMLCanvasElement
	 * @param images Image[]
	 */
	constructor(canvas, images)
	{
		this.canvas = canvas;
		this.pen    = canvas.getContext('2d');
		for (let image of images) {
			this.images[image.id] = image;
		}
	}

	//------------------------------------------------------------------------------------------------------------- draw
	draw()
	{
		this.frames ++;
		this.pen.clearRect(0, 0, this.width - 1, this.height - 1);
		for (let thing of this.things) {
			thing.draw(this);
		}
		let paper = this;
		if (this.animation_request === undefined) {
			this.animation_request = requestAnimationFrame(() => {
				paper.animation_request = undefined;
				paper.draw();
			});
		}
	}

	//------------------------------------------------------------------------------------------------------- displayFps
	displayFps()
	{
		this.calculateFps(false);
		console.log(this.fps, 'fps');
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
	 * @returns Position
	 */
	shift(position, size)
	{
		let paper_top = this.position.top;
		return size
			? new Position(
				Math.round(position.x - paper_top.x - (size.width  / 2)) + .5,
				Math.round(position.y - paper_top.y - (size.height / 2)) + .5,
				Math.round(position.z - paper_top.z - (size.depth  / 2)) + .5
			)
			: new Position(
				Math.round(position.x - paper_top.x) + .5,
				Math.round(position.y - paper_top.y) + .5,
				Math.round(position.z - paper_top.z) + .5
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
	 * @returns number
	 */
	textBaseLinePosition()
	{
		return parseInt(this.pen.font) / 1.4;
	}

	//------------------------------------------------------------------------------------------------------- textHeight
	/**
	 * @returns number
	 */
	textHeight()
	{
		return parseInt(this.pen.font) / 1.1;
	}

	//-------------------------------------------------------------------------------------------------------- textWidth
	/**
	 * @param text string
	 * @returns number
	 */
	textWidth(text)
	{
		return this.pen.measureText(text).width;
	}

}

export default Paper;

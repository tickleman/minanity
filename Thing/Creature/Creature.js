
import Nothing  from '../../Activity/Nothing.js';
import Thing    from '../Thing.js';
import Position from '../../World/Position.js';
import Walk     from '../../Activity/Walk.js';

/**
 * Creature
 */
class Creature extends Thing
{

	/**
	 * @type number
	 */
	boredom = 50;

	/**
	 * @type Activity
	 */
	activity;

	//------------------------------------------------------------------------------------------------------ constructor
	/**
	 * @param position Position
	 */
	constructor(position)
	{
		super(position);
		this.do(new Nothing(this));
	}

	//----------------------------------------------------------------------------------------------------------- decide
	decide()
	{
		if (this.boredom < 51) {
			return;
		}
		this.do(new Walk(this, new Position(Math.random() * 1000 - 500, Math.random() * 800 - 400)));
	}

	//--------------------------------------------------------------------------------------------------------------- do
	/**
	 * @param activity Activity
	 */
	do(activity)
	{
		if (this.activity) {
			this.activity.destroy(this);
		}
		this.activity = activity;
	}

	/**
	 * @param paper Paper
	 */
	draw(paper)
	{
		super.draw(paper);

		// draw destination and path for debugging purpose
		if (paper.debug && (this.activity instanceof Walk)) {
			let pen  = paper.pen;
			let from = paper.shift(this.position);
			let to   = paper.shift(this.activity.to);
			pen.beginPath();
			pen.strokeStyle = '#aaa';
			pen.moveTo(from.x, from.y);
			pen.lineTo(to.x, to.y);
			pen.moveTo(to.x - 2, to.y - 2);
			pen.lineTo(to.x + 2, to.y + 2);
			pen.moveTo(to.x + 2, to.y - 2);
			pen.lineTo(to.x - 2, to.y + 2);
			pen.stroke();
			pen.closePath();
		}
	}

	//------------------------------------------------------------------------------------------------------------ start
	/**
	 * @returns Creature
	 */
	start()
	{
		this.decide();
		return this;
	}

}

export default Creature;

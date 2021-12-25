
class World
{

}

//-------------------------------------------------------------------------------------------------------------- moving
/**
 * @type Creature[]|object
 */
World.moving = {}

//----------------------------------------------------------------------------------------------------------- obstacles
/**
 * @type Plant[]|object
 */
World.obstacles = {}

//--------------------------------------------------------------------------------------------------------- somethingAt
/**
 * Not optimized version of a simple box-box collision detection
 * Will be rapidly very slow after more than 100 moving objects
 *
 * @param x       number
 * @param y       number
 * @param width   number
 * @param height  number
 * @param exclude integer
 * @return Thing|null
 */
World.somethingAt = function(x, y, width = 1, height = 1, exclude = -1)
{
	let position
	let size
	let thing
	let things = Object.values(World.moving)
	for (let i = 0; i < 2; i ++) {
		for (thing of things) {
			if (thing.id === exclude) continue
			position = thing.position
			size     = thing.size
			if (
				(position.x < (x + width)) && (x < (position.x + size.width))
				&& (position.y < (y + height)) && (y < (position.y + size.height))
			) {
				return thing
			}
		}
		things = Object.values(World.obstacles)
	}
	return null
}

export default World

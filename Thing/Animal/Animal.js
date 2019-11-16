
import Activity from '../../Activity/Activity.js';
import Nothing  from '../../Activity/Nothing.js';
import Thing    from '../Thing.js';

/**
 * Animal
 */
class Animal extends Thing
{

	//----------------------------------------------------------------------------------------------------------- decide
	decide()
	{

	}

}

/**
 * @type Activity
 */
Animal.prototype.doing = new Nothing;

export default Animal;

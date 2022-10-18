
import Canvas from './Canvas.js';
import Code from './Code.js';

class IDE extends Canvas
{

	code;

	constructor()
	{
		super();
		this.code = new Code(this.pen);
	}

	draw()
	{
		this.code.draw();
		let dy = 15;
		this.pen.font = dy.toString() + "px Consolas, Monaco, 'Andale mono', 'Ubuntu Mono', monospace";
		let dx = this.pen.measureText('A').width;
		let line_spacing = 3;
		console.log(dx);
		this.pen.lineWidth = 1;
		this.pen.strokeStyle = '#ddd';
		for (let x = 0, y = dy; y < 2000; x += dx, y += dy + line_spacing) {
			this.pen.beginPath();
			this.pen.moveTo(0, y);
			this.pen.lineTo(2000, y);
			this.pen.moveTo(x, 0);
			this.pen.lineTo(x, 2000);
			this.pen.stroke();
			this.pen.fillText("ctx.strokeText('Hello world', 50, 100); dfjhfdsdfhj pojdfsho jdfshj dsjfh dosfjh sdfjh podjfh odsjfh podjhps odjsdfpohj posdjfhpjfdposdhjhdfj podsjfh sfjdpos hjph", x, y);
		}
	}

}

export default IDE;

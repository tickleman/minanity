
class Canvas
{

	bottom;
	canvas = document.getElementsByTagName('canvas')[0];
	height;
	pen;
	right;
	width;

	constructor()
	{
		let canvas = this;
		this.pen = this.canvas.getContext('2d');
		document.addEventListener('DOMContentLoaded', () => {
			canvas.resize();
			addEventListener('resize', () => { canvas.resize(); });
		});
	}

	draw()
	{
	}

	resize()
	{
		this.height = window.innerHeight;
		this.width  = window.innerWidth;
		this.bottom = this.height - 1;
		this.right  = this.width  - 1;

		this.canvas.height = this.height;
		this.canvas.style  = 'height: ' + this.height + 'px; width: ' + this.width + 'px;';
		this.canvas.width  = this.width;

		this.draw();
	}

}

export default Canvas;

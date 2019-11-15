
class Paper
{
	canvas = document.getElementsByTagName('canvas')[0];
	pen    = this.canvas.getContext('2d');

	resize()
	{
		this.height = window.innerHeight;
		this.width  = window.innerWidth;
		this.bottom = this.height - 1;
		this.right  = this.width  - 1;

		this.canvas.height = this.height;
		this.canvas.style  = 'height: ' + this.height + 'px; width: ' + this.width + 'px;';
		this.canvas.width  = this.width;

		return this;
	}

	// this is the same than pen.text, but y is the position of the top-left corner of the text
	text(text, x, y)
	{
		this.pen.fillText(text, x, y + this.textBaseLinePosition());
	}

	textBaseLinePosition()
	{
		return parseInt(this.pen.font) / 1.4;
	}

	textHeight()
	{
		return parseInt(this.pen.font) / 1.1;
	}

	textWidth(text)
	{
		return this.pen.measureText(text).width;
	}

}

let paper = new Paper();
document.addEventListener('DOMContentLoaded', () => {
	paper.resize();
	addEventListener('resize', () => { paper.resize(); });
});

export default paper;


// number of 10K 100x100 images drawing per second (using my RTX2080S)
// launched several times, results are very near for both browsers, but sometimes firefox has a very fast rush

// firefox full image = 24.4/s sometimes 83.2/s
// firefox crop image = 25/s sometimes 85/s
// firefox full copy = 32.4/s sometimes 82.2/s
// firefox crop copy = 32.2/s sometimes 79.8/s

// chrome full image = 25/s
// chrome crop image = 26.2/s
// chrome full copy = 31.4/s
// chrome crop copy = 32.4/s

class Paper
{
	canvas = document.getElementsByTagName('canvas')[0];
	count  = 0;
	image  = 0;
	images = [new Image(), new Image()];
	pen    = this.canvas.getContext('2d');
	x      = 0;

	canvas2 = document.getElementsByTagName('canvas')[1];
	canvas3 = document.getElementsByTagName('canvas')[2];

	constructor()
	{
		let count = 0;
		let paper = this;

		this.images[0].addEventListener('load', () => { if (++count === 2) paper.start(); });
		this.images[1].addEventListener('load', () => { if (++count === 2) paper.start(); });
		this.images[0].src = 'crop.jpg';
		this.images[1].src = 'test.jpg';

		this.canvas2.height = 100;
		this.canvas2.width  = 100;
		this.canvas3.height = 450;
		this.canvas3.width  = 450;
	}

	draw()
	{
		let pen = this.pen;

		pen.drawImage(this.images[1], 100, 175, 100, 100, 0, 0, 100, 100);

		/*
		pen.moveTo(0, 0);
		pen.lineTo(this.right, this.bottom);
		pen.stroke();

		let text = 'Hello world papa';

		pen.font = '10px Arial';
		this.text(text, 10, 10);
		pen.font = '15px Arial';
		this.text(text, 10, 30);
		pen.font = '20px Arial';
		this.text(text, 10, 60);
		pen.font = '30px Arial';
		this.text(text, 10, 100);
		pen.font = '40px Arial';
		this.text(text, 10, 150);
		pen.font = '50px Arial';
		this.text(text, 10, 210);

		this.text(text, 200, 0);

		this.text(text, (this.width - this.textWidth(text)) / 2, (this.height - this.textHeight()) / 2);

		pen.fillStyle = 'red';
		pen.lineWidth = 1;
		pen.rect(20.5, 20.5, 100, 50);
		pen.rect(30.5, 30.5, 100, 50);
		pen.rect(40.5, 40.5, 100, 50);
		pen.stroke();
		*/

		return this;
	}

	draw0()
	{
		if (this.image !== 0) return;

		let paper = this;
		for (let i = 0; i < 10000; i ++) paper.pen.drawImage(paper.images[0], paper.x, 0);
		requestAnimationFrame(() => { paper.draw0(); });
		this.count ++;
		this.x ++; if (this.x > 500) this.x = 0;
	}

	draw1()
	{
		if (this.image !== 1) return;

		let paper = this;
		for (let i = 0; i < 10000; i ++) paper.pen.drawImage(paper.images[1], 100, 175, 100, 100, paper.x, 0, 100, 100);
		requestAnimationFrame(() => { paper.draw1(); });
		this.count ++;
		this.x ++; if (this.x > 500) this.x = 0;
	}

	draw2()
	{
		if (this.image !== 2) return;

		let paper = this;
		for (let i = 0; i < 10000; i ++) paper.pen.drawImage(this.canvas2, paper.x, 0);
		requestAnimationFrame(() => { paper.draw2(); });
		this.count ++;
		this.x ++; if (this.x > 500) this.x = 0;
	}

	draw3()
	{
		if (this.image !== 3) return;

		let paper = this;
		for (let i = 0; i < 10000; i ++) paper.pen.drawImage(this.canvas3, 100, 175, 100, 100, paper.x, 0, 100, 100);
		requestAnimationFrame(() => { paper.draw3(); });
		this.count ++;
		this.x ++; if (this.x > 500) this.x = 0;
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

		return this;
	}

	start()
	{
		this.canvas2.getContext('2d').drawImage(this.images[0], 0, 0);
		this.canvas3.getContext('2d').drawImage(this.images[1], 0, 0);
		this.resize();

		let paper = this;
		setTimeout(() => {
			// image 0 : from full image to canvas
			setTimeout(() => {
				console.log(this.image, ':', paper.count / 5);
				// image 1 : from a part of an image to canvas
				paper.count = 0;
				this.image = 1;
				setTimeout(() => {
					console.log(this.image, ':', paper.count / 5);
					// image 2 : from a full canvas to canvas
					paper.count = 0;
					this.image = 2;
					setTimeout(() => {
						console.log(this.image, ':', paper.count / 5);
						// image 3 : from a part of a canvas to canvas
						paper.count = 0;
						this.image = 3;
						setTimeout(() => {
							console.log(this.image, ':', paper.count / 5);
							paper.count = 0;
							this.image = 4;
						}, 5000);
						paper.draw3();
					}, 5000);
					paper.draw2();
				}, 5000);
				paper.draw1();
			}, 5000);
			paper.draw0();
		}, 2000);
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

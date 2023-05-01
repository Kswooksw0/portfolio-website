class Pointer {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.angle = createVector(x, y).heading();
	}
	show() {
		push();
		const w = map(pointer_radius, 200, 280, 15, 20);
		const h = w * 1.5;
		let x1 = -w / 2;
		let y1 = h / 2;
		let x2 = 0;
		let y2 = -h / 2;
		let x3 = w / 2;
		let y3 = h / 2;
		fill(text_col);
		noStroke();
		translate(this.x, this.y);
		rotate(this.angle);
		rotate(-PI / 2);
		triangle(x1, y1, x2, y2, x3, y3);
		pop();
	}
}

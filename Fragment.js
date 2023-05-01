class Fragment {
	constructor(i, w, h, dist_offset, turnCol) {
		// this.vec = createVector(x,y)
		// this.vec.setMag(dist_offset)
		// this.x = x
		// this.y = y
		this.i = i;
		this.w = w;
		this.h = h;
		this.dist_offset = dist_offset;
		this.turnCol = turnCol;
	}
	show() {
		push();
		// if(random() > 0.8) fill(whiteCol)
		// else noFill()
		const cos_i = cos(this.i);
		const sin_i = sin(this.i);
        console.log(outer_radius);
		const x = outer_radius * this.dist_offset * cos_i;
		const y = outer_radius * this.dist_offset * sin_i;
		const vec = createVector(x, y);
		// console.log(x,y);
		translate(x, y);
		rotate(vec.heading());
        const add_rot_1 = map(sin_i, -1,1, -PI/2, PI)
        rotate(add_rot_1)
        const add_rot_2 = map(cos_i, -1,1, -PI/2, PI)
        rotate(add_rot_2)

		if (this.turnCol) fill(whiteCol);
		else noFill();
		stroke(whiteCol);
		const w = map(cos_i, -1, 1, this.w/3, this.w * 2);
		const h = map(sin_i, -1, 1, this.h/3, this.h * 2);
		rect(0, 0, w, h);
		pop();
	}
}

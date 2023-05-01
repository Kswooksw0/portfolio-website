class Nonce {
	constructor(nonce, rot_angle, nonce_wheel_no) {
		this.nonce = nonce;
		this.rot_angle = rot_angle;
		this.nonce_wheel_no = nonce_wheel_no;
	}
	show() {
		let r;
		switch (this.nonce_wheel_no) {
			case 1:
				r = wheel_radius_1;
				break;
			case 2:
				r = wheel_radius_2;
				break;
			case 3:
				r = wheel_radius_3;
				break;
			case 4:
				r = wheel_radius_4;
				break;
			case 5:
				r = wheel_radius_5;
				break;
		}
		const x = r * cos(this.rot_angle);
		const y = r * sin(this.rot_angle);
		const nonce_col = color(text_col);
		const nonce_opacity = map(r, wheel_radius_1, wheel_radius_5, 30, 255);
		nonce_col.setAlpha(nonce_opacity);
		push();
		fill(nonce_col);
		strokeWeight(0.1);
		translate(x, y);
		rotate(createVector(x, y).heading());
		rotate(PI / 2);
		let fontSize = map(pointer_radius, 200, 280, 11, 18);
		textSize(fontSize);
		textFont(font_primary);
		textAlign(CENTER);
		text(this.nonce, 0, 0);
		pop();
	}
}

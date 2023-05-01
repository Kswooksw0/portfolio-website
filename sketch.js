// const bg_col = "#0E0C0C";
const bg_col = "#151515";
const text_col = "#FAF9F6";

// FONT
let font_primary;
let font_secondary;

// BITCOIN SYMBOL
let bitcoin

// title components
let intro_title
let intro_title_x
let intro_title_y
let intro_para
let intro_para_x
let intro_para_y

// wheel
let wheel_x
let wheel_y

// container containing labels and sliders
let container_x
let container_y

// slider labels
let pointer_pos_label
let radius_label
let rot_vel_label
// slider labels' positions
let pointer_pos_label_x
let pointer_pos_label_y
let radius_label_x
let radius_label_y
let rot_vel_label_x
let rot_vel_label_y

// sliders 
let pointer_pos_slider;
let radius_slider;
let rot_vel_slider;
// sliders' positions
let pointer_pos_x
let pointer_pos_y
let radius_x
let radius_y
let rot_vel_x;
let rot_vel_y;

// nonce label
let nonce_label
// nonce label's position
let nonce_label_x
let nonce_label_y
// nonce pairs
let nonce_first;
let nonce_second;
let nonce_third;
let nonce_fourth;
let nonce_fifth;
// nonce pairs' positions
let nonce_first_x
let nonce_first_y
let nonce_second_x
let nonce_second_y
let nonce_third_x
let nonce_third_y
let nonce_fourth_x
let nonce_fourth_y
let nonce_fifth_x
let nonce_fifth_y

// hash label
let hash_label
// hash label's position
let hash_label_x
let hash_label_y
// hash
let hash
// hash's position
let hash_x
let hash_y

// NUMERICAL VARIALBLES

// array of nonces
let nonces = [];
// amount for each nonce to shift on x-axis
let nonce_shift
// target nonce 
let target_nonce;
// threshold for finding valid nonce
let nonce_threshold

// wheel radius
let radius_min 
let radius_max 

// wheel velocity max and min
let rot_vel_min
let rot_vel_max

// angle increment for nonce on the wheel
let angle_div;
// radius of the circle made by the pointer
let pointer_radius;
// angle the pointer makes from origin
let pointer_angle;
// rotational velocity of the wheel
let rot_vel;

// angle increments for each of the 5 wheels
let angle_shift_1;
let angle_shift_2;
let angle_shift_3;
let angle_shift_4;
let angle_shift_5;
// radii of the 5 wheels
let wheel_radius_1;
let wheel_radius_2;
let wheel_radius_3;
let wheel_radius_4;
let wheel_radius_5;

// boolean for when correct nonce is guessed
let isMined = false

function preload() {
	// load fonts
	font_primary = loadFont("./fonts/gemsbuck.ttf");
    font_secondary = loadFont("./fonts/Roboto-Medium.ttf")
    // load bitcoin image
    bitcoin = loadImage("./img/bitcoin_img.png")
}

function setup() {
    // noLoop()
	pixelDensity(2);
	createCanvas(innerWidth, innerHeight);
	background(bg_col);
	frameRate(30);

    // INITIALISING VARIABLES
    radius_min = 200
    radius_max = 280

    rot_vel_min = 0.005
    rot_vel_max = 0.05

    angle_div = TWO_PI / 30;

    nonce_shift = 30
    target_nonce = 50
    nonce_threshold = 60

    for (let i = 0; i < TWO_PI; i += angle_div) {
		const nonce_1 = '' + floor(random(10)) + floor(random(10))
		const nonce_2 = '' + floor(random(10)) + floor(random(10))
		const nonce_3 = '' + floor(random(10)) + floor(random(10))
		const nonce_4 = '' + floor(random(10)) + floor(random(10))
		const nonce_5 = '' + floor(random(10)) + floor(random(10))
		const nonce_arr = [
			new Nonce(nonce_1, i, 1),
			new Nonce(nonce_2, i, 2),
			new Nonce(nonce_3, i, 3),
			new Nonce(nonce_4, i, 4),
			new Nonce(nonce_5, i, 5),
		];
		nonces.push(nonce_arr);
	}

    // POSITIONING

    // positions of title components
    intro_title_x = width * 0.1
    intro_title_y = height * 0.25

    intro_para_x = intro_title_x
    intro_para_y = intro_title_y + height * 0.125

    // intro title
    intro_title = createDiv('sangwoo kim')
    intro_title.position(intro_title_x, intro_title_y)
    intro_title.style('width', '40vw')
    // intro_title.style('height', '15vh')
    intro_title.style('color',text_col)
    intro_title.style("font-size", '4rem')
    // intro_title.style("padding", '0px')
    // intro_title.style("border", '3px solid red')
    intro_title.style("font-family", 'gemsbuck')

    // intro paragraph
    intro_para = createDiv("I'm an avid fan of blockchain technology and all that is web 3.0. Currently an undergraduate at National University of Singapore, I major in business analytics while teaching myself blockchain development. On my spare time, I make generative nft art. ")
    intro_para.position(intro_para_x, intro_para_y)
    intro_para.style("width", '40vw')
    // intro_para.style("border", '3px solid red')
    intro_para.style('color', text_col)
    intro_para.style('font-size', '1rem')
    intro_para.style("font-family", 'Roboto-Medium')
    intro_para.style("line-height", '2rem')
    intro_para.style("word-wrap", 'break-word')
    intro_para.style("opacity", '0.7')
    
    // position of the wheel
    wheel_x = width * 0.725
    wheel_y = height * 0.37

    // position of the container that contains labels and sliders
    container_x = width * 0.5
    container_y = height * 0.5

    // positions of labels
    nonce_label_x = container_x 
    nonce_label_y = container_y + height * 0.25

    hash_label_x = nonce_label_x
    hash_label_y = nonce_label_y + height * 0.125

    pointer_pos_label_x = container_x + width * 0.20
    pointer_pos_label_y = container_y + height * 0.25

    radius_label_x = pointer_pos_label_x
    radius_label_y = pointer_pos_label_y + height * 0.075

    rot_vel_label_x = pointer_pos_label_x
    rot_vel_label_y = radius_label_y + height * 0.075

    // labels 
    nonce_label = createDiv('nonce')
    nonce_label.position(nonce_label_x, nonce_label_y)
    nonce_label.style('color',text_col)
    nonce_label.style("font-family", 'gemsbuck')

    hash_label = createDiv('hash')
    hash_label.position(hash_label_x, hash_label_y)
    hash_label.style('color',text_col)
    hash_label.style("font-family", 'gemsbuck')

    pointer_pos_label = createDiv('pointer_position')
    pointer_pos_label.position(pointer_pos_label_x, pointer_pos_label_y)
    pointer_pos_label.style('color',text_col)
    pointer_pos_label.style("font-family", 'gemsbuck')
    
    radius_label = createDiv('radius')
    radius_label.position(radius_label_x, radius_label_y)
    radius_label.style('color',text_col)
    radius_label.style("font-family", 'gemsbuck')

    rot_vel_label = createDiv('velocity')
    rot_vel_label.position(rot_vel_label_x, rot_vel_label_y)
    rot_vel_label.style('color',text_col)
    rot_vel_label.style("font-family", 'gemsbuck')

    // positions of nonces
    nonce_first_x = nonce_label_x + width * 0.065
    nonce_first_y = nonce_label_y
    nonce_second_x = nonce_first_x + nonce_shift
    nonce_second_y = nonce_label_y
    nonce_third_x = nonce_second_x + nonce_shift
    nonce_third_y = nonce_label_y
    nonce_fourth_x = nonce_third_x + nonce_shift
    nonce_fourth_y = nonce_label_y
    nonce_fifth_x = nonce_fourth_x + nonce_shift
    nonce_fifth_y = nonce_label_y

    // nonces
	nonce_first = createDiv("");
	nonce_second = createDiv("");
	nonce_third = createDiv("");
    nonce_fourth = createDiv("");
    nonce_fifth = createDiv("");

	nonce_first.position(nonce_first_x, nonce_first_y);
	nonce_second.position(nonce_second_x, nonce_second_y);
	nonce_third.position(nonce_third_x, nonce_third_y);
	nonce_fourth.position(nonce_fourth_x, nonce_fourth_y);
	nonce_fifth.position(nonce_fifth_x, nonce_fifth_y);

	nonce_first.style("color", text_col);
	nonce_first.style("font-family", 'gemsbuck');
	nonce_second.style("color", text_col);
	nonce_second.style("font-family", "gemsbuck");
	nonce_third.style("color", text_col);
	nonce_third.style("font-family", "gemsbuck");
    nonce_fourth.style("color", text_col);
	nonce_fourth.style("font-family", "gemsbuck");
    nonce_fifth.style("color", text_col);
	nonce_fifth.style("font-family", "gemsbuck");

    // position of hash
    hash_x = nonce_first_x
    hash_y = nonce_first_y + height * 0.05

    // hash
	hash = createDiv("");
	hash.position(hash_x, hash_y);
    hash.style('display', 'inline')
    hash.style('width', '10vw')
    hash.style('height', '10vw')
    hash.style('word-wrap', 'break-word')
	hash.style("color", text_col);
	hash.style("font-family", "gemsbuck");

    // positions of sliders
    pointer_pos_x = pointer_pos_label_x + width * 0.15
    pointer_pos_y = pointer_pos_label_y + 5

    radius_x = pointer_pos_x
    radius_y = pointer_pos_y + height * 0.075

    rot_vel_x = pointer_pos_x
    rot_vel_y = radius_y + height * 0.075

    // sliders
	pointer_pos_slider = createSlider(0, TWO_PI, QUARTER_PI, 0.01);
	pointer_pos_slider.position(pointer_pos_x, pointer_pos_y);
    
	radius_slider = createSlider(radius_min, radius_max, 220, 1);
	radius_slider.position(radius_x, radius_y);

	rot_vel_slider = createSlider(rot_vel_min, rot_vel_max, 0.015, 0.001);
	rot_vel_slider.position(rot_vel_x, rot_vel_y);
}

function draw() {
	// noLoop()
	background(bg_col);
	translate(wheel_x, wheel_y);

	// set wheel velocity
	rot_vel = rot_vel_slider.value();
	angle_shift_1 = rot_vel 
	angle_shift_2 = -rot_vel 
	angle_shift_3 = rot_vel 
	angle_shift_4 = -rot_vel 
	angle_shift_5 = rot_vel 

	// set pointer radius
	pointer_radius = radius_slider.value();
	wheel_radius_5 = pointer_radius - 37;
	wheel_radius_4 = wheel_radius_5 - 15;
	wheel_radius_3 = wheel_radius_4 - 15;
	wheel_radius_2 = wheel_radius_3 - 15;
	wheel_radius_1 = wheel_radius_2 - 15;

	// set pointer angle
	pointer_angle = pointer_pos_slider.value();

	// create pointer
	const pointer_vec = p5.Vector.fromAngle(pointer_angle);
	pointer_vec.setMag(pointer_radius);
	let pointer = new Pointer(pointer_vec.x, pointer_vec.y);

    // show nonce
	for (let nonce_arr of nonces) {
		const [nonce_1, nonce_2, nonce_3, nonce_4, nonce_5] = nonce_arr;
		nonce_1.rot_angle += angle_shift_1;
		nonce_2.rot_angle += angle_shift_2;
		nonce_3.rot_angle += angle_shift_3;
		nonce_4.rot_angle += angle_shift_4;
		nonce_5.rot_angle += angle_shift_5;

		if (nonce_1.rot_angle >= TWO_PI) nonce_1.rot_angle = 0;
		if (angleBetween(nonce_1.rot_angle, pointer_angle) < (angle_div * 7) / 10)
			nonce_first.html(nonce_1.nonce);
		nonce_1.show();

		if (nonce_2.rot_angle <= -TWO_PI) nonce_2.rot_angle = 0;
		if (angleBetween(nonce_2.rot_angle, pointer_angle) < (angle_div * 7) / 10)
			nonce_second.html(nonce_2.nonce);
		nonce_2.show();

		if (nonce_3.rot_angle >= TWO_PI) nonce_3.rot_angle = 0;
		if (angleBetween(nonce_3.rot_angle, pointer_angle) < (angle_div * 7) / 10)
			nonce_third.html(nonce_3.nonce);
		nonce_3.show();

        if (nonce_4.rot_angle <= -TWO_PI) nonce_4.rot_angle = 0;
		if (angleBetween(nonce_4.rot_angle, pointer_angle) < (angle_div * 7) / 10)
			nonce_fourth.html(nonce_4.nonce);
		nonce_4.show();

        if (nonce_5.rot_angle >= TWO_PI) nonce_5.rot_angle = 0;
		if (angleBetween(nonce_5.rot_angle, pointer_angle) < (angle_div * 7) / 10)
			nonce_fifth.html(nonce_5.nonce);
		nonce_5.show();
	}

    // show hash
	const hash_input = Number(nonce_first.html()) + Number(nonce_second.html()) + Number(nonce_third.html()) + Number(nonce_fourth.html()) + Number(nonce_fifth.html())
	if (abs(hash_input - target_nonce) <= nonce_threshold)  {
        isMined = true
        console.log('mined!');
    }
	hashBrowser(JSON.stringify(hash_input)).then(res => hash.html(res));

    // console.log(isMined);
    // show bitcoin symbol
    if(isMined) image(bitcoin,-wheel_radius_1, -wheel_radius_1, wheel_radius_1 * 2 , wheel_radius_1 * 2)
    
    // show pointer
	pointer.show();
	// noLoop()
}

// calculates the difference between two angles in radians
const angleBetween = (angle_1, angle_2) => {
	const x1 = cos(angle_1);
	const y1 = sin(angle_1);
	const x2 = cos(angle_2);
	const y2 = sin(angle_2);
	const vec_1 = createVector(x1, y1);
	const vec_2 = createVector(x2, y2);
	vec_1.normalize();
	vec_2.normalize();
	const dot_product = p5.Vector.dot(vec_1, vec_2);
	return acos(dot_product);
};

// calculate SHA-256 hash output
const hashBrowser = (val) =>
	window.crypto.subtle
		.digest("SHA-256", new TextEncoder("utf-8").encode(val))
		.then((h) => {
			let hexes = [],
				view = new DataView(h);
			for (let i = 0; i < view.byteLength; i += 4)
				hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
            let prefix = ''
            let limit
            if(random() > 0.98) limit = 4
            else limit = 2
            for(let i = 0; i <= limit; i++) {
                prefix += '0'
            }
			return prefix.concat(hexes.join(''))
		});

function keyPressed() {
	if (key === "s") {
		saveCanvas("Experiment", "png");
	}
}

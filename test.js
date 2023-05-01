const bgColor = "#0E0C0C";
let img
function preload() {
    img = loadImage('./img/bitcoin_img.png')
}
function setup() {
    pixelDensity(2)
    createCanvas(innerWidth, innerHeight)
    background(bgColor)
}
function draw() {
    background(bgColor)
    // tint(255,50)
    console.log(wheel_x);
    image(img,wheel_x,0,300,300)

}
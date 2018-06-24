var widthw = window.innerWidth;
var heightw = window.innerHeight;
var grid;
var cols;
var rows;
var w = 20;
var tempClick = 0;
var isOver = true;
let result;

function make2DArray() {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(widthw, heightw);
		
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2DArray(cols, rows);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY) && isOver) {
				grid[i][j].click = true;

				if(grid[i][j].data == 'p'){
					tempClick++;
					if(tempClick % 2 == 0){
						grid[i][j].data = 'x';
					}
					else grid[i][j].data = 'o';
				}
				GameOver(i, j);
			}
		}
	}
}

function GameOver(x, y){
	let ngang = 0;
	let doc = 0;
	let cheothuan = 0;
	let cheoxuoi = 0;

	for(let i = x + 1; grid[i][y].data == grid[x][y].data ; i++){
		ngang++;
	}
	for(let i = x - 1; grid[i][y].data == grid[x][y].data ; i--){
		ngang++;
	}

	for(let i = y + 1; grid[x][i].data == grid[x][y].data ; i++){
		doc++;
	}
	for(let i = y - 1; grid[x][i].data == grid[x][y].data ; i--){
		doc++;
	}

	let xcheo = x + 1;
	let ycheo = y + 1;
	while(grid[x][y].data == grid[xcheo][ycheo].data){
		xcheo++;
		ycheo++;
		cheothuan++;
	}
	xcheo = x - 1;
	ycheo = y - 1;
	while(grid[x][y].data == grid[xcheo][ycheo].data){
		xcheo--;
		ycheo--;
		cheothuan++;
	}

	xcheo = x - 1;
	ycheo = y + 1;
	while(grid[x][y].data == grid[xcheo][ycheo].data){
		xcheo--;
		ycheo++;
		cheoxuoi++;
	}
	xcheo = x + 1;
	ycheo = y - 1;
	while(grid[x][y].data == grid[xcheo][ycheo].data){
		xcheo++;
		ycheo--;
		cheoxuoi++;
	}

	console.log('' + ngang + ' ' + doc + ' ' + cheothuan + ' ' + cheoxuoi )

	if(ngang >= 4 || cheothuan >= 4 || cheoxuoi >= 4 || doc >= 4) {
		isOver = false;
		result = grid[x][y].data + ' is win';
	}
}

function draw() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
	if(isOver == false){
		stroke(0);
		fill(255);
		rect((cols/2 - 1)*w, (rows/2)*w - 10, 3*w, 1*w);
		textAlign(CENTER);
		textAlign(CENTER);
		fill(0);
		text(result, widthw / 2 + w* 0.5, heightw / 2 + 3);
	}
}
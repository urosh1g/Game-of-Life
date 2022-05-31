const canvas = document.getElementById("drawable");
canvas.width = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const MAP_SIZE = 100;
const TILE_SIZE = canvas.width / MAP_SIZE;

let map = [];
let running = false;
var timeout;

function init_map(){
	for(let i = 0; i < MAP_SIZE; i++){
		map[i] = [];
		for(let j = 0; j < MAP_SIZE; j++){
			map[i][j] = Math.floor(Math.random() * 1.2);
		}
	}
}

function draw(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	ctx.fillStyle = "#000000";
	for(let i = 0; i < MAP_SIZE; i++)
		for(let j = 0; j < MAP_SIZE; j++){
			if(map[i][j] == 1)
				ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
}

function is_alive(i, j){
	if(i < 0 || i >= MAP_SIZE || j < 0 || j >= MAP_SIZE)
		return false;
	return map[i][j] == 1;
}

function alive_neighbours(i, j){
	let count = 0;
	for(let ioff = -1; ioff <= 1; ioff++){
		for(let joff = -1; joff <= 1; joff++){
			if(ioff == 0 && joff == 0)
				continue;
			if(i + ioff < 0 || i + ioff >= MAP_SIZE || j + joff < 0 || j + joff >= MAP_SIZE)
				continue;
			if(map[i + ioff][j + joff] == 1)
				count++;
		}
	}
	return count;
}

function next_gen(){
	let new_map = [];
	for(let i = 0; i < MAP_SIZE; i++){
		new_map[i] = [];
		for(let j = 0; j < MAP_SIZE; j++){
			let neighbours = alive_neighbours(i, j);
			if(neighbours == 3){
				new_map[i][j] = 1;
			}
			else if(map[i][j] == 1 && neighbours != 2)
				new_map[i][j] = 0;
			else 
				new_map[i][j] = map[i][j];
		}
	}
	return new_map;
}

function gameloop(){
	draw();
	map = next_gen();
	timeout = setTimeout( () => {
		window.requestAnimationFrame(() => gameloop());
	}, 100);
}


function start(){
	if(!running) running = true;
	else clearTimeout(timeout);
	init_map();
	gameloop();
}

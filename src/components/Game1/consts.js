const CANVAS_SIZE = [500, 500];
const SNAKE_START = [[8,17],[8,18]];
const MOUSE_START = [8,3]
const SCALE = 20;

const DIRECTIONS = {
    38:[0,-1],
    40:[0, 1],
    37:[-1,0],
    39:[1, 0]
};
const FOOD = [
    'https://cdn1.iconfinder.com/data/icons/food-3-11/128/food_Strawberry-Fruit-Juice-2-128.png',
    'https://cdn2.iconfinder.com/data/icons/reptiles-amphibians-color/290/16-128.png',
    "https://cdn3.iconfinder.com/data/icons/animal-emoji/50/Mouse-128.png",
    'https://cdn3.iconfinder.com/data/icons/animal-40/128/Animal_Cockroach_Bug-128.png',
    'https://cdn3.iconfinder.com/data/icons/animal-40/128/Animal_Fish-128.png'
]
export {CANVAS_SIZE,SNAKE_START, MOUSE_START, SCALE, DIRECTIONS,FOOD}

function move_Robot(x, y, direction) {
    if (direction === "North" && y < 4) {
        y = y + 1;
    } else if (direction === "South" && y > 0) {
        y = y - 1;
    } else if (direction === "East" && x < 4) {
        x = x + 1;
    } else if (direction === "West" && x > 0) {
        x = x - 1;
    } else {
        console.log("error 1- you are completely lost, which way are you going?");
    }
    return [x, y];
}

console.log(move_Robot(1, 1, "South"));




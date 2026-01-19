let board_location = [-1, -1, "UNPLACED"];
let placed = 0;
let x = -1;
let y = -1;

function move_robot(x, y, direction) {
    if (direction == "NORTH") {
        if (y < 4) {
            y = y + 1;
        }
    } else if (direction == "SOUTH") {
        if (y > 0) {
            y = y - 1;
        }
    } else if (direction == "EAST") {
        if (x < 4) {
            x = x + 1;
        }
    } else if (direction == "WEST") {
        if (x > 0) {
            x = x - 1;
        }
    } else {
        console.log("you are completely lost, which way are you going 1?");
    }

    board_location[0] = x;
    board_location[1] = y;
}

function turn_robot(direction, turn) {
    if (direction == "NORTH") {
        if (turn == "LEFT") {
            direction = "WEST";
        } else if (turn == "RIGHT") {
            direction = "EAST";
        } else {
            console.log(" no change in direction 1");

        }

    } else if (direction == "SOUTH") {
        if (turn == "LEFT") {
            direction = "EAST";
        } else if (turn == "RIGHT") {
            direction = "WEST";
        } else {
            console.log(" no change in direction 2");
        }
    } else if (direction == "EAST") {
        if (turn == "LEFT") {
            direction = "NORTH";
        } else if (turn == "RIGHT") {
            direction = "SOUTH";
        } else {
            console.log(" no change in direction 3");
        }
    } else if (direction == "WEST") {
        if (turn == "LEFT") {
            direction = "SOUTH";
        } else if (turn == "RIGHT") {
            direction = "NORTH";
        } else {
            console.log(" no change in direction 4");
        }
    } else {
        console.log("error 2 - you are completely lost, which way are you going?");
    }
}

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const lines = content.split(/\r\n|\n|\r/);

            lines.forEach((line, index) => {
                console.log(`${line}`);
                let n = line.search(/place/i);
                if (n >= 0) {
                    console.log("place found");

                    const place_array = line.split(",");
                    console.log(place_array[0]);
                    const trimmed_place_array = place_array;
                    trimmed_place_array[0] = place_array[0].replace(/place/i, "");
                    x = parseInt(place_array[0], 10);
                    y = parseInt(place_array[1], 10);
                    console.log(`${place_array}`);
                    console.log(place_array[0]);
                    console.log(place_array[0].replace("place/i", ""));
                    console.log(trimmed_place_array[0]);
                    console.log(trimmed_place_array);

                    console.log("X = " + x);
                    console.log("Y = " + y);

                    console.log("direction :" + place_array[2]);

                    if ((x <= 4) && (y <= 4) && (x >= 0) && (y >= 0) && (place_array[2] == "NORTH" || place_array[2] == "SOUTH" || place_array[2] == "EAST" || place_array[2] == "WEST")) {
                        board_location[0] = x;
                        board_location[1] = y;
                        board_location[2] = trimmed_place_array[2];
                        placed = 1;

                        console.log("robotcoords :" + board_location);
                    }

                }

                n = line.search(/move/i);
                if (n >= 0) {
                    if (placed == 1) {
                        move_robot(board_location[0], board_location[1], board_location[2]);
                    }
                }

                n = line.search(/left/i);
                if (n >= 0) {
                    if (placed == 1) {
                        turn_robot(board_location[2], "LEFT");
                        console.log("left found and placed enabled test");
                    }
                }

                n = line.search(/right/i);
                if (n >= 0) {
                    if (placed == 1) {
                        turn_robot(board_location[2], "RIGHT");
                    }
                }

                n = line.search(/report/i);
                if (n >= 0) {
                    console.log("OUTPUT:" + board_location[0] + "," + board_location[1] + "," + board_location[2]);
                }
            });
        };

        reader.onerror = function (e) {
            console.error('Error reading file: ', e.target.error);
        };

        reader.readAsText(file, 'UTF-8');
    }
});
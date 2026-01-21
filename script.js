let board_location = [-1, -1, "UNPLACED"];
let placed = 0;
let x = -1;
let y = -1;

function move_robot(x, y, direction) {
    if (direction == "NORTH" && y < 4) {
        y = y + 1;
    } else if (direction == "SOUTH" && y > 0) {
        y = y - 1;
    } else if (direction == "EAST" && x < 4) {
        x = x + 1;
    } else if (direction == "WEST" && x > 0) {
        x = x - 1;
    }
    board_location[0] = x;
    board_location[1] = y;
}

function turn_robot(direction, turn) {
    if ((direction == "NORTH" && turn == "LEFT") || (direction == "SOUTH" && turn == "RIGHT")) {
        direction = "WEST";
    } else if ((direction == "NORTH" && turn == "RIGHT") || (direction == "SOUTH" && turn == "LEFT")) {
        direction = "EAST";
    } else if ((direction == "EAST" && turn == "LEFT") || (direction == "WEST" && turn == "RIGHT")) {
        direction = "NORTH";
    } else if ((direction == "WEST" && turn == "LEFT") || (direction == "EAST" && turn == "RIGHT")) {
        direction = "SOUTH";
    }
    board_location[2] = direction;
}

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const lines = content.split(/\r\n|\n|\r/);

            lines.forEach((line, index) => {
                let n = line.search(/place/i);
                if (n >= 0) {
                    const place_array = line.split(",");
                    const trimmed_place_array = place_array;
                    trimmed_place_array[0] = place_array[0].replace(/place/i, "");
                    x = parseInt(place_array[0], 10);
                    y = parseInt(place_array[1], 10);


                    if (x <= 4 && y <= 4 && x >= 0 && y >= 0 && (place_array[2] == "NORTH" || place_array[2] == "SOUTH" || place_array[2] == "EAST" || place_array[2] == "WEST")) {
                        board_location[0] = x;
                        board_location[1] = y;
                        board_location[2] = trimmed_place_array[2];
                        placed = 1;

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
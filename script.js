let board_position = { x: 0, y: 0, direction: "UNPLACES" };

function move_robot() {

    if (board_position.direction == "NORTH" && board_position.y < 4) {
        board_position.y++;
    } else if (board_position.direction == "SOUTH" && board_position.y > 0) {
        board_position.y--;
    } else if (board_position.direction == "EAST" && board_position.x < 4) {
        board_position.x++;
    } else if (board_position.direction == "WEST" && board_position.x > 0) {
        board_position.x--;

    }
}

function turn_robot(turn) {

    if ((board_position.direction == "NORTH" && turn == "LEFT") || (board_position.direction == "SOUTH" && turn == "RIGHT")) {
        board_position.direction = "WEST";
    } else if ((board_position.direction == "NORTH" && turn == "RIGHT") || (board_position.direction == "SOUTH" && turn == "LEFT")) {
        board_position.direction = "EAST";
    } else if ((board_position.direction == "EAST" && turn == "LEFT") || (board_position.direction == "WEST" && turn == "RIGHT")) {
        board_position.direction = "NORTH";
    } else if ((board_position.direction == "WEST" && turn == "LEFT") || (board_position.direction == "EAST" && turn == "RIGHT")) {
        board_position.direction = "SOUTH";
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
                let pattern = /place/i;
                if (pattern.test(line) == true) {
                    const place_array = line.split(",");
                    const trimmed_place_array = place_array;
                    trimmed_place_array[0] = place_array[0].replace(/place/i, "");
                    x = Number(place_array[0]);
                    y = Number(place_array[1]);
                    if (x <= 4 && y <= 4 && x >= 0 && y >= 0 && (place_array[2] == "NORTH" || place_array[2] == "SOUTH" || place_array[2] == "EAST" || place_array[2] == "WEST")) {
                        board_position.x = x;
                        board_position.y = y;
                        board_position.direction = trimmed_place_array[2];
                        placed = true;
                    }
                }
                if (placed == true) {
                    pattern = /move/i;
                    if (pattern.test(line) == true) {
                        move_robot();
                    }
                    pattern = /left/i;
                    if (pattern.test(line) == true) {
                        turn_robot("LEFT");
                    }
                    pattern = /right/i;
                    if (pattern.test(line) == true) {
                        turn_robot("RIGHT");
                    }
                }
                pattern = /report/i;
                if (pattern.test(line) == true) {
                    console.log("OUTPUT:" + board_position.x + "," + board_position.y + "," + board_position.direction);
                }
            });
        };
        reader.onerror = function (e) {
            console.error('Error reading file: ', e.target.error);
        };
        reader.readAsText(file, 'UTF-8');
    }
});

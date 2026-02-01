let board_position = { x: 0, y: 0, direction: "UNPLACES" };

const directions = { west: "WEST", east: "EAST", north: "NORTH", south: "SOUTH", place: 4 };
const turns = { left: "LEFT", right: "RIGHT" };

function move_robot() {

    if (board_position.direction == directions.north && board_position.y < directions.place) {
        board_position.y++;
    } else if (board_position.direction == directions.south && board_position.y > 0) {
        board_position.y--;
    } else if (board_position.direction == directions.east && board_position.x < directions.place) {
        board_position.x++;
    } else if (board_position.direction == directions.west && board_position.x > 0) {
        board_position.x--;

    }
}

function turn_robot(turn) {

    if ((board_position.direction == directions.north && turn == turns.left) || (board_position.direction == directions.south && turn == turns.right)) {
        board_position.direction = directions.west;
    } else if ((board_position.direction == directions.north && turn == turns.right) || (board_position.direction == directions.south && turn == turns.left)) {
        board_position.direction = directions.east;
    } else if ((board_position.direction == directions.east && turn == turns.left) || (board_position.direction == directions.west && turn == turns.right)) {
        board_position.direction = directions.north;
    } else if ((board_position.direction == directions.west && turn == turns.left) || (board_position.direction == directions.east && turn == turns.right)) {
        board_position.direction = directions.south;
    }
}

function fileLoad(e) {

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
            if (x <= directions.place && y <= directions.place && x >= 0 && y >= 0 && (place_array[2] == directions.north || place_array[2] == directions.south || place_array[2] == directions.east || place_array[2] == directions.west)) {
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
                turn_robot(turns.left);
            }
            pattern = /right/i;
            if (pattern.test(line) == true) {
                turn_robot(turns.right);
            }
        }
        pattern = /report/i;
        if (pattern.test(line) == true) {
            console.log("OUTPUT:" + board_position.x + "," + board_position.y + "," + board_position.direction);
        }
    });
};

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = fileLoad;
        reader.onerror = function (e) {
            console.error('Error reading file: ', e.target.error);
        };
        reader.readAsText(file, 'UTF-8');
    }
});
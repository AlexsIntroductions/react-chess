import $ from "jquery"
import { hasPiece, getNumber } from './Engine'

function showPawnMoves(target) {
    let temp = parseInt(getNumber($(target)));
    let upOne = "." + (temp + 8);
    let upTwo = "." + (temp + 16);
    let downOne = "." + (temp - 8);
    let downTwo = "." + (temp - 16);
    //if white show up wards
    if (target.classList.contains('white')) {
        if (temp + 8 <= 64) {
            if (hasPiece($(upOne))) {
                $(upOne).addClass('blocked');
            }
            else {
                $(upOne).addClass('highlight');
            }
            if (temp % 8 !== 1 && hasPiece($("." + (temp + 7))) && $("." + (temp + 7)).hasClass("black")) {
                $("." + (temp + 7)).addClass("target");
            }
            if (temp % 8 !== 0 && hasPiece($("." + (temp + 9))) && $("." + (temp + 9)).hasClass("black")) {
                $("." + (temp + 9)).addClass("target");
            }
        }
        if (temp > 8 && temp < 17 && $(upOne).hasClass("highlight") && !$(upOne).hasClass("blocked")) {
            if (temp + 16 <= 64) {
                if (hasPiece($(upTwo))) {
                    $(upTwo).addClass('blocked');
                }
                else {
                    $(upTwo).addClass('highlight');
                }
            }
        }
        return;
    }
    //otherwise its black
    if (temp - 8 > 0) {
        if (hasPiece($(downOne))) {
            $(downOne).addClass('blocked');
        }
        else {
            $(downOne).addClass('highlight');
        }

        if (temp % 8 !== 0 && hasPiece($("." + (temp - 7))) && $("." + (temp - 7)).hasClass("white")) {
            $("." + (temp - 7)).addClass("target");
        }
        if (temp % 8 !== 1 && hasPiece($("." + (temp - 9))) && $("." + (temp - 9)).hasClass("white")) {
            $("." + (temp - 9)).addClass("target");
        }
    }
    if (temp > 48 && temp < 57 && $(downOne).hasClass("highlight") && !$(downOne).hasClass("blocked")) {
        if (temp - 16 > 0) {
            if (hasPiece($(downTwo))) {
                $(downTwo).addClass('blocked');
            }
            else {
                $(downTwo).addClass('highlight');
            }
        }
    }
    return;
}

function showKnightMoves(target) {
    let temp = parseInt(getNumber($(target)));
    let upL = "." + (temp + 15);
    let upR = "." + (temp + 17);
    let downR = "." + (temp - 17);
    let downL = "." + (temp - 15);
    let enemyColor = "white";
    if (target.classList.contains("white")) {
        enemyColor = "black";
    }
    //Highest two
    if (temp + 16 <= 64) {
        if (temp % 8 !== 0) {
            if (hasPiece($(upR))) {
                if ($(upR).hasClass(enemyColor)) {
                    $(upR).addClass("target");
                }
                else {
                    $(upR).addClass("blocked");
                }
            }
            else {
                $(upR).addClass("highlight");
            }
        }
        if (temp % 8 !== 1) {
            if (hasPiece($(upL))) {
                if ($(upL).hasClass(enemyColor)) {
                    $(upL).addClass("target");
                }
                else {
                    $(upL).addClass("blocked");
                }
            }
            else {
                $(upL).addClass("highlight");
            }
        }
    }
    //lowest two
    if (temp - 16 > 0) {
        if (temp % 8 !== 1) {
            if (hasPiece($(downR))) {
                if ($(downR).hasClass(enemyColor)) {
                    $(downR).addClass("target");
                }
                else {
                    $(downR).addClass("blocked");
                }
            }
            else {
                $(downR).addClass("highlight");
            }
        }
        if (temp % 8 !== 0) {
            if (hasPiece($(downL))) {
                if ($(downL).hasClass(enemyColor)) {
                    $(downL).addClass("target");
                }
                else {
                    $(downL).addClass("blocked");
                }
            }
            else {
                $(downL).addClass("highlight");
            }
        }
    }
    upL = "." + (temp + 6);
    upR = "." + (temp + 10);
    downR = "." + (temp - 6);
    downL = "." + (temp - 10);
    //rightmost two
    if (temp % 8 !== 0 && temp % 8 !== 7) {
        if (temp + 8 <= 64) {
            if (hasPiece($(upR))) {
                if ($(upR).hasClass(enemyColor)) {
                    $(upR).addClass("target");
                }
                else {
                    $(upR).addClass("blocked");
                }
            }
            else {
                $(upR).addClass("highlight");
            }
        }
        if (temp - 8 > 0) {
            if (hasPiece($(downR))) {
                if ($(downR).hasClass(enemyColor)) {
                    $(downR).addClass("target");
                }
                else {
                    $(downR).addClass("blocked");
                }
            }
            else {
                $(downR).addClass("highlight");
            }
        }
    }
    //leftmost two
    if (temp % 8 !== 1 && temp % 8 !== 2) {
        if (temp + 8 <= 64) {
            if (hasPiece($(upL))) {
                if ($(upL).hasClass(enemyColor)) {
                    $(upL).addClass("target");
                }
                else {
                    $(upL).addClass("blocked");
                }
            }
            else {
                $(upL).addClass("highlight");
            }
        }
        if (temp - 8 > 0) {
            if (hasPiece($(downL))) {
                if ($(downL).hasClass(enemyColor)) {
                    $(downL).addClass("target");
                }
                else {
                    $(downL).addClass("blocked");
                }
            }
            else {
                $(downL).addClass("highlight");
            }
        }
    }
}

function showRookMoves(target) {
    let temp = parseInt(getNumber($(target)));

    let enemyColor = "white";
    if (target.classList.contains("white")) {
        enemyColor = "black";
    }

    let currTile = temp + 8;
    allUpTiles(currTile, enemyColor);
    currTile -= 16;
    allDownTiles(currTile, enemyColor);
    currTile = temp + 1;
    allRightTiles(currTile, enemyColor);
    currTile = temp - 1;
    allLeftTiles(currTile, enemyColor);
}

function showBishopMoves(target) {
    let temp = parseInt(getNumber($(target)));

    let enemyColor = "white";
    if (target.classList.contains("white")) {
        enemyColor = "black";
    }

    let currTile = temp + 9;
    upRightTiles(currTile, enemyColor);
    currTile = temp + 7;
    upLeftTiles(currTile, enemyColor);
    currTile = temp - 7;
    downLeftTiles(currTile, enemyColor);
    currTile = temp - 9;
    downRightTiles(currTile, enemyColor);


}

function showQueenMoves(target) {

    let temp = parseInt(getNumber($(target)));

    let enemyColor = "white";
    if (target.classList.contains("white")) {
        enemyColor = "black";
    }
    let currTile = temp + 9;
    upRightTiles(currTile, enemyColor);
    currTile = temp + 7;
    upLeftTiles(currTile, enemyColor);
    currTile = temp - 7;
    downLeftTiles(currTile, enemyColor);
    currTile = temp - 9;
    downRightTiles(currTile, enemyColor);
    currTile = temp + 8;
    allUpTiles(currTile, enemyColor);
    currTile -= 16;
    allDownTiles(currTile, enemyColor);
    currTile = temp + 1;
    allRightTiles(currTile, enemyColor);
    currTile = temp - 1;
    allLeftTiles(currTile, enemyColor);
}

function showKingMoves(target) {
    let temp = parseInt(getNumber($(target)));

    let enemyColor = "white";
    if (target.classList.contains("white")) {
        enemyColor = "black";
    }
    //one right
    if (temp % 8 !== 0) {
        if (hasPiece($("." + (temp + 1)))) {
            if ($("." + (temp + 1)).hasClass(enemyColor)) {
                $("." + (temp + 1)).addClass("target");
            }
            else {
                $("." + (temp + 1)).addClass("blocked");
            }
        }
        else {
            $("." + (temp + 1)).addClass("highlight");
        }
    }
    //one left
    if (temp % 8 !== 1) {
        if (hasPiece($("." + (temp - 1)))) {
            if ($("." + (temp - 1)).hasClass(enemyColor)) {
                $("." + (temp - 1)).addClass("target");
            }
            else {
                $("." + (temp - 1)).addClass("blocked");
            }
        }
        else {
            $("." + (temp - 1)).addClass("highlight");
        }
    }

    //one up
    if (temp < 57) {
        if (hasPiece($("." + (temp + 8)))) {
            if ($("." + (temp + 8)).hasClass(enemyColor)) {
                $("." + (temp + 8)).addClass("target");
            }
            else {
                $("." + (temp + 8)).addClass("blocked");
            }
        }
        else {
            $("." + (temp + 8)).addClass("highlight");
        }
    }

    //one down
    if (temp > 8) {
        if (hasPiece($("." + (temp - 8)))) {
            if ($("." + (temp - 8)).hasClass(enemyColor)) {
                $("." + (temp - 8)).addClass("target");
            }
            else {
                $("." + (temp - 8)).addClass("blocked");
            }
        }
        else {
            $("." + (temp - 8)).addClass("highlight");
        }
    }

    //one up right
    if (temp % 8 !== 0) {
        if (hasPiece($("." + (temp + 9)))) {
            if ($("." + (temp + 9)).hasClass(enemyColor)) {
                $("." + (temp + 9)).addClass("target");
            }
            else {
                $("." + (temp + 9)).addClass("blocked");
            }
        }
        else {
            $("." + (temp + 9)).addClass("highlight");
        }
    }
    //one up left
    if (temp % 8 !== 1) {
        if (hasPiece($("." + (temp + 7)))) {
            if ($("." + (temp + 7)).hasClass(enemyColor)) {
                $("." + (temp + 7)).addClass("target");
            }
            else {
                $("." + (temp + 7)).addClass("blocked");
            }
        }
        else {
            $("." + (temp + 7)).addClass("highlight");
        }
    }
    //one down left
    if (temp % 8 !== 0) {
        if (hasPiece($("." + (temp - 7)))) {
            if ($("." + (temp - 7)).hasClass(enemyColor)) {
                $("." + (temp - 7)).addClass("target");
            }
            else {
                $("." + (temp - 7)).addClass("blocked");
            }
        }
        else {
            $("." + (temp - 7)).addClass("highlight");
        }
    }
    //one down right
    if (temp % 8 !== 1) {
        if (hasPiece($("." + (temp - 9)))) {
            if ($("." + (temp - 9)).hasClass(enemyColor)) {
                $("." + (temp - 9)).addClass("target");
            }
            else {
                $("." + (temp - 9)).addClass("blocked");
            }
        }
        else {
            $("." + (temp - 9)).addClass("highlight");
        }
    }
}

function allUpTiles(currTile, enemyColor) {
    //if the current tile is on the last rank, there is nothing to compute
    if (currTile - 8 <= 64 && currTile - 8 > 56) {
        return;
    }
    //while the current tile to analyze isnt on the last rank, highlight it
    while (currTile <= 64 && !hasPiece($("." + (currTile)))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile + 8;
    }
    //the while loop ends on the tile before the last tile, analyze the last tile to see if there is a piece and if there is what color
    if ($("." + currTile).hasClass(enemyColor)) {
        //if its an enemy, target it
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        //if its a ally, the path is blocked
        $("." + currTile).addClass("blocked");
    }
    else {
        //otherwise it can be moved to 
        $("." + currTile).addClass("highlight");
    }
}

function allDownTiles(currTile, enemyColor) {
    if (currTile + 8 <= 8 && currTile + 8 > 0) {
        return;
    }
    while (currTile > 0 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile - 8;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function allRightTiles(currTile, enemyColor) {
    if ((currTile - 1) % 8 === 0) {
        return;
    }
    while (currTile % 8 !== 0 && !hasPiece($("." + (currTile)))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile + 1;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function allLeftTiles(currTile, enemyColor) {
    if ((currTile + 1) % 8 === 1) {
        return;
    }
    while (currTile % 8 !== 1 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile - 1;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function upRightTiles(currTile, enemyColor) {
    if ((currTile - 9) % 8 === 0) {
        return;
    }
    while (currTile % 8 !== 0 && currTile <= 64 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile + 9;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function upLeftTiles(currTile, enemyColor) {
    if ((currTile - 7) % 8 === 1) {
        return;
    }
    while (currTile % 8 !== 1 && currTile <= 64 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile + 7;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function downRightTiles(currTile, enemyColor) {
    if ((currTile + 9) % 8 === 1) {
        return;
    }
    while (currTile % 8 !== 1 && currTile > 0 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile - 9;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

function downLeftTiles(currTile, enemyColor) {
    if ((currTile + 7) % 8 === 0) {
        return;
    }
    while (currTile % 8 !== 0 && currTile > 0 && !hasPiece($("." + currTile))) {
        $("." + currTile).addClass("highlight");
        currTile = currTile - 7;
    }

    if ($("." + currTile).hasClass(enemyColor)) {
        $("." + currTile).addClass("target");
    }
    else if (hasPiece($("." + currTile))) {
        $("." + currTile).addClass("blocked");
    }
    else {
        $("." + currTile).addClass("highlight");
    }
}

export { showPawnMoves, showBishopMoves, showKingMoves, showKnightMoves, showQueenMoves, showRookMoves }
import React from "react";
import $ from "jquery"
import './index.css';
import './Pieces.css';
import { showPawnMoves, showBishopMoves, showKingMoves, showKnightMoves, showQueenMoves, showRookMoves } from './Moves'
import { ComputerTest } from "./ComputerTest";

//TO CREATE A TRUE ENGINE LIKE FEEL, CREATE A BOARD / MOVES VARIABLE OF A LIST OF ALL PIECES THEN TRANSFER THAT TO HERE TO BE ABLE TO CHECK FOR PIECES
    //TODO
        //advanced chess things
            //en passant
            //pawn promotion
            //castling
        //normal chess things
            //check and checkmate detection
            //for check:
                //for all opposing pieces check to see if any of their moves put a target on the king
                //if so make it so that the king is forced to move or checkmate is blocked
            //for checkmate:
                //if the king has no where to go and no pieces to block, end game



//NEEDED
export var pieceID;
//Stores an array of the classes of the last piece that was captured
export var prevCap = null;
//Indicates if there is a check on the board
export var check = false;
var playerTurn = true;
var playerColor = "white";
export var computerColor = "black";
//var checkmate = false

//-------------------Setters------------------------//
export function setPieceID(set) {
    pieceID = set;
}

export function setPlayerTurn(set) {
    playerTurn = set;
}

export function setPrevCap(set) {
    prevCap = set;
}

//-------------------helper Functions---------------//
export function displayPiece(cpuPiece) {
    //checks which class the piece has and performs the function to show the possible moves of that piece type
    if (cpuPiece.classList.contains("pawn")) {
        showPawnMoves(cpuPiece);
    }
    else if (cpuPiece.classList.contains("knight")) {
        showKnightMoves(cpuPiece);
    }
    else if (cpuPiece.classList.contains("rook")) {
        showRookMoves(cpuPiece);
    }
    else if (cpuPiece.classList.contains("bishop")) {
        showBishopMoves(cpuPiece);
    }
    else if (cpuPiece.classList.contains("queen")) {
        showQueenMoves(cpuPiece);
    }
    else if (cpuPiece.classList.contains("king")) {
        showKingMoves(cpuPiece);
    }
    else {
        console.log("Not Programmed/Broken");
    }
}

export function hasPiece(target) {
    //if the target isnt a jquery object make it one
    if (!target.jquery) {
        target = $(target);
    }
    //check if it has the white or black tag indicating a piece
    if (target.hasClass("white") || target.hasClass("black")) {
        return true;
    }
    return false;
}

export function movePiece(pieceID, target) {
    //if it is a jquery object then you need to add classes with addClass
    if (!target.jquery) {
        target = $(target);
    }
    //add piece to the target tile
    target.addClass(getPiece(pieceID));
    target.addClass(getColor(pieceID));

    //remove the piece on the previous square
    removePiece(pieceID);
}

//takes in the current position (pieceID) and the target square (target) and replaces and removes pieces
//to capture, move, and remove the pieces
export function capturePiece(pieceID, target) {
    //remove/capture piece from target tile
    removePiece(target);
    if (!target.jquery) {
        target = $(target);
    }
    //add piece to the target tile
    target.addClass(getPiece(pieceID));
    target.addClass(getColor(pieceID));
    //remove piece from the pieces previous tile
    removePiece(pieceID);
}

//takes in a tile object (DOM or jquery) and removes all related piece elements on the tile
export function removePiece(target) {
    //just removes all classes related to pieces: Piece type and color
    if (target.jquery) {
        target.removeClass('black white pawn knight rook bishop queen king');
    }
    else {
        target.classList.remove(
            'black', 'white',
            'pawn', 'knight', 'rook', 'bishop', 'queen', 'king'
        );
    }
}

export function removeAllHighlight() {
    //removes all move related highlighting
    $(".highlight").removeClass("highlight");
    $(".target").removeClass("target");
    $(".blocked").removeClass("blocked");
}

export function removeCheck() {
    $(".checked").removeClass("checked");
}

//Checks all enemy players moves to see if there are any that target the king
//returns true or false
export function checkCheck() {
    let currColor = ".black";
    let oppColor = ".white";
    if (playerTurn) {
        currColor = ".white";
        oppColor = ".black";
    }
    let pieceArray = $(oppColor).toArray();
    for (let i = 0; i < pieceArray.length; i++) {
        displayPiece(pieceArray[i]);
    }
    let king = $(".king" + currColor);
    if (king.hasClass("highlight") || king.hasClass("target")) {
        removeAllHighlight();
        king.addClass("checked");
        return true;
    }
    removeAllHighlight();
    return false;
}

//Takes in a list of classes or a jquery object, then returns the type of piece
export function getPiece(list) {
    if (list.jquery) {
        list = list.attr("class").split(/\s+/);
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== "b-tile" && list[i] !== "w-tile" &&
            list[i] !== "black" && list[i] !== "white" &&
            list[i] !== "target" && list[i] !== "highlight" && list[i] !== "checked"
            && isNaN(parseInt(list[i]))) {
            return list[i];
        }
    }
}

//Takes in a list or jquery object and returns the color of the piece
export function getColor(list) {
    if (list.jquery) {
        if (list.hasClass("white")) {
            return "white";
        }
        return "black";
    }
    if (list.includes("white")) {
        return "white";
    }
    return "black";
}

export function getNumber(list) {
    if (list.jquery) {
        list = list.attr("class").split(/\s+/);
    }
    for (let i = 0; i < list.length; i++) {
        if (!isNaN(parseInt(list[i]))) {
            return list[i];
        }
    }
}

export function copyPiece(to, from) {
    removePiece(to);
    to.addClass(getPiece(from));
    to.addClass(getColor(from));
    removePiece(from);
}

export function convertToFEN() {
    let result = "";
    let currentRow = 57;
    let temp;
    let space = 0;
    for (let i = currentRow; i > 0; i++) {
        for (let j = i; j < currentRow + 8; j++) {
            //if it has a piece
            if (hasPiece($("." + j))) {
                //get the type of piece
                switch (getPiece($("." + j))) {
                    case "pawn":
                        temp = "p";
                        break;
                    case "knight":
                        temp = "n";
                        break;
                    case "bishop":
                        temp = "b";
                        break;
                    case "queen":
                        temp = "q";
                        break;
                    case "king":
                        temp = "k";
                        break;
                    case "rook":
                        temp = "r";
                        break;
                    default:
                        console.log(j);
                        console.log(getPiece($("." + j)))
                        console.log("BROKEN IN convertToFEN()");
                        break;
                }
                //to upper if it is white
                if (getColor($("." + j)) === "white") {
                    temp = temp.toUpperCase();
                }
                result += temp;
                temp = "";
            }
            else {
                while (!hasPiece($("." + j)) && j < currentRow + 8) {
                    space++;
                    j++;
                }
                j--;
                result += space;
                space = 0;
            }
        }
        currentRow -= 8;
        i = currentRow - 1;
        if (currentRow > 0) {
            result += "/";
        }
    }
    return result;
}

/*
function checkMateCheck(color) {
    if (!checkCheck()) {
        return false;
    }
    removeAllHighlight();

    let allPieces = $("." + color).toArray();
    for (let i = 0; i < allPieces.length; i++) {
        //currently selected piece
        let currentPiece = allPieces[i];
        let currentTile = currentPiece.attr("id");
        let capTile = null;
        let capPiece = null;
        //display the moves
        displayPiece(currentPiece);
        //get list of the moves
        let moveSet = $(".highlight, .target").toArray();
        for (let j = 0; j < moveSet.length; j++) {
            //check every move 
            if (hasPiece(moveSet[j]) && moveSet[j].hasClass("target")) {
                capPiece = moveSet[j].attr("class");
                capTile = moveSet[j].attr("id");
                capturePiece(currentPiece, moveSet[j]);
            }
            else {
                movePiece(currentPiece, moveSet[j]);
            }
            if (!checkCheck()) {
                return false;
            }
            copyPiece($("." + currentTile), $(moveSet[j]));
            if (capPiece !== null) {
                //after the piece has been moved back
                $("." + capTile).addClass(capPiece);
                capPiece = null;
            }
        }
    }


    return true;
}
*/
//--------------Engine Componenet----------------//

class Engine extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.handleClick.bind(this);
        this.setBoard = this.boardSet.bind(this);

        this.state = {
            boardState: convertToFEN(this.props.children),
            cpuTurn: !playerTurn
        }
    }

    boardSet() {
        //removes all pieces
        removePiece($(".black"));
        removePiece($(".white"));

        //resets the game state
        playerTurn = true;
        removeAllHighlight();
        removeCheck();

        //set white on board
        $(".1").addClass("rook white");
        $(".2").addClass("knight white");
        $(".3").addClass("bishop white");
        $(".4").addClass("queen white");
        $(".5").addClass("king white");
        $(".6").addClass("bishop white");
        $(".7").addClass("knight white");
        $(".8").addClass("rook white");
        $(".9").addClass("pawn white");
        $(".10").addClass("pawn white");
        $(".11").addClass("pawn white");
        $(".12").addClass("pawn white");
        $(".13").addClass("pawn white");
        $(".14").addClass("pawn white");
        $(".15").addClass("pawn white");
        $(".16").addClass("pawn white");

        //set black on board
        $(".57").addClass("rook black");
        $(".58").addClass("knight black");
        $(".59").addClass("bishop black");
        $(".60").addClass("queen black");
        $(".61").addClass("king black");
        $(".62").addClass("bishop black");
        $(".63").addClass("knight black");
        $(".64").addClass("rook black");
        $(".49").addClass("pawn black");
        $(".50").addClass("pawn black");
        $(".51").addClass("pawn black");
        $(".52").addClass("pawn black");
        $(".53").addClass("pawn black");
        $(".54").addClass("pawn black");
        $(".55").addClass("pawn black");
        $(".56").addClass("pawn black");
        
        this.setState({
            cpuTurn: !playerTurn,
            boardState: convertToFEN(this.props.children)
        });
    }

    handleClick(event) {
        //makes sure the click was on the board
        if(!playerTurn){
            return;
        }
        if (event.target.classList.contains("b-tile") || event.target.classList.contains("w-tile")) {
            //if there is a piece on the clicked space and we arent trying to capture it
            if (hasPiece(event.target) && !event.target.classList.contains("target")) {
                //remove highlights from previous clicks if any
                removeAllHighlight();
                //get the type of the piece and display its possible moves if any
                pieceID = parseInt(getNumber($(event.target)))
                displayPiece(event.target);
            }
            else {
                //after highlighting, if selected piece is of the players color
                if ($("." + pieceID).hasClass(playerColor)) {
                    //if the clicked space is highlighted
                    if ($(event.target).hasClass("highlight")) {
                        //move the piece to the highlighted tile and end the players turn
                        movePiece($("." + pieceID), event.target);
                        playerTurn = false;
                    }
                    //if the clicked space is a target    
                    else if ($(event.target).hasClass("target")) {
                        //capture the piece and move it to the new tile and end the players turn
                        capturePiece($("." + pieceID), event.target);
                        playerTurn = false;
                    }
                }
                removeAllHighlight();
            }
        }
        if(!playerTurn){
            this.setState({
                cpuTurn: !playerTurn,
                boardState: convertToFEN(this.props.children)
            });
        }
    }

    //initializes the board once the engine component mounts to index.html
    componentDidMount() {
        this.boardSet();
    }

    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "1%"
            }}>
                <button onClick={this.setBoard}>Click To Reset</button>
                <div id="game-board" style={{
                    border: "5px solid black",
                    width: "fit-content",
                    backgroundColor: "black"
                }} onClick={this.clickHandler}>
                    {this.props.children}
                </div>
                <div id="game-board" style={{
                    border: "5px solid black",
                    width: "fit-content",
                    backgroundColor: "black"
                }}>
                    <ComputerTest key={this.state.boardState} computerTurn={this.state.cpuTurn} board={this.state.boardState} />
                </div>
            </div>
        );
    }
}

export { Engine };
import $ from 'jquery'
import { pieceID, prevID, prevCap, computerColor, hasPiece } from './Engine'
import { copyPiece, getPiece, getColor, displayPiece, movePiece, capturePiece, removePiece, removeAllHighlight, removeCheck, checkCheck} from './Engine'
import { setPieceID, setPrevID, setPlayerTurn, setPrevCap } from './Engine';
var cpuCheck = false;


//MAKE SURE TO CEHECK IF THE MOVE YOU JUST DID PUTS YOU IN CHECK

//move selection works,  movement works, capturing works
function computerTurn() {
    // pick move
    removeAllHighlight();
    removeCheck();
    //gets all the computer's pieces and puts them into an array
    let cpuPieces = $("." + computerColor).toArray();
    var cpuCapture = null;
    //picks a random one
    let ranNum = Math.floor(Math.random() * cpuPieces.length)
    //contains the jquery object of the selected piece
    let currentPiece = $(cpuPieces[ranNum]);
    //contains the ID of the tile of the selected piece
    let currentTile = currentPiece.attr("id");
    
    //displays all the moves
    displayPiece(currentPiece[0]);

    //contains array of all moves
    let allMoves = $(".highlight, .target").toArray();

    while(allMoves.length <= 0){
        removeAllHighlight();
        ranNum = Math.floor(Math.random() * cpuPieces.length);
        currentPiece = $(cpuPieces[ranNum]);
        displayPiece(currentPiece[0]);
        allMoves = $(".highlight, .target").toArray();
    }

    //pick one randomly
    ranNum = Math.floor(Math.random() * allMoves.length);
    //contains the jquery object of the tile to move to
    
    let currentMove = $(allMoves[ranNum]);

    if(hasPiece(currentMove) && currentMove.hasClass("target")){
        cpuCapture = currentMove.attr("class");
        capturePiece(currentPiece, currentMove);
    }
    else{
        movePiece(currentPiece, currentMove)
    }

    removeAllHighlight();
    //Testing

    //if still in check 
    if(checkCheck()){
        //put piece back
        copyPiece($("#" + currentTile), $(currentMove));
        //if there was a capture, put the piece back.
        if(cpuCapture !== null){
            $(currentMove).attr("class", cpuCapture);
        }
        cpuCapture = null;
        removeCheck();
        return;
    }
    removeCheck();
    setPlayerTurn(true);
    cpuCapture = null;
    console.log("END TURN")
}
//takes in two jquery objects

export { computerTurn }
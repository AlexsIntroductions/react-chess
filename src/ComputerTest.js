import React from "react";
import $ from 'jquery';
import { Board } from './Board';
import { pieceID, prevID, prevCap, computerColor, hasPiece } from './Engine'
import { copyPiece, getPiece, getColor, displayPiece, movePiece, capturePiece, removePiece, removeAllHighlight, removeCheck, checkCheck } from './Engine'
import { setPieceID, setPrevID, setPlayerTurn, setPrevCap } from './Engine';
import './ComputerTest.css'

//INPUT: FEN STRING
//TODO

function FENToBoard(fen) {
    let currentRow = 57;
    let currentTile = currentRow;
    let temp;
    for (let i = 0; i < fen.length; i++) {
        if (fen[i] == '/') {
            currentRow -= 8;
            currentTile = currentRow;
            continue;
        }
        switch (fen[i]) {
            case 'P':
                $("." + currentTile).eq(1).addClass("pawn white");
                break;
            case 'p':
                $("." + currentTile).eq(1).addClass("pawn black");
                break;
            case 'N':
                $("." + currentTile).eq(1).addClass("knight white");
                break;
            case 'n':
                $("." + currentTile).eq(1).addClass("knight black");
                break;
            case 'B':
                $("." + currentTile).eq(1).addClass("bishop white");
                break;
            case 'b':
                $("." + currentTile).eq(1).addClass("bishop black");
                break;
            case 'R':
                $("." + currentTile).eq(1).addClass("rook white");
                break;
            case 'r':
                $("." + currentTile).eq(1).addClass("rook black");
                break;
            case 'Q':
                $("." + currentTile).eq(1).addClass("queen white");
                break;
            case 'q':
                $("." + currentTile).eq(1).addClass("queen black");
                break;
            case 'K':
                $("." + currentTile).eq(1).addClass("king white");
                break;
            case 'k':
                $("." + currentTile).eq(1).addClass("king black");
                break;
            default:
                //in this case default is numbers
                currentTile += parseInt(fen[i]) - 1;
                break;
        }
        currentTile++;
    }
}

class ComputerTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.computerTurn,
            boardState: this.props.board
        }
    }

    componentDidMount() {
        if(this.state.start){
            FENToBoard(this.state.boardState);
            setPlayerTurn(!this.state.start);
        }
        else{
            console.log("Trouble")
        }
    }

    render() {
        return (
            <div className="rotate">
                {this.state.boardState}
                <Board />
            </div>
        )
    }
}

export { ComputerTest }

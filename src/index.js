import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'jquery'
import './index.css';
import { Board } from './Board'
import { Engine } from './Engine'

class App extends React.Component{
    render(){
        return(
            <Engine>
                <Board />
            </Engine>
        )
    }
}

const root = createRoot($('#root')[0]);
root.render(<App />);


//for all b-tiles and w-tiles, do an onclick

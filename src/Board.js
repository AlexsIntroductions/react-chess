import React from "react";

class Board extends React.Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    render(){
        return(
          <div ref={this.myRef}>
            <div className='t-row'>
              <div className='t-col'>
                <div className='w-tile 57'></div>
                <div className='b-tile 49'></div>
                <div className='w-tile 41'></div>
                <div className='b-tile 33'></div>
                <div className='w-tile 25'></div>
                <div className='b-tile 17'></div>
                <div className='w-tile 9'></div>
                <div className='b-tile 1'></div>
              </div>
              <div className='t-col'>
                <div className='b-tile 58'></div>
                <div className='w-tile 50'></div>
                <div className='b-tile 42'></div>
                <div className='w-tile 34'></div>
                <div className='b-tile 26'></div>
                <div className='w-tile 18'></div>
                <div className='b-tile 10'></div>
                <div className='w-tile 2'></div>
              </div>
              <div className='t-col'>
                <div className='w-tile 59'></div>
                <div className='b-tile 51'></div>
                <div className='w-tile 43'></div>
                <div className='b-tile 35'></div>
                <div className='w-tile 27'></div>
                <div className='b-tile 19'></div>
                <div className='w-tile 11'></div>
                <div className='b-tile 3'></div>
              </div>
              <div className='t-col'>
                <div className='b-tile 60'></div>
                <div className='w-tile 52'></div>
                <div className='b-tile 44'></div>
                <div className='w-tile 36'></div>
                <div className='b-tile 28'></div>
                <div className='w-tile 20'></div>
                <div className='b-tile 12'></div>
                <div className='w-tile 4'></div>
              </div>
              <div className='t-col'>
                <div className='w-tile 61'></div>
                <div className='b-tile 53'></div>
                <div className='w-tile 45'></div>
                <div className='b-tile 37'></div>
                <div className='w-tile 29'></div>
                <div className='b-tile 21'></div>
                <div className='w-tile 13'></div>
                <div className='b-tile 5'></div>
              </div>
              <div className='t-col'>
                <div className='b-tile 62'></div>
                <div className='w-tile 54'></div>
                <div className='b-tile 46'></div>
                <div className='w-tile 38'></div>
                <div className='b-tile 30'></div>
                <div className='w-tile 22'></div>
                <div className='b-tile 14'></div>
                <div className='w-tile 6'></div>
              </div>
              <div className='t-col'>
                <div className='w-tile 63'></div>
                <div className='b-tile 55'></div>
                <div className='w-tile 47'></div>
                <div className='b-tile 39'></div>
                <div className='w-tile 31'></div>
                <div className='b-tile 23'></div>
                <div className='w-tile 15'></div>
                <div className='b-tile 7'></div>
              </div>
              <div className='t-col'>
                <div className='b-tile 64'></div>
                <div className='w-tile 56'></div>
                <div className='b-tile 48'></div>
                <div className='w-tile 40'></div>
                <div className='b-tile 32'></div>
                <div className='w-tile 24'></div>
                <div className='b-tile 16'></div>
                <div className='w-tile 8'></div>
              </div>
            </div>
          </div>
        )
    }
}
export { Board };
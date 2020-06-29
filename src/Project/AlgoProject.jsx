import React from 'react';
import './AlgoProject.css';
import { getMergeSortAnimations } from '../Algorithms/Algorithms.js';



// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#49BC85';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#DA5F44';
export default class AlgoProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }
    // when the app loads for the first time we call the reset array method
    componentDidMount() {
        this.resetArray(); //This is the method we call when we click the create array button 
    }
    // this method creates an array, interates in a for loop and generates(pushes) a random value between 10 and 1000
    // then resets the state to have this new array
    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500)); //starting at 5 to make sure that you can actually see a low value in react
        }
        this.setState({ array });//resets the state to have this array
    }

    
    mergeSort() {      
        const animations = getMergeSortAnimations(this.state.array);// Get animations by calling our merge sort method on our array
        for (let i = 0; i < animations.length; i++) {//Iterate through all of the animations
            const arrayBars = document.getElementsByClassName('array-bar');//grab the array bars that are currently in the dom, the dom is the 
            // document object model, which is the programming interface for HTML and XML documents, it provides a way for javascript to interact
            // with every single node in an HTML document to manipulate it. It allows programming languages to connect to the page.
            const isColorChange = i % 3 !== 2;//Check to see if we're dealing with a color change, it happens for the first two values of every 3 animations, if the reminder is 2 then we 
            //  we know we;re dealing with the overriding animation or not 
            if (isColorChange) {//here we're changing the color of the comparison bars that are being compared during the sorting algorithm
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; 
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {//here we're giving the bar that we're overriding the new height, this is where the overriding is occuring
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    //quickSort() {

    //}
    // 
    render() {
        const { array } = this.state;

        return (
            //Here we organize was gets displayed to the browser, first we display the header then below that we'll show the buttons
            //and then below that we'll place the array-bar function that we created. Their order within this array container determines
            //their positon within the array.
            <div className="array-container">
                <h2> Gregor Zeller's Cool Sorting Project! </h2>
                <div class="btn-group">
                    {/* 
                     * Two buttons below with on click event handler that calls my two functions, reset array and merge sorts, when they are 
                     * clicked within the browser
                     */}
                    <button onClick={() => this.resetArray()}>Generate New Array</button> 
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>

                </div>
                
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR, // Background color is a constant that can be easily changed above
                            height: `${value}px`, //Literally made the height of the bars the value of the array that was passed in
                        }}></div>
                ))}
                
               
                    
        
            </div>
        );
    }
}

//method that I used about on how to randomize a number in javascript
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




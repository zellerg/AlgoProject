export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
// This is a helper method that is called to do the seperation with recursion, later the do merge function that we created below will be called 
// below after the two merge sort helper methods are called, the merge sort helper is basically sorting each of the two sides of the array.
// The Merge sort helper takes in a few parameters; the actual array being sorted, the start and end indexes of the array, the auxillary array
// which will be used later when doing the actual merge and then animations to connect the algorithm with the animation functionality of react
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);//We find the middle of the array so that we can split it into two sections below
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);//this would beging sorting the left portion, using the middle index above, basically creating two 'arrays'
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);//this would do the same but with right portion
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);//here we actually begin the merging once we've sorted the values
    //we keep recursively calling this until we hit the above if statement and there is only one value within the 'array'
}
//This is our actual merging method that takes the same parameters as above
function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}


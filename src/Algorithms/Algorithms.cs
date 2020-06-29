using System;
using System.CodeDom.Compiler;
using System.Diagnostics;
using Bridge.Html5;
using Bridge.React;

//namespace AlgorithmAnimations
//{

//    public static void Main(int[] args)
//    {
//        MergeSort(args);
//    }
//    static void MergeSort(int[] arr)
//    {
//        int[] animations = new int[arr.Length];
//        int[] temp = new int[arr.Length]; //need to create a temporary array to be used later for sorting the original array
//                                          //int temp = arr.slice();
//        MergeSortHelper(arr, 0, arr.Length - 1, temp, animations);
//        //return animations;
//    }
//    static void MergeSortHelper(int[] arr, int startIdx, int endIdx, int[] temp, int[] animations)
//    {
//        if (startIdx < endIdx) // we'll only continue sorting IF you have more than 1 value in the index
//        {
//            int middle = (startIdx + endIdx) / 2; // here we're finding the position of the middle element of the group of numbers we're looking at
//                                                  // sort the first half of the breakup
//            MergeSortHelper(arr, startIdx, middle, temp, animations);
//            // sort the second half
//            MergeSortHelper(arr, middle, endIdx, temp, animations);
//            //merge the two halves
//            MergeSubArrays(arr, startIdx, middle, middle + 1, endIdx, temp, animations);
//        }
//    }
//    static void MergeSubArrays(int[] arr, int startFirstHalf, int endFirstHalf, int startSecondHalf, int endSecondHalf, int[] temp, int[] animations)
//    {
//        int i = startFirstHalf; //pointer to be used to iterate through first half of the array
//        int j = startSecondHalf; //pointer used to iterate through the second half of the array
//        int k = startFirstHalf; //pointer used to iterate through the temp array/merged portion

//        while (i <= endFirstHalf && j <= endSecondHalf) // while we have values in both subarrays
//        {
//            animations.Push(i, j);

//            animations.Push(i, j);

//            if (arr[i] < arr[j])
//            {
//                animations.Push(k, temp[i]);
//                temp[k] = arr[i];
//                i++;
//                k++;
//            }
//            else
//            {
//                animations.Push(k, temp[j]);
//                temp[k] = arr[j];
//                i++;
//                k++;
//            }
//        }
//        //We'll do this if we still have values in i (first sub array)
//        while (i <= endFirstHalf)
//        {
//            animations.Push(i, j);

//            animations.Push(i, j);

//            animations.Push(k, temp[i]);
//            temp[k] = arr[i];
//            i++;
//            k++;
//        }
//        //We'll do this if we still have values in j subarray
//        while (j <= endSecondHalf)
//        {
//            animations.Push(i, j);

//            animations.Push(i, j);

//            animations.Push(k, temp[j]);
//            temp[k] = arr[j];
//            j++;
//            k++;
//        }
//        //we're all done merging into the temp array, now lets copy all the values back into the original array
//        for (k = startFirstHalf; k <= endSecondHalf; k++)
//        {
//            arr[k] = temp[k];
//        }
//    }
//}
// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System.Collections;

public class MyAlgorithms
{
    int[] getMergeSortAnimations(int[] array)
    {
        int[] animations = new int[array.Length];
      
        int[] auxiliaryArray = new int[array.Length];
        mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
        return animations;
    }

    void mergeSortHelper(
      int[] mainArray,
      int startIdx,
      int endIdx,
      int[] auxiliaryArray,
      int[] animations
    )
    {
        if (startIdx <= endIdx) {
            int middleIdx = (startIdx + endIdx) / 2;
            mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
            mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
            doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
        }
    }

    void doMerge(
      int[] mainArray,
      int startIdx,
      int middleIdx,
      int endIdx,
      int[] auxiliaryArray,
      int[] animations
    )
    {
        int k = startIdx;
        int i = startIdx;
        int j = middleIdx + 1;
        while (i <= middleIdx && j <= endIdx)
        {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push(i, j);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push(i, j);
            if (auxiliaryArray[i] <= auxiliaryArray[j])
            {
                // We overwrite the value at index k in the original array with the
                // value at index i in the auxiliary array.
                animations.push(k, auxiliaryArray[i]);
                mainArray[k++] = auxiliaryArray[i++];
            }
            else
            {
                // We overwrite the value at index k in the original array with the
                // value at index j in the auxiliary array.
                animations.push(k, auxiliaryArray[j]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
        while (i <= middleIdx)
        {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push(i, i);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push(i, i);
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push(k, auxiliaryArray[i]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx)
        {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push(j, j);
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            animations.push(j, j);
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push(k, auxiliaryArray[j]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    
}
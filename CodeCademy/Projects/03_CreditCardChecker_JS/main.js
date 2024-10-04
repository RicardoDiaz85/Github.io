// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4] // invalid
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9] 
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3] // invalid
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3] // invalid
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

//An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5,invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

/*
STEP 2.
- Pay attention to ARRAY STRUCTURES "valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]" and each CC represented as an array of digits.
- Pay attention to ARRAY CATEGORIES: valid, invalid and mystery.MYSTERY will be validated later.
- CONST BATCH will be my main source for testing later as I iterate to validate multiple CC# at the same time. 
- Pay attention to the length of the arrays. Most of them are 16 long, others 15 long and one 19 long. Account for
    this when writting functions.
- DATA TYPE: Ensure that arrays are numbers (no strings or mixed types).

STEP 3. 
- create a copy of the array to avoid mutating the original array.
- const newArr = [...arr]; SPREAD OPERATOR '...' takes the elements of an array and "spreads" them into a new array (a copy).
- const newArr = arr.slice(); Also creates a shallow copy, however [...arr] is more concise and easier to read.
*/

const validateCred = (arr) => { 
    // Create a copy of the array to avoid mutating the original array
    const newArr = [...arr]; // const newArr = arr.slice() does the same. 

    // Start from the second-to-last digit and iterate backward
    for (let i = newArr.length - 2; i >= 0; i -= 2) { /* index starts at arr.length (16 items = index 0-15) therefore 
        newArr.length -1 would start on the last mumber index 15. -2 starts at index lentgh 16 - 2 = index 14.
        i -= 2 tells it to iterate every other number. i-- would tell it to iterate every number to the left.
        */
        newArr[i] *= 2; //multiply each iteration of the loop by 2.

        if (newArr[i] > 9) {
            newArr[i] -=9;
        };
    };

    /* After adjusting for the doubled values, sum all the digits 
        - The reduce() method is used to reduce an array into a single value by executing a provided function for each element. 
            It processes the array from left to right, applying the function cumulatively on each element.
        - Syntax: array.reduce(callback(accumulator, currentValue), initialValue) */
    const digitsSum =  newArr.reduce((acc, curr) => acc + curr, 0);
    /* callback function -> (accumulator, current) { accumulator + current, starting at 0) so 0 + next digit in newArr
    acc - accumulates the result as reduce() iterates through the array
    curr - current element being processed in the array.
    Example: newArr = [4, 5, 6] --> acc(0) + curr(4) = 4. Now acc(4) + curr(5) = 9. Now acc(9) + curr(6) = 15 */

    // If the digits sum modulo 10 is 0, return true (valid), else false (invalid).
    return digitsSum % 10 === 0; // use same as (===) returns boolean true when condition is met. 
};

// Testing functions with valid, invalid.
//console.log(validateCred(valid1)); // should return true - yes!
//console.log(validateCred(invalid1)); // should return false - yes!


/* STEP 4. The role of findInvalidCards() is:
1. to check through the nested array for which numbers are invalid, 
2. and RETURN another NESTED ARRAY of invalid cards.*/
const findInvalidCards = (nestedArr) => {
    const invalidCards = []; // Array to hold invalid cards

    // loop through each credit card in the nested array
    for (let i = 0; i < nestedArr.length; i++) {
        const currentCard = nestedArr[i]; // Current credit card array

        // check if the current card is invalid
        if (validateCred(currentCard) === false) { //if the currentCard in the loop returns false...
            // (!validateCred(curentCard)) <--- get more familiar with the "logical NOT" operator.
            invalidCards.push(currentCard); // push it to the array invalidCards in line 80
        };
    }; // make sure the return is outside the loop formula to allow it to finish the loop.

    return invalidCards; // return the array of invalid credit cards
};

// Testing functions with new batch array. Comment out batch on line 23 to test with the batch below.
//const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5];
//console.log(findInvalidCards(batch)); // should return all the invalid credit cards arrays.
/* works correctly, it only returns the strings for the invalid cards.
[
  [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5],
  [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3],
  [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4],
  [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7,  7, 9, 3, 5],
  [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]
];
*/

// IMPORTANT STEP. Call the function and store the value
const invalidCards = findInvalidCards(batch); // invalidCards is now in the global scope!

console.log("These are all the invalid Credit Cards:");
console.log(invalidCards);


/* STEP 5. 
- identify the credit card companies that have possibly issued these faulty numbers.
- should NOT return duplicates. i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.
- 3-Amex (American Express), 4-Visa, 5-Mastercard, 6-Discover, other numbers-"Company not found"
*/

const idInvalidCardCompanies = (InvalidCards) => { // InvalidCards holds invalid cards array.
    const companies = []; // array to store unique company names. 

    //loop through each invalid card (each array of numbers inside invalidCard)
    for (let i = 0; i < InvalidCards.length; i++) {
        const firstDigit = invalidCards[i][0]; // get the first digit located at index 0 of each iteration
    

        switch (firstDigit)  {
            case 3:
                if (!companies.includes("Amex")) { // If companies does not include "Amex"
                    companies.push("Amex");// push 'Amex' into the companies array. To avoid duplicates.
                }
                break;
            case 4: 
                if (!companies.includes("Visa")) {
                    companies.push("Visa");
                }
                break;
            case 5:
                if (!companies.includes("Mastercard")) {
                    companies.push("Mastercard");
                }
                break;
            case 6:
                if (!companies.includes("Discover")) {
                    companies.push("Discover");
                }
                break;
            default:
                console.log("Company not found");
        
            
        };
    
    };
    
    return companies;

};

// IMPORTANT STEP. Call the function and store the value
const invalidCardCompanies = idInvalidCardCompanies(invalidCards); // invalidCards is now in the global scope!
// Call the function and pass invalidCards as the parameter


console.log("These are the Credit Card Companies that mailed out cards with invalid numbers:");
console.log(invalidCardCompanies); // ['Visa', 'Mastercard', 'Amex', ...]

// Task 1: Check if adult
let age = 20;
let isAdult = age >= 18;

// Task 2: Arithmetic operations
let x = 100, y = 50;
let addition = x + y;
let multiplication = x * y;
let modulus = x % y;

// Task 3: Even/Odd check
let n = 8;
let result = n % 2 === 0 ? "Even" : "Odd";

// Task 4: Loop to create array
let numbers = [];
for (let i = 1; i <= 5; i++) {
  numbers.push(i);
}

// Task 5: Square function
function square(num) {
  return num * num;
}

// Log all results
console.log("isAdult:", isAdult);
console.log("Addition:", addition, "Multiplication:", multiplication, "Modulus:", modulus);
console.log("Even/Odd:", result);
console.log("Numbers Array:", numbers);
console.log("Square of 5:", square(5));
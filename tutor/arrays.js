// ============================
// Activity 1 - Map
// ============================
function runMap() {
  const steps = ["one", "two", "three"];
  function listTemplate(step) {
    return `<li>${step}</li>`;
  }
  const stepsHtml = steps.map(listTemplate);
  document.querySelector("#myList").innerHTML = stepsHtml.join("");
}

// ============================
// Activity 2 & 3 - Map + Reduce
// ============================
function runGPA() {
  const grades = ["A", "B", "A", "B", "C"];

  function convertGradeToPoints(grade) {
    if (grade === "A") return 4;
    else if (grade === "B") return 3;
    else if (grade === "C") return 2;
    else if (grade === "D") return 1;
    else return 0;
  }

  const gpaPoints = grades.map(convertGradeToPoints);
  const totalPoints = gpaPoints.reduce((total, num) => total + num, 0);
  const gpa = totalPoints / gpaPoints.length;

  document.querySelector("#gradesOutput").textContent =
    `Grades: ${grades.join(", ")} → GPA Points: [${gpaPoints.join(", ")}] → GPA: ${gpa.toFixed(2)}`;
}

// ============================
// Activity 4 - Filter
// ============================
function runFilter() {
  const fruits = ["watermelon", "peach", "apple", "tomato", "grape"];
  const shortFruits = fruits.filter(fruit => fruit.length < 6);

  document.querySelector("#filterOutput").textContent =
    `Short fruits (less than 6 chars): ${shortFruits.join(", ")}`;
}

// ============================
// Activity 5 - indexOf
// ============================
function runIndexOf() {
  const myArray = [12, 34, 21, 54];
  const luckyNumber = 21;
  const luckyIndex = myArray.indexOf(luckyNumber);

  if (luckyIndex !== -1) {
    document.querySelector("#luckyOutput").textContent =
      `Lucky number ${luckyNumber} found at index ${luckyIndex}`;
  } else {
    document.querySelector("#luckyOutput").textContent =
      `Lucky number ${luckyNumber} not found in array.`;
  }
}

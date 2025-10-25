(function () {
  'use strict';

  // Read the raw value from the input, split into an array, trim and uppercase.
  // Returns an array of non-empty grade tokens, e.g. ["A","B","C"]
  function getGrades(inputSelector) {
    const raw = document.querySelector(inputSelector)?.value ?? '';
    if (!raw.trim()) return [];
    return raw
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s !== '');
  }

  // Convert a single letter grade into GPA points.
  // Returns a number for valid grades or null for invalid grades.
  function lookupGrade(grade) {
    switch (grade) {
      case 'A':
        return 4;
      case 'B':
        return 3;
      case 'C':
        return 2;
      case 'D':
        return 1;
      case 'F':
        return 0;
      default:
        return null; // invalid/unrecognized grade
    }
  }

  // Calculate the GPA from an array of letter grades.
  // Ignores any invalid grades. Returns null if there are no valid grades.
  function calculateGpa(grades) {
    const points = grades.map((g) => lookupGrade(g)).filter((p) => p !== null);
    if (points.length === 0) return null;
    const total = points.reduce((acc, n) => acc + n, 0);
    const avg = total / points.length;
    // Return numeric value rounded to 2 decimals
    return Number(avg.toFixed(2));
  }

  // Render the GPA or a helpful message into the page element identified by selector.
  function outputGpa(gpa, selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    if (gpa === null) {
      el.innerText = 'No valid grades entered. Use letters A, B, C, D or F.';
      el.classList.add('error');
    } else {
      el.innerText = `GPA: ${gpa.toFixed(2)}`;
      el.classList.remove('error');
    }
  }

  // Click handler wired to the Generate button
  function clickHandler() {
    const grades = getGrades('#grades');
    const gpa = calculateGpa(grades);
    outputGpa(gpa, '#output');
  }

  // Attach the event listener when the DOM is ready.
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('#submitButton');
    if (btn) btn.addEventListener('click', clickHandler);

    // Expose helpers for debugging in the console (optional)
    window._gpa = {
      getGrades: getGrades,
      lookupGrade: lookupGrade,
      calculateGpa: calculateGpa,
      outputGpa: outputGpa,
    };
  });
})();

// GPA calculator helpers with +/- grade support
(function () {
  'use strict';

  // Configuration: whether to treat A+ as 4.3 (true) or cap at 4.0 (false).
  // Different schools use different conventions; toggle to match your instructor.
  const USE_A_PLUS_4_3 = false;

  // Read the raw value from the input, split into an array, trim and uppercase.
  // Returns an array of non-empty grade tokens, e.g. ["A","B","C+"]
  function getGrades(inputSelector) {
    const raw = document.querySelector(inputSelector)?.value ?? '';
    if (!raw.trim()) return [];
    return raw
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s !== '');
  }

  // Convert a single letter grade (optionally with + or -) into GPA points.
  // Accepts: A, A-, A+, B, B-, B+, ... F
  // Returns a number for valid grades or null for invalid/unrecognized tokens.
  function lookupGrade(token) {
    if (typeof token !== 'string') return null;
    const trimmed = token.trim().toUpperCase();

    // Accept patterns like A, A+, A- (for F we ignore +/-, treat as 0)
    const m = trimmed.match(/^([A-DF])([+-])?$/);
    if (!m) return null;
    const letter = m[1];
    const sign = m[2] || '';

    // Base mapping (without +/-)
    const base = {
      A: 4.0,
      B: 3.0,
      C: 2.0,
      D: 1.0,
      F: 0.0,
    }[letter];

    if (letter === 'F') return 0.0; // F+ or F- treated as 0.0

    // +/- adjustments (common US scale)
    const adjustments = {
      '+': 0.3,
      '-': -0.3,
      '': 0.0,
    };

    let pts = base + (adjustments[sign] || 0);

    // Special-case A+ depending on configuration
    if (letter === 'A' && sign === '+') {
      pts = USE_A_PLUS_4_3 ? 4.3 : 4.0;
    }

    // Guard: don't exceed 4.3 or drop below 0
    if (pts > 4.3) pts = 4.3;
    if (pts < 0) pts = 0;
    // Round to two decimals for consistency
    return Number(pts.toFixed(2));
  }

  // Calculate GPA and also return counts of valid/invalid tokens.
  // Returns an object: { gpa: number|null, validCount, invalidCount }
  function calculateGpa(grades) {
    const pts = [];
    let invalid = 0;
    grades.forEach((g) => {
      const p = lookupGrade(g);
      if (p === null) invalid += 1;
      else pts.push(p);
    });
    if (pts.length === 0) {
      return { gpa: null, validCount: 0, invalidCount: invalid };
    }
    const total = pts.reduce((acc, n) => acc + n, 0);
    const avg = total / pts.length;
    return { gpa: Number(avg.toFixed(2)), validCount: pts.length, invalidCount: invalid };
  }

  // Render the GPA or a helpful message into the page element identified by selector.
  // Accepts the result object returned by calculateGpa.
  function outputGpa(result, selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    if (!result || result.gpa === null) {
      el.innerText = 'No valid grades entered. Use letters A, B, C, D or F (optional + or -).';
      el.classList.add('error');
      return;
    }
    const parts = [`GPA: ${result.gpa.toFixed(2)}`];
    parts.push(`based on ${result.validCount} grade${result.validCount === 1 ? '' : 's'}`);
    if (result.invalidCount > 0) {
      parts.push(`(${result.invalidCount} invalid token${result.invalidCount === 1 ? '' : 's'} ignored)`);
    }
    el.innerText = parts.join(' ');
    el.classList.remove('error');
  }

  // Click handler wired to the Generate button
  function clickHandler() {
    const grades = getGrades('#grades');
    const result = calculateGpa(grades);
    outputGpa(result, '#output');
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
      // Expose config so you can toggle behavior in the console
      _config: { USE_A_PLUS_4_3: USE_A_PLUS_4_3 },
    };
  });
})();

// register.js
import { participantTemplate, successTemplate } from './templates.js';

let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addParticipant");
  const form = document.getElementById("registrationForm");
  const summary = document.getElementById("summary");

  // Add Participant button
  addBtn.addEventListener("click", () => {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addBtn.insertAdjacentHTML("beforebegin", newParticipantHTML);
  });

  // Submit Form event
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const total = totalFees();
    const adultName = document.getElementById("adultName").value;

    // Hide form and show success message
    form.classList.add("hide");
    summary.innerHTML = successTemplate({
      name: adultName,
      participants: participantCount,
      total: total
    });
    summary.classList.remove("hide");
  });
});

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  const total = feeElements.reduce((sum, feeInput) => {
    return sum + Number(feeInput.value || 0);
  }, 0);
  return total;
}

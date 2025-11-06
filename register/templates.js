// templates.js

export function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <h3>Participant ${count}</h3>

    <label for="name${count}">Name</label>
    <input id="name${count}" name="name${count}" type="text" required>

    <label for="age${count}">Age</label>
    <input id="age${count}" name="age${count}" type="number" min="0" required>

    <label for="fee${count}">Fee ($)</label>
    <input id="fee${count}" name="fee${count}" type="number" min="0" required>
  </section>`;
}

export function successTemplate(info) {
  return `
    <h2>Thank you ${info.name} for registering!</h2>
    <p>You have registered ${info.participants} participant(s).</p>
    <p>Total fees: <strong>$${info.total}</strong></p>
  `;
}

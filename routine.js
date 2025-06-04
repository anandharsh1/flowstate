const routineList = document.getElementById('routineList');

function addRoutine() {
  const nameInput = document.getElementById('routineInput');
  const timeInput = document.getElementById('routineTime');

  const routineName = nameInput.value.trim();
  const duration = parseInt(timeInput.value);

  if (!routineName || isNaN(duration) || duration <= 0) {
    alert('Please enter a valid routine name and duration.');
    return;
  }

  const li = document.createElement('li');
  li.className = 'p-4 bg-green-50 rounded shadow flex justify-between items-center';

  const text = document.createElement('span');
  text.textContent = `${routineName} — ${duration} seconds`;

  const button = document.createElement('button');
  button.textContent = 'Start';
  button.className = 'ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600';

  let timerId = null;
  let timeLeft = duration;

  button.onclick = () => {
    if (button.textContent === 'Start') {
      button.textContent = 'Pause';
      timerId = setInterval(() => {
        timeLeft--;
        text.textContent = `${routineName} — ${timeLeft} seconds left`;

        if (timeLeft <= 0) {
          clearInterval(timerId);
          button.textContent = 'Start';
          text.textContent = `${routineName} — Completed! 🎉`;
        }
      }, 1000);
    } else {
      button.textContent = 'Start';
      clearInterval(timerId);
    }
  };

  li.appendChild(text);
  li.appendChild(button);
  routineList.appendChild(li);

  // Reset inputs
  nameInput.value = '';
  timeInput.value = '';
}

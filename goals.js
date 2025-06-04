const goalInput = document.getElementById('goalInput');
const addGoalBtn = document.getElementById('addGoalBtn');
const goalList = document.getElementById('goalList');
let goalsChart;

let goals = JSON.parse(localStorage.getItem('weeklyGoals')) || [];

function saveGoals() {
  localStorage.setItem('weeklyGoals', JSON.stringify(goals));
}

function renderGoals() {
  goalList.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.className = 'p-4 bg-purple-50 rounded shadow space-y-2';

    const label = document.createElement('label');
    label.className = 'flex items-center space-x-3';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = goal.completed;
    checkbox.className = 'w-5 h-5 text-purple-600';
    checkbox.onchange = () => {
      goals[index].completed = checkbox.checked;
      saveGoals();
      renderGoals();
      updateChart();
    };

    const span = document.createElement('span');
    span.textContent = goal.text;
    span.className = checkbox.checked ? 'line-through text-gray-400' : 'text-gray-800 font-medium';

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);

    const progressBar = document.createElement('div');
    progressBar.className = 'w-full bg-purple-200 rounded h-3 overflow-hidden mt-2';

    const progress = document.createElement('div');
    progress.className = 'bg-purple-600 h-full transition-all duration-500';
    progress.style.width = goal.completed ? '100%' : '0%';

    progressBar.appendChild(progress);
    li.appendChild(progressBar);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'mt-2 text-red-600 hover:underline';
    delBtn.onclick = () => {
      goals.splice(index, 1);
      saveGoals();
      renderGoals();
      updateChart();
    };

    li.appendChild(delBtn);
    goalList.appendChild(li);
  });
}

addGoalBtn.onclick = () => {
  const text = goalInput.value.trim();
  if (!text) {
    alert('Please enter a goal!');
    return;
  }
  goals.push({ text, completed: false });
  saveGoals();
  renderGoals();
  updateChart();
  goalInput.value = '';
};

function updateChart() {
  const completed = goals.filter(g => g.completed).length;
  const remaining = goals.length - completed;

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      label: 'Goals Progress',
      data: [completed, remaining],
      backgroundColor: ['#7C3AED', '#D8B4FE'],
      borderColor: '#6B21A8',
      borderWidth: 1,
      hoverOffset: 10,
      borderRadius: 6
    }]
  };

  if (goalsChart) {
    goalsChart.data = data;
    goalsChart.update();
  } else {
    const ctx = document.getElementById('goalsChart').getContext('2d');
    goalsChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 14 }
            }
          }
        }
      }
    });
  }
}

// Initialize
renderGoals();
updateChart();

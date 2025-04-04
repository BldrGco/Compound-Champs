let players = {
    Fraser: { earnings: 5.00, tasks: 0, fines: 0.00 },
    Eli: { earnings: 5.00, tasks: 0, fines: 0.00 },
    Myla: { earnings: 5.00, tasks: 0, fines: 0.00 }
};
let currentPlayer = 'Fraser';

const chart = new Chart(document.getElementById('earnings-chart'), {
    type: 'bar',
    data: {
        labels: ['Fraser', 'Eli', 'Myla'],
        datasets: [{
            label: 'Earnings (£)',
            data: [players.Fraser.earnings, players.Eli.earnings, players.Myla.earnings],
            backgroundColor: ['#32cd32', '#4682b4', '#ff4500']
        }]
    },
    options: {
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
    }
});

// Task-specific emojis/icons
const taskEmojis = {
    'Making bed': '🛏️',
    'Tidying room': '🧹',
    'Walking dog': '🐶',
    'Learning new skills': '📚',
    'Reading for 5 mins': '📖',
    'Washing dishes': '🍽️',
    'Drying dishes': '🧼',
    'Tidying downstairs': '🏠',
    'Hoovering downstairs': '🧹',
    'Garden tidy': '🌳',
    'Car wash (outside)': '🚗',
    'Car wash (inside)': '🚘',
    'Revision books (30 mins)': '✏️',
    'Taking out rubbish': '🗑️',
    'Helping with dinner': '🍳',
    'Helping with laundry': '👕',
    'School positive': '🏆'
};

window.onload = function() {
    updatePlayerControls();
    updateAll();
};

function updatePlayerControls() {
    currentPlayer = document.getElementById('player-dropdown').value;
    const controls = document.getElementById('player-controls');
    controls.innerHTML = '';

    if (currentPlayer === 'Parent') {
        controls.innerHTML = `
            <button class="fine-button" onclick="addFine('Fraser', 0.50)">Fine Fraser £0.50</button>
            <button class="fine-button" onclick="addFine('Eli', 0.50)">Fine Eli £0.50</button>
            <button class="fine-button" onclick="addFine('Myla', 0.50)">Fine Myla £0.50</button>
            <button class="fine-button" onclick="addFine('Fraser', 1.00)">Fine Fraser £1.00</button>
            <button class="fine-button" onclick="addFine('Eli', 1.00)">Fine Eli £1.00</button>
            <button class="fine-button" onclick="addFine('Myla', 1.00)">Fine Myla £1.00</button>
            <button class="parent-button" onclick="adjustEarnings('Fraser', -1)">Remove £1 from Fraser</button>
            <button class="parent-button" onclick="adjustEarnings('Eli', -1)">Remove £1 from Eli</button>
            <button class="parent-button" onclick="adjustEarnings('Myla', -1)">Remove £1 from Myla</button>
            <button class="parent-button" onclick="resetGame()">Reset Game</button>
        `;
    } else {
        controls.innerHTML = `
            <button class="task-button" onclick="addEarnings('Making bed', 0.50, this)">Making Bed - £0.50</button>
            <button class="task-button" onclick="addEarnings('Tidying room', 0.50, this)">Tidying Room - £0.50</button>
            <button class="task-button" onclick="addEarnings('Walking dog', 1.00, this)">Walking Dog - £1.00</button>
            <button class="task-button" onclick="addEarnings('Learning new skills', 1.50, this)">Learning Skills - £1.50</button>
            <button class="task-button" onclick="addEarnings('Reading for 5 mins', 0.50, this)">Reading 5 mins - £0.50</button>
            <button class="task-button" onclick="addEarnings('Washing dishes', 0.50, this)">Washing Dishes - £0.50</button>
            <button class="task-button" onclick="addEarnings('Drying dishes', 0.50, this)">Drying Dishes - £0.50</button>
            <button class="task-button" onclick="addEarnings('Tidying downstairs', 1.00, this)">Tidying Downstairs - £1.00</button>
            <button class="task-button" onclick="addEarnings('Hoovering downstairs', 1.00, this)">Hoovering - £1.00</button>
            <button class="task-button" onclick="addEarnings('Garden tidy', 1.00, this)">Garden Tidy - £1.00</button>
            <button class="task-button" onclick="addEarnings('Car wash (outside)', 1.00, this)">Car Wash (Outside) - £1.00</button>
            <button class="task-button" onclick="addEarnings('Car wash (inside)', 1.50, this)">Car Wash (Inside) - £1.50</button>
            <button class="task-button" onclick="addEarnings('Revision books (30 mins)', 1.00, this)">Revision (30 mins) - £1.00</button>
            <button class="task-button" onclick="addEarnings('Taking out rubbish', 0.50, this)">Rubbish - £0.50</button>
            <button class="task-button" onclick="addEarnings('Helping with dinner', 0.50, this)">Dinner Help - £0.50</button>
            <button class="task-button" onclick="addEarnings('Helping with laundry', 0.50, this)">Laundry Help - £0.50</button>
            <button class="task-button" onclick="addEarnings('School positive', 2.00, this)">School Positive - £2.00</button>
        `;
    }
}

function addEarnings(task, amount, button) {
    players[currentPlayer].earnings += amount;
    players[currentPlayer].tasks += 1;
    showEmoji(task, button);
    updateAll();
}

function addFine(player, amount) {
    players[player].earnings -= amount;
    players[player].fines += amount;
    if (players[player].earnings < 0) players[player].earnings = 0;
    updateAll();
}

function adjustEarnings(player, amount) {
    players[player].earnings += amount;
    if (players[player].earnings < 0) players[player].earnings = 0;
    updateAll();
}

function showEmoji(task, button) {
    const emoji = taskEmojis[task] || '⭐'; // Default to star if no emoji
    const span = document.createElement('span');
    span.textContent = emoji;
    span.className = 'emoji';
    const rect = button.getBoundingClientRect();
    span.style.left = `${rect.left + rect.width / 2}px`;
    span.style.top = `${rect.top - 20}px`;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1500); // Longer duration for visibility
}

function updateLedger() {
    const tableBody = document.getElementById('ledger-table');
    tableBody.innerHTML = '';
    for (let player in players) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player}</td>
            <td>£${players[player].earnings.toFixed(2)}</td>
            <td>${players[player].tasks}</td>
            <td>£${players[player].fines.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    }
}

function updateLeaderboard() {
    document.getElementById('leader-fraser').textContent = `£${players.Fraser.earnings.toFixed(2)}`;
    document.getElementById('leader-eli').textContent = `£${players.Eli.earnings.toFixed(2)}`;
    document.getElementById('leader-myla').textContent = `£${players.Myla.earnings.toFixed(2)}`;
}

function updateChart() {
    chart.data.datasets[0].data = [players.Fraser.earnings, players.Eli.earnings, players.Myla.earnings];
    chart.update();
}

function updateAll() {
    updateLedger();
    updateLeaderboard();
    updateChart();
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game?')) {
        players = {
            Fraser: { earnings: 5.00, tasks: 0, fines: 0.00 },
            Eli: { earnings: 5.00, tasks: 0, fines: 0.00 },
            Myla: { earnings: 5.00, tasks: 0, fines: 0.00 }
        };
        updateAll();
    }
}

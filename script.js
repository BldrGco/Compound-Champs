let players = {
    Fraser: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} },
    Eli: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} },
    Myla: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} }
};
let currentPlayer = 'Fraser';
let activityDates = {};

const chart = new Chart(document.getElementById('earnings-chart'), {
    type: 'bar',
    data: {
        labels: ['Captain Fraser', 'Thunder Eli', 'Mystic Myla'],
        datasets: [{
            label: 'Power Earnings (£)',
            data: [players.Fraser.earnings, players.Eli.earnings, players.Myla.earnings],
            backgroundColor: ['#ff4500', '#00b7eb', '#ffcc00']
        }]
    },
    options: {
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
    }
});

const taskEmojis = {
    'Making bed': '🛏️',
    'Tidying room': '🧹',
    'Walking dog': '🐶',
    'Learning new skills': '🧠',
    'Reading for 30 mins': '📖',
    'Washing dishes': '🍽️',
    'Drying dishes': '💧',
    'Tidying downstairs': '🏠',
    'Hoovering downstairs': '🌪️',
    'Garden tidy': '🌿',
    'Car wash (outside)': '🚗',
    'Car wash (inside)': '✨',
    'Revision books (30 mins)': '📚',
    'Take out rubbish': '🗑️',
    'Helping with dinner': '🍳',
    'Helping with laundry': '👕',
    'School positive': '🏅'
};

window.onload = function() {
    updatePlayerControls();
    updateAll();
    updateCalendar();
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
            <button class="parent-button" onclick="adjustEarnings('Fraser', -1)">Zap £1 from Fraser</button>
            <button class="parent-button" onclick="adjustEarnings('Eli', -1)">Zap £1 from Eli</button>
            <button class="parent-button" onclick="adjustEarnings('Myla', -1)">Zap £1 from Myla</button>
            <button class="parent-button" onclick="resetGame()">Reset Universe</button>
        `;
    } else {
        controls.innerHTML = `
            <button class="task-button" onclick="addEarnings('Making bed', 0.50, this)">Making Bed - £0.50</button>
            <button class="task-button" onclick="addEarnings('Tidying room', 0.50, this)">Tidying Room - £0.50</button>
            <button class="task-button" onclick="addEarnings('Walking dog', 1.00, this)">Walking Dog - £1.00</button>
            <button class="task-button" onclick="addEarnings('Learning new skills', 1.50, this)">Learning Skills - £1.50</button>
            <button class="task-button" onclick="addEarnings('Reading for 30 mins', 0.50, this)">Reading 30 mins - £0.50</button>
            <button class="task-button" onclick="addEarnings('Washing dishes', 0.50, this)">Washing Dishes - £0.50</button>
            <button class="task-button" onclick="addEarnings('Drying dishes', 0.50, this)">Drying Dishes - £0.50</button>
            <button class="task-button" onclick="addEarnings('Tidying downstairs', 1.00, this)">Tidying Downstairs - £1.00</button>
            <button class="task-button" onclick="addEarnings('Hoovering downstairs', 1.00, this)">Hoovering - £1.00</button>
            <button class="task-button" onclick="addEarnings('Garden tidy', 1.00, this)">Garden Tidy - £1.00</button>
            <button class="task-button" onclick="addEarnings('Car wash (outside)', 1.00, this)">Car Wash (Outside) - £1.00</button>
            <button class="task-button" onclick="addEarnings('Car wash (inside)', 1.50, this)">Car Wash (Inside) - £1.50</button>
            <button class="task-button" onclick="addEarnings('Revision books (30 mins)', 1.00, this)">Revision (30 mins) - £1.00</button>
            <button class="task-button" onclick="addEarnings('Take out rubbish', 0.50, this)">Take out Rubbish - £0.50</button>
            <button class="task-button" onclick="addEarnings('Helping with dinner', 0.50, this)">Dinner Help - £0.50</button>
            <button class="task-button" onclick="addEarnings('Helping with laundry', 0.50, this)">Laundry Help - £0.50</button>
            <button class="task-button" onclick="addEarnings('School positive', 2.00, this)">School Positive - £2.00</button>
        `;
    }
    updateAll(); // Ensure UI reflects current state when switching players
}

function addEarnings(task, amount, button) {
    players[currentPlayer].earnings += amount;
    players[currentPlayer].tasks += 1;
    players[currentPlayer].taskLog[task] = (players[currentPlayer].taskLog[task] || 0) + 1;
    logActivityDate();
    showEmoji(task, button);
    updateAll();
}

function addFine(player, amount) {
    players[player].earnings -= amount;
    players[player].fines += amount;
    if (players[player].earnings < 0) players[player].earnings = 0;
    logActivityDate();
    updateAll();
}

function adjustEarnings(player, amount) {
    players[player].earnings += amount;
    if (players[player].earnings < 0) players[player].earnings = 0;
    logActivityDate();
    updateAll();
}

function showEmoji(task, button) {
    const emoji = taskEmojis[task] || '💥';
    const span = document.createElement('span');
    span.textContent = emoji;
    span.className = 'emoji';
    const rect = button.getBoundingClientRect();
    span.style.left = `${rect.left + rect.width / 2}px`;
    span.style.top = `${rect.top - 30}px`;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1500);
}

function updateLedger() {
    const tableBody = document.getElementById('ledger-table');
    tableBody.innerHTML = '';
    for (let player in players) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player === 'Fraser' ? 'Captain Fraser' : player === 'Eli' ? 'Thunder Eli' : 'Mystic Myla'}</td>
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

function updateTally() {
    const tallyContainer = document.getElementById('tally-container');
    tallyContainer.innerHTML = '';
    for (let player in players) {
        const heroName = player === 'Fraser' ? 'Captain Fraser' : player === 'Eli' ? 'Thunder Eli' : 'Mystic Myla';
        const tallyDiv = document.createElement('div');
        tallyDiv.className = 'tally-item';
        tallyDiv.innerHTML = `<h3>${heroName}</h3>`;
        const ul = document.createElement('ul');
        for (let task in players[player].taskLog) {
            const li = document.createElement('li');
            li.textContent = `${task}: ${players[player].taskLog[task]} ${taskEmojis[task] || ''}`;
            ul.appendChild(li);
        }
        tallyDiv.appendChild(ul);
        tallyContainer.appendChild(tallyDiv);
    }
}

function logActivityDate() {
    const today = new Date().toISOString().split('T')[0];
    activityDates[today] = (activityDates[today] || 0) + 1;
}

function updateCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.innerHTML = `
            <span>${date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</span>
            <span>${activityDates[dateStr] ? '🦸 ' + activityDates[dateStr] : '💤'}</span>
        `;
        calendarDays.appendChild(dayDiv);
    }
}

function updateAll() {
    updateLedger();
    updateLeaderboard();
    updateChart();
    updateTally();
}

function resetGame() {
    if (confirm('Ready to reboot the superhero universe?')) {
        players = {
            Fraser: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} },
            Eli: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} },
            Myla: { earnings: 5.00, tasks: 0, fines: 0.00, taskLog: {} }
        };
        activityDates = {};
        updateAll();
        updateCalendar();
    }
}

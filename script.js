document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('calendar-grid');
    const log = document.getElementById('live-log');
    const modal = document.getElementById('booking-modal');

    function addLog(msg) {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        log.innerHTML += `<p>> [${time}] ${msg}</p>`;
        log.scrollTop = log.scrollHeight;
    }

    // 1. Calendar Generation
    for (let i = 1; i <= 31; i++) {
        const day = document.createElement('div');
        day.className = 'date-cell' + (i === 17 ? ' today' : '');
        day.innerText = i;
        day.onclick = () => {
            const dateStr = `Jan ${i}, 2026`;
            document.getElementById('selected-date').innerText = `Active Selection: ${dateStr}`;
            document.getElementById('modal-date-display').innerText = `For: ${dateStr}`;
            addLog(`Selection Updated: ${dateStr}`);
            document.querySelectorAll('.date-cell').forEach(c => c.classList.remove('today'));
            day.classList.add('today');
        };
        grid.appendChild(day);
    }

    // 2. Search Box Logic
    document.getElementById('main-search').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) {
                addLog(`Search Query: "${query}"`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
            }
        }
    });

    // 3. Modal Control
    document.getElementById('init-booking').onclick = () => modal.style.display = 'flex';
    document.getElementById('close-modal').onclick = () => {
        modal.style.display = 'none';
        document.getElementById('error-msg').style.display = 'none';
    };

    // 4. Form Validation
    document.getElementById('confirm-booking').onclick = () => {
        const name = document.getElementById('user-name').value.trim();
        const desc = document.getElementById('user-desc').value.trim();
        const error = document.getElementById('error-msg');

        if (!name || !desc) {
            error.style.display = 'block';
            addLog("VALIDATION ERROR: Data Incomplete.");
            return;
        }

        error.style.display = 'none';
        addLog(`SUCCESS: Protocol logged for ${name}`);
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-view').style.display = 'block';

        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('form-container').style.display = 'block';
            document.getElementById('success-view').style.display = 'none';
            document.getElementById('user-name').value = '';
            document.getElementById('user-desc').value = '';
        }, 2000);
    };
});

// Global Helpers
window.triggerHandshake = (label, url) => {
    document.getElementById('live-log').innerHTML += `<p>> [HANDSHAKE] Initialized: ${label}</p>`;
    window.open(url, '_blank');
};

window.triggerCopy = (text, element) => {
    navigator.clipboard.writeText(text);
    const hint = element.querySelector('.qr-hint');
    hint.innerText = "COPIED!";
    hint.style.color = "#32d74b";
    document.getElementById('live-log').innerHTML += `<p>> [DATA] Endpoint Copied: ${text}</p>`;
    setTimeout(() => {
        hint.innerText = "Copy Email";
        hint.style.color = "#888";
    }, 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('main-search');
    const calendarGrid = document.getElementById('calendar-grid');
    const log = document.getElementById('live-log');
    const modal = document.getElementById('booking-modal');

    function addLog(msg) {
        log.innerHTML += `<p>> [${new Date().toLocaleTimeString()}] ${msg}</p>`;
        log.scrollTop = log.scrollHeight;
    }

    // 1. Search Functionality
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                addLog(`Search: "${query}"`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
            }
        }
    });

    // 2. Full View Calendar Generation
    for (let i = 1; i <= 31; i++) {
        const day = document.createElement('div');
        day.className = 'date-cell' + (i === 17 ? ' today' : '');
        day.innerText = i;
        day.onclick = () => {
            document.getElementById('selected-date').innerText = `Active Selection: Jan ${i}, 2026`;
            document.getElementById('modal-date-display').innerText = `For: Jan ${i}, 2026`;
            addLog(`Selected Jan ${i}`);
            document.querySelectorAll('.date-cell').forEach(c => c.classList.remove('today'));
            day.classList.add('today');
        };
        calendarGrid.appendChild(day);
    }

    // 3. Modal & Validation
    document.getElementById('init-booking').onclick = () => modal.style.display = 'flex';
    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';

    document.getElementById('confirm-booking').onclick = () => {
        const name = document.getElementById('user-name').value;
        const desc = document.getElementById('user-desc').value;
        if (!name || !desc) {
            document.getElementById('error-msg').style.display = 'block';
            addLog("Error: Validation Failed");
        } else {
            addLog(`Success: Booked by ${name}`);
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('success-view').style.display = 'block';
            setTimeout(() => { location.reload(); }, 2000);
        }
    };
});

// Global Helpers
window.triggerHandshake = (l, u) => { window.open(u, '_blank'); };
window.triggerCopy = (t, e) => {
    navigator.clipboard.writeText(t);
    e.querySelector('.qr-hint').innerText = "COPIED!";
};
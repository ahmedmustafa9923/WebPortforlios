let viewDate = new Date();
let selectedSlots = [];
let tempDate = "";

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const display = document.getElementById('month-display');
    if (!grid) return;

    grid.innerHTML = "";
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    display.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 1. Spacers to align the 1st day correctly
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement("div"));
    }

    // 2. Build the actual days
    for (let d = 1; d <= totalDays; d++) {
        const dateStr = `${monthNames[month]} ${d}, ${year}`;
        const dayEl = document.createElement("div");
        dayEl.className = "calendar-day-item";
        dayEl.innerText = d;

        if (selectedSlots.some(s => s.date === dateStr)) {
            dayEl.classList.add("active-day");
        }

        dayEl.onclick = () => {
            tempDate = dateStr;
            document.getElementById('picking-date-display').innerText = dateStr;
            document.getElementById('time-picker-modal').style.display = 'flex';
        };
        grid.appendChild(dayEl);
    }
}

// Clean UI Modal Logic
function showNotice(title, msg, isConfirm = false, onConfirm = null) {
    const modal = document.getElementById('status-modal');
    document.getElementById('status-title').innerText = title;
    document.getElementById('status-msg').innerText = msg;
    const actions = document.getElementById('status-actions');
    actions.innerHTML = "";

    if (isConfirm) {
        const b1 = document.createElement('button');
        b1.innerText = "Abort"; b1.className = "nav-btn";
        b1.onclick = () => modal.style.display = 'none';
        const b2 = document.createElement('button');
        b2.innerText = "Confirm"; b2.className = "action-btn"; b2.style.marginTop = "0";
        b2.onclick = () => { modal.style.display = 'none'; if(onConfirm) onConfirm(); };
        actions.append(b1, b2);
        actions.style.display = "flex"; actions.style.gap = "10px";
    } else {
        const b = document.createElement('button');
        b.innerText = "OK"; b.className = "action-btn";
        b.onclick = () => modal.style.display = 'none';
        actions.append(b);
    }
    modal.style.display = 'flex';
}

// Global Modal Closer
window.closeModals = () => document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');

// Time Picker Setup
document.querySelectorAll('.time-option').forEach(btn => {
    btn.onclick = () => {
        selectedSlots.push({ date: tempDate, time: btn.getAttribute('data-time') });
        document.getElementById('time-picker-modal').style.display = 'none';
        document.getElementById('selected-date-text').innerText = `Buffer: ${selectedSlots.length} slots`;
        renderCalendar();
    };
});

// Month Nav
document.getElementById('prev-month').onclick = () => { viewDate.setMonth(viewDate.getMonth() - 1); renderCalendar(); };
document.getElementById('next-month').onclick = () => { viewDate.setMonth(viewDate.getMonth() + 1); renderCalendar(); };

// Final Trigger
document.getElementById('init-booking').onclick = () => {
    if (selectedSlots.length === 0) return showNotice("Alert", "Select a slot first.");
    const list = selectedSlots.map(s => `• ${s.date} @ ${s.time}`).join("\n");
    showNotice("Verify Protocol", `Confirm these slots?\n${list}`, true, () => {
        showNotice("Success", "Protocol Initiated. Communication link established.");
        selectedSlots = [];
        renderCalendar();
    });
};

// CRITICAL: Initialize on DOM Load
document.addEventListener('DOMContentLoaded', renderCalendar);
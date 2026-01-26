# 🖥️ Ahmed Mustafa | Systems Architect Dashboard

A high-performance, interactive bento-style portfolio dashboard. This project features a glassmorphic UI, real-time system logging, and a modular architecture designed for high-speed navigation and appointment scheduling.



## 🚀 Live Demo
**[Insert Your GitHub Pages Link Here]**

---

## 🛠️ System Architecture

### 1. Command Search Center
A high-contrast, white-box search interface located at the core of the system.
* **Functionality:** Executes external queries via Google Search on `Enter`.
* **Feedback:** All search queries are captured and pushed to the live Activity Log.

### 2. Interactive Handshake Modules (QR Codes)
Four dedicated communication endpoints represented by interactive QR codes.
* **GitHub:** Redirects to source control.
* **LinkedIn:** Initializes professional network connection.
* **Fiverr:** Direct access to service portal.
* **Endpoint (Email):** Features a "Click-to-Copy" logic with visual success feedback.

### 3. System Scheduler (Full View)
A comprehensive 31-day calendar module for availability tracking.
* **Interactive Selection:** Clicking any date updates the system state.
* **Appointment Protocol:** A confirmation modal with strict form validation.
* **Error Handling:** Prevents blank submissions with localized error messaging.

### 4. Monitoring Log (Real-time)
A terminal-style activity tracker that documents every user interaction within the session.

---

## 🧰 Tech Stack & Tools

* **Logic:** JavaScript (ES6+)
* **Styling:** CSS3 (Flexbox, CSS Grid, Glassmorphism)
* **Markup:** HTML5
* **Environment:** IntelliJ IDEA
* **Deployment:** GitHub Pages

---

## 📂 Project Structure

```text
├── index.html      # Main system structure and modal overlays
├── style.css       # Visual architecture and responsive bento grid
├── script.js       # Core logic, calendar engine, and validation
└── README.md       # System documentation (You are here)

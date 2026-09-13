# FloodPath AI 🌊 🛣️

### AI-Powered Flood-Safe Navigation & Emergency Response Platform
*TAGLINE: "Don't just find a route. Find a safe route."*

## 📖 Project Description
**FloodPath AI** is a real-time AI decision-support platform designed for the **Smart India Hackathon (SIH)**. During heavy rainfall, floods, cyclones, and urban waterlogging, normal navigation systems often recommend roads that technically exist but are actually dangerous or completely impassable. 

FloodPath AI solves this by combining weather data, geospatial information, crowdsourced incident reports, and emergency resources to recommend the safest routes. Unlike standard navigation systems that only optimize for the *shortest* or *fastest* route, FloodPath AI optimizes for the **safest** route, protecting citizens and empowering emergency responders.

---

## 🌟 Core Features

### 1. AI Route Safety Engine
Dynamically scores road segments based on rainfall intensity, flood depth, elevation, reported incidents, and weather forecasts. Recommends "Safest", "Balanced", and "Fastest" routes with transparent AI explanations.

### 2. "What If?" Prediction Simulator
A powerful predictive tool that allows citizens and Disaster Management Officers (DMOs) to simulate future conditions (e.g., "What if rainfall increases by +30%?"). It recalculates risk scores and routes instantly.

### 3. Live Disaster GIS Map
An interactive, dark-themed command-center map displaying safe roads, high-risk zones, active incidents, available shelters, and user location.

### 4. Crowdsourced AI Incident Reporting
Citizens can report hazards (flooded roads, fallen trees) by uploading photos. The simulated AI Vision model classifies the hazard, estimates severity, and instantly routes it to responders.

### 5. Emergency Shelter & SOS System
Discover nearby relief centers with real-time capacity and occupancy metrics. A built-in SOS feature allows instant distress signal broadcasting to nearby responders.

### 6. Role-Based Dashboards
- **Citizen Dashboard**: Live alerts, route planning, and shelter discovery.
- **Responder Dashboard**: AI-prioritized queue (P1 to P4) of active rescue requests based on severity and distance.
- **Command Center**: High-level predictive analytics and charts (Rainfall vs. Flood Risk) for disaster management officials.

---

## 🛠️ Technology Stack

**Frontend:**
*   **React 19 + TypeScript**: Robust, type-safe UI development.
*   **Vite**: Lightning-fast build tool.
*   **Tailwind CSS v4**: Utility-first styling for modern, responsive designs.
*   **Framer Motion**: Smooth, professional animations and transitions.
*   **Lucide React**: Clean and consistent iconography.
*   **Leaflet & React-Leaflet**: Modular GIS mapping capabilities.
*   **Recharts**: Data visualization for the command center.

**Backend / Full-Stack Architecture:**
*   **Node.js & Express**: High-performance backend server.
*   **TypeScript execution (tsx/esbuild)**: Seamless TS integration on the server.
*   **Socket.io**: Real-time bidirectional event-based communication.
*   *Designed to connect with MongoDB and Google Gemini AI API.*

---

## 📂 Project Structure

```text
/
├── server.ts                 # Express backend entry point
├── package.json              # Dependencies & Scripts
├── vite.config.ts            # Vite & Tailwind Configuration
├── index.html                # App entry HTML
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Router configuration
│   ├── components/           # Reusable UI (AlertNotification, etc.)
│   ├── context/              # Global state (AppContext with Demo Mode)
│   ├── layouts/              # Main application shell / Sidebar
│   ├── pages/                # Route views (Dashboard, Map, Routes, CommandCenter)
│   ├── services/             # API/AI abstractions and mock data
│   ├── types.ts              # Global TypeScript interfaces
│   └── utils.ts              # Helper utilities (cn, tailwind-merge)
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn
*   Git

### 1. Clone the repository
```bash
git clone https://github.com/your-org/floodpath-ai.git
cd floodpath-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```
Ensure you have the following variables (for production/AI integration):
```env
GEMINI_API_KEY="your_api_key_here"
PORT=3000
```

### 4. Run the Development Server
This project uses a full-stack Express + Vite middleware architecture.
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🎯 Hackathon Presentation Scenario (Demo Mode)

The application includes a built-in **Demo Mode** specifically designed for hackathon presentations without requiring live external sensors. 

**Steps to Demo:**
1.  Open the application to the **Citizen Dashboard**.
2.  Navigate to **Safe Routes** and calculate a route. Notice the baseline ETA and safe status.
3.  Click the **Simulate Rainfall / "What If?"** button in the sidebar or prediction panel.
4.  Observe the dynamic UI updates: 
    * Urgent **AlertNotifications** slide in.
    * The previously safe route changes to **HIGH RISK**.
    * AI explains *why* the route is no longer viable.
5.  Navigate to **Report Incident** to show how citizens upload photos and the AI automatically tags it as "Severe Waterlogging".
6.  Open the **Responder Dashboard** to show the newly verified incident appearing as a **P1 Priority**.
7.  Finally, display the **Command Center** to show the DMO's high-level view of the worsening crisis.

---

## 🤝 Contribution Guidelines

For SIH team members contributing to this repository, please follow these guidelines to ensure smooth collaboration:

### Branching Strategy
*   `main`: Production-ready code. Do not commit directly to main.
*   `dev`: Integration branch for testing features together.
*   **Feature Branches**: Create a new branch for every feature or bug fix.
    *   Format: `feature/your-feature-name` or `fix/issue-description`

### Contribution Workflow
1.  **Pull latest changes:** `git pull origin dev`
2.  **Create your branch:** `git checkout -b feature/awesome-feature`
3.  **Make changes and commit:** Use clear, descriptive commit messages.
    ```bash
    git commit -m "feat: added AI priority scoring to responder dashboard"
    ```
4.  **Push to remote:** `git push origin feature/awesome-feature`
5.  **Open a Pull Request (PR):** Target the `dev` branch and request a review from a team member.

### Code Standards
*   Use **TypeScript** strictly. Avoid `any` types where possible.
*   Follow the existing Tailwind CSS design system (Navy/Cyan/Amber/Rose).
*   Keep React components modular and functional.
*   Ensure the UI remains fully responsive for the mobile view (Citizen App) and desktop view (Command Center).

---
*Built with ❤️ for Smart India Hackathon.*

# Screen Share Diagnostic Platform

A browser-native screen sharing validation tool built using React (Vite) and Tailwind CSS.

This application demonstrates robust handling of browser screen-sharing permissions, media stream lifecycle management, real-time metadata extraction, and proper resource cleanup using native Web APIs.

---

## 🚀 Live Demo

(Insert deployed link here)

---

## 📂 GitHub Repository

(Insert repository link here)

---

## 🧰 Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- Native Browser Web APIs (`getDisplayMedia`)

No third-party screen-sharing libraries are used.

---

## 🎯 Objective

This project was built to demonstrate:

- Browser permission handling
- Explicit UI state transitions
- Media stream lifecycle detection
- Real-time diagnostics
- Clean React state management
- Proper cleanup of media resources
- Responsive, polished UI

---

## 🧠 Architecture Overview

### 1️⃣ Custom Hook — `useScreenShare`

All screen-sharing logic is isolated inside a reusable custom hook.

Responsibilities:

- Requesting screen capture via `navigator.mediaDevices.getDisplayMedia`
- Managing permission states
- Attaching stream to `<video>`
- Extracting metadata using `track.getSettings()`
- Tracking live session duration
- Detecting manual stream termination using `track.onended`
- Cleaning up media tracks and intervals
- Preventing stream reuse

This ensures UI components remain stateless and focused purely on presentation.

---

### 2️⃣ State Machine

The application explicitly handles the following states:

- `idle`
- `requesting`
- `granted`
- `denied`
- `cancelled`
- `error`
- `stopped`

Each state maps to clear and distinct UI feedback.

No generic error handling.

---

### 3️⃣ Media Lifecycle Handling

The app detects:

- Manual stop via browser UI
- Unexpected stream termination
- User cancellation
- Permission denial

Cleanup guarantees:

- All tracks are stopped
- Intervals are cleared
- Video element is detached
- No memory leaks

---

## 🔄 Screen Sharing Flow

1. User clicks **Start Screen Sharing**
2. `getDisplayMedia()` is triggered
3. State transitions to `requesting`
4. On success → `granted`
5. Stream attaches to `<video>`
6. Metadata extracted via `track.getSettings()`
7. Duration counter starts
8. If user stops from browser:
   - `track.onended` triggers
   - Cleanup executes
   - Status becomes `stopped`

---

## 📊 Features

### ✅ Permission Handling
Distinct UI handling for:
- Permission granted
- Permission denied
- Picker cancelled
- Unknown error

### ✅ Live Preview
- Displays screen locally in `<video>`
- No recording
- No backend streaming

### ✅ Real-Time Diagnostics
Displays:
- Resolution
- Frame rate
- Display surface (monitor / window / tab)
- Live session duration

### ✅ UX Enhancements
- Animated page transitions
- Micro-interaction buttons
- Smooth status transitions
- Active session indicator
- Clean responsive layout

---

## 🌐 Browser Support

Tested on:

- Google Chrome
- Microsoft Edge

Requires:

- HTTPS environment OR
- `localhost`

Screen sharing will not function over insecure HTTP network IP addresses.

---

## 🛠 Setup Instructions

Install dependencies:

```bash
npm install
````

Run development server:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
  components/
    Button.tsx
    StatusBadge.tsx
    PageWrapper.tsx
  hooks/
    useScreenShare.ts
  pages/
    Home.tsx
    ScreenTest.tsx
  App.tsx
  main.tsx
  index.css
```

---

## ⚠️ Known Limitations

* `displaySurface` support may vary across browsers.
* Screen capture requires secure context.
* No recording or backend persistence (local preview only).

---

## 📷 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/home.png)

---

### 🖥 Active Screen Sharing Session
![Active Session](./screenshots/active-session.png)

---

### 🚫 Permission Denied State
![Permission Denied](./screenshots/permission-denied.png)

---

## 👩‍💻 Author

Mounika Karri
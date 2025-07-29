# Student Dashboard - Online EdTech Portal 🚀

A modern React-based student dashboard for an online education platform, built with TypeScript, Tailwind CSS, React Router, and **Axios** for API simulation.

Live page: https://olliekse.github.io/student-dashboard/

## 🧠 Architecture Overview

```mermaid
graph TB
    A[User Browser] --> B[React App]
    B --> C[React Router]
    C --> D[Dashboard Layout]
    D --> E[Sidebar Navigation]
    D --> F[Topbar]
    D --> G[Main Content Area]

    G --> H[Dashboard Overview]
    G --> I[My Courses]
    G --> J[Resume Tool]

    H --> K[Student Stats]
    H --> L[Course Lists]

    I --> M[Course Cards]
    I --> N[Filter System]

    J --> O[File Upload]
    J --> P[Text Analysis]
    J --> Q[AI Suggestions]

    K --> R[Mock API Layer]
    L --> R
    M --> R
    Q --> R

    R --> S[studentData.ts]
    S --> T[In-Memory Mock Data]
```

## 🎯 Core Features

### 🎓 Dashboard Overview

- **Student Profile & Progress Tracking**
- **Course Completion Statistics**
- **Active & Completed Course Lists**
- **Responsive Design**

### 📚 My Courses

- **Smart Course Filtering**
- **Progress Visualization**
- **Course Status Indicators**
- **Instructor Details**

### ✨ AI Resume Tool

- **PDF Upload Support**
- **Text Analysis Engine**
- **Priority-Based Suggestions**
- **Real-Time Processing**

### 🛰️ API Simulation

- **All data fetching is performed asynchronously using [Axios](https://axios-http.com/)**
- **Mock API endpoints are simulated in-memory, but all calls use Axios to mimic real backend requests**
- **Network latency is simulated for realistic UX**

## 🛠️ Tech Stack Deep Dive

```mermaid
graph LR
    A[React 18] --> B[TypeScript]
    B --> C[Vite Build System]
    C --> D[ESLint]

    E[Tailwind CSS] --> F[Responsive Design]
    F --> G[Heroicons]

    H[React Router] --> I[Navigation]
    I --> J[Client-Side Routing]

    K[Mock API Layer] --> L[In-Memory Data]
    L --> M[studentData.ts]

    N[Error Boundaries] --> O[Error Handling]
    O --> P[User Experience]
```

### Frontend Architecture

- **React 18**
- **TypeScript**
- **React Router v6**
- **Tailwind CSS**
- **Axios** (for all API simulation)

### Development Tools

- **Vite**
- **ESLint**
- **TypeScript**
- **Tailwind CSS**
- **Axios**

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository** :

```bash
git clone <repository-url>
cd student-dashboard
```

2. **Install dependencies** :

```bash
npm install
```

3. **Start the development server** :

```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173/student-dashboard/` (or the URL/port shown in your terminal after running the dev server)

### Available Scripts

| Command           | What it does              | Why you care             |
| ----------------- | ------------------------- | ------------------------ |
| `npm run dev`     | Starts development server | Hot reloading is life    |
| `npm run build`   | Builds for production     | Because we ship code     |
| `npm run preview` | Previews production build | Test before you deploy   |
| `npm run lint`    | Runs ESLint               | Clean code is happy code |

## 📁 Project Structure

```
src/
├── api/
│   └── studentData.ts          # Mock data and API service
├── features/
│   └── dashboard/
│       ├── components/
│       │   └── Layout/         # Dashboard layout components
│       └── pages/              # Dashboard pages
├── components/                  # Reusable components
└── router.tsx                  # Application routing
```

## 🔄 Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant R as React Router
    participant C as Components
    participant A as API Layer
    participant D as Mock Data

    U->>R: Navigate to Dashboard
    R->>C: Render Dashboard Layout
    C->>A: Fetch Student Data
    A->>D: Get Mock Data
    D-->>A: Return Student Info
    A-->>C: Pass Data to Components
    C-->>U: Render Dashboard UI

    U->>C: Upload Resume
    C->>A: Process Resume
    A->>D: Get AI Suggestions
    D-->>A: Return Suggestions
    A-->>C: Display Results
    C-->>U: Show Analysis
```

## 🤖 Mock API & Data Structure

All API calls (student profile, courses, resume analysis) are now simulated using **Axios**. This means:

- Every data fetch in the app uses Axios, just like a real backend.
- Endpoints are mocked in-memory, but the frontend code is written as if calling a real server.
- Network latency is simulated for a realistic experience.

### Example (in code):

```ts
// Fetch all courses
const courses = await axios.get("/mock/courses");
```

### Student Profile Schema

```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalCourses: number;
  completedCourses: number;
  currentCourses: number;
}
```

### Course Data Schema

```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  status: "active" | "completed" | "upcoming";
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
}
```

## 🚀 Performance Optimizations

- **React.memo()**: Used on key presentational and layout components (`Button`, `Sidebar`, `Topbar`, `DashboardLayout`) to prevent unnecessary re-renders when props do not change.
- **useCallback()**: Used to memoize event handlers in components like `DashboardLayout`, `Courses`, and `ResumeTool`, ensuring stable function references and further reducing unnecessary renders.
- **Responsive Design**: Ensures the dashboard looks great and works well on all device sizes, from mobile to desktop.
- **CSS Transforms**: Used for smooth UI transitions and effects, enhancing user experience without heavy JavaScript.
- **Error Boundaries**: Catches and gracefully handles JavaScript errors in the UI, preventing the whole app from crashing.
- **Text Truncation**: Prevents long text from breaking layouts, keeping the interface clean and readable.

## 🎨 Responsive Design Features

- **Mobile-First Approach**
- **Custom Breakpoints**
- **Flexible Grid System**
- **Smooth Animations**
- **Touch-Friendly**

## 🐛 Debugging Tips

1. **Check the Console**
2. **React DevTools**
3. **Network Tab** (see Axios requests)
4. **TypeScript Errors**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests**
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License - because open source is the future.

## 🖼️ Screenshots

<img width="1259" height="671" alt="Screenshot 2025-07-29 at 11 47 47" src="https://github.com/user-attachments/assets/08340d2e-0fea-44b5-9ec4-53a08bf1a966" />
<img width="1238" height="670" alt="Screenshot 2025-07-29 at 11 48 22" src="https://github.com/user-attachments/assets/58bddf23-d22a-4faf-ba9d-a1a0dc1b1327" />
<img width="1237" height="670" alt="Screenshot 2025-07-29 at 11 48 44" src="https://github.com/user-attachments/assets/06f32147-8f7b-49b1-a6da-92563baea6fe" />

---

## 🚨 Important: Tailwind CSS Version Locked

This project is locked to **Tailwind CSS v3.4.1** for compatibility reasons. Do not upgrade to Tailwind v4+ unless you update the PostCSS configuration and dependencies accordingly.

If you install dependencies, make sure you get v3.4.1:

```
npm install -D tailwindcss@3.4.1
```

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
- **API endpoints are simulated using local JSON files and mock data with artificial network latency to mimic real-world API behavior**
- **Network latency is simulated using timeouts to provide a realistic user experience**

### Mock Data Files

Mock data is stored in JSON files located in the public/mock/ directory:

- student.json

- courses.json

- courses-active.json

- courses-completed.json

- analyze-resume.json

These files are fetched asynchronously to simulate API calls.

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
- **Axios**

### Development Tools

- **Vite**
- **ESLint**

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**:

```bash
git clone <repository-url>
cd student-dashboard
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```

4. **Open your browser** and navigate to http://localhost:5173/student-dashboard/

### Deployment Base URL

This project is configured to run from `/student-dashboard/` (e.g., https://olliekse.github.io/student-dashboard/). The `BASE_URL` environment variable is used internally for axios requests to correctly resolve paths for deployed assets and mock JSON files.

### Available Scripts

| Command         | What it does              | Why you care             |
| --------------- | ------------------------- | ------------------------ |
| npm run dev     | Starts development server | Hot reloading is life    |
| npm run build   | Builds for production     | Because we ship code     |
| npm run preview | Previews production build | Test before you deploy   |
| npm run lint    | Runs ESLint               | Clean code is happy code |

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
├── components/                 # Reusable components
└── router.tsx                  # Application routing
public/
└── mock/                      # Mock JSON data files
    ├── student.json
    ├── courses.json
    ├── courses-active.json
    ├── courses-completed.json
    └── analyze-resume.json

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

### Example

```ts
// Fetch all courses
const courses = await axios.get("/mock/courses.json");
```

### Student Profile Schema

```ts
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

```ts
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

- **React.memo()** to prevent unnecessary re-renders
- **useCallback()** to memoize event handlers
- **Responsive Design**
- **CSS Transforms** for smooth effects
- **Error Boundaries**
- **Text Truncation** for clean UI

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

This project is licensed under the MIT License.

## 🖼️ Screenshots

![Screenshot 1](https://github.com/user-attachments/assets/08340d2e-0fea-44b5-9ec4-53a08bf1a966)
![Screenshot 2](https://github.com/user-attachments/assets/58bddf23-d22a-4faf-ba9d-a1a0dc1b1327)
![Screenshot 3](https://github.com/user-attachments/assets/06f32147-8f7b-49b1-a6da-92563baea6fe)

---

## 🚨 Important: Tailwind CSS Version Locked

This project uses **Tailwind CSS v3.4.1**. Do not upgrade to v4+ unless you update the PostCSS configuration and related dependencies.

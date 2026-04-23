# Implementation Guide: Phase 3.0 - The Guidance & Mentorship Portal

## 🎯 Objective
Scale the traditional Guru-Shishya (Mentor-Student) relationship by providing tools for personalized guidance and session tracking.

## 🛠️ Tasks

### 1. Mentorship Matching (Backend)
- Implement `GuidanceAssignment` logic to connect students with mentors based on `LifeStage` and `GuidanceLevel`.
- **Assignment Types**:
  - `Mentor`: Life-long guidance.
  - `Teacher`: Specific shastra instruction.
  - `Coordinator`: Community service coordination.

### 2. The Guidance Session System
- `POST /guidance/sessions`: Mentors can record session notes, topics covered, and duration.
- `GET /guidance/my-students`: Mentors view progress of their assigned students.
- `GET /guidance/my-mentor`: Students view feedback and notes from their mentor.

### 3. Mentor Portal (Frontend)
- Build a dedicated dashboard for users with the `mentor` or `teacher` role.
- Features:
  - List of active students.
  - Quick-view of student progress checkmarks in the library.
  - Session logging form.

### 4. Real-time Doubts Clearing
- Integration with the Library UI: A "Request Guidance" button next to complex verses that notifies the assigned mentor.

## 📐 Technical Implementation Details

### API Gateway Changes
New routes in `guidance.routes.ts`:
- `POST /guidance/assignments/create`
- `GET /guidance/sessions/history`
- `POST /guidance/doubts/submit`

### Security
Strict role-based access control (RBAC) to ensure only authorized mentors can see student data.

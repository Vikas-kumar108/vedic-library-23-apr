# Implementation Guide: Phase 2.0 - The Education Layer

## 🎯 Objective
Transition from passive content consumption to structured, goal-oriented learning through **Learning Curves**.

## 🛠️ Tasks

### 1. Learning Curve Content Creation
- Define "Master Syllabus" JSON structures that can be imported into the `LearningCurve` and `LearningCurveStep` tables.
- **Example**: `Gita for Professionals`
  - Step 1: Work as Sacrifice (BG 3.9)
  - Step 2: Equanimity in Action (BG 2.47-48)
  - Step 3: Leadership through Example (BG 3.21)

### 2. Enrollment Engine (Backend)
- `POST /education/enroll`: Links a `User` to a `LearningCurve`.
- `GET /education/my-curves`: Fetches the user's active learning paths and current progress.

### 3. Progressive Unlocking Logic
- Implement the `unlock_requirement` JSON check (e.g., must complete Step 1 before Step 2).
- Use `ContentAccessRule` to restrict access to deep library content until prerequisite steps are completed.

### 4. Learning Journey UI (Frontend)
- Create a vertical timeline component that visualizes the steps in a curve.
- Show "Lock" icons on future steps.
- Provide a "Continue Learning" button on the main dashboard that deep-links to the next pending step.

## 📐 Technical Implementation Details

### API Gateway Changes
New routes in `education.routes.ts`:
- `GET /education/curves`: Browse available paths.
- `GET /education/curves/:id`: Details of a specific path.
- `POST /education/progress/update`: Update a user's step completion.

### Content Linking
Ensure each `LearningCurveStep` correctly references a `node_id` from the Library.

Implement Guided Reading Experience (Seeker Mode ONLY)

IMPORTANT:
- Do NOT modify /library/research
- Do NOT change scholar/research UI or logic
- This implementation is ONLY for guided seeker flow

Tasks:

1. When user opens a node (from dashboard / guided flow):
- fetch node from backend
- display clean reading UI

2. Auto-trigger READ_NODE:
- call backend (library endpoint)
- pass nodeId
- include JWT

3. UX:
- minimal
- calm
- distraction-free
- optimized for focus (not research)

4. After reading:
- subtle message:
  "You have completed your step"
- CTA:
  "Continue your path"

5. Ensure:
- completion triggers Guided Path clearing
- no duplicate calls

6. Architecture separation:
- Guided reading UI must be separate from research library
- Do NOT reuse research components

Goal:
Create a focused seeker reading experience without affecting research library
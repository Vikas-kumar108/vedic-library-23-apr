Complete Guided Path Loop

Tasks:

1. When READ_NODE is triggered:
- check if node == current_primary_node_id

2. If yes:
- clear:
  current_primary_node_id
  current_focus (optional)

3. Ensure atomic update:
WHERE current_primary_node_id = nodeId

4. After clearing:
- next recommendation call generates new PRIMARY

5. Ensure:
- idempotent (no duplicate clearing)
- safe under concurrency

Goal:
Reading → Completion → Next Step becomes a closed loop
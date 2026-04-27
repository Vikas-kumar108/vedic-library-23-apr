Enhance /auth/me endpoint to return full seeker context

Tasks:

1. Modify AuthService.validateToken or me()

2. Include:
   - user (id, email, roles)
   - user_profile (full_name, avatar)
   - spiritual_profile:
       - life_stage
       - inner_state
       - eligibility_level
       - current_focus
       - current_primary_node_id
       - last_guided_at
   - user_statistics:
       - nodes_read_count

3. Ensure:
   - single query (efficient include)
   - no breaking changes to existing structure
   - backward compatibility

Goal:
Frontend must receive full seeker state in one call
import { PrismaClient } from '@dharma/data-access'

export type TaskType = 'WEBHOOK_BROADCAST' | 'SHASTRA_RECONCILE' | 'PAYROLL_GENERATE' | 'ASSET_REPORT'

export class TaskOrchestrator {
  constructor(private prisma: PrismaClient) {}

  /**
   * Enqueue a new background task
   */
  async enqueue(type: TaskType, payload: any) {
    return this.prisma.$executeRawUnsafe(
      `INSERT INTO background_tasks (id, task_type, payload, status, created_at) 
       VALUES (uuid_generate_v4(), $1, $2::jsonb, 'PENDING', NOW())`,
      type, JSON.stringify(payload)
    )
  }

  /**
   * Get the status of recent tasks for the 'Booming Backend' UI
   */
  async getTaskPulse() {
    const tasks = await this.prisma.$queryRawUnsafe(
      `SELECT * FROM background_tasks ORDER BY created_at DESC LIMIT 10`
    )
    
    const stats = await this.prisma.$queryRawUnsafe(
      `SELECT status, COUNT(*) as count FROM background_tasks GROUP BY status`
    )

    return {
      recentTasks: tasks,
      stats: (stats as any[]).reduce((acc, s) => ({ ...acc, [s.status]: Number(s.count) }), {})
    }
  }

  /**
   * The actual worker loop logic (to be called by a background process)
   */
  async processNextTask() {
    // 1. Pick a pending task and mark as processing (atomic)
    const [task]: any = await this.prisma.$queryRawUnsafe(
      `UPDATE background_tasks 
       SET status = 'PROCESSING', started_at = NOW()
       WHERE id = (
         SELECT id FROM background_tasks 
         WHERE status = 'PENDING' 
         ORDER BY created_at ASC 
         LIMIT 1 
         FOR UPDATE SKIP LOCKED
       )
       RETURNING *`
    )

    if (!task) return null

    try {
      console.log(`🚀 WORKER: Executing ${task.task_type} (${task.id})...`)
      
      // Execute logic based on type
      await this.executeTask(task)

      // 2. Mark as completed
      await this.prisma.$executeRawUnsafe(
        `UPDATE background_tasks SET status = 'COMPLETED', finished_at = NOW() WHERE id = $1::uuid`,
        task.id
      )
    } catch (error) {
      console.error(`❌ WORKER: Task ${task.id} failed`, error)
      await this.prisma.$executeRawUnsafe(
        `UPDATE background_tasks SET status = 'FAILED', error_log = $1 WHERE id = $2::uuid`,
        String(error), task.id
      )
    }

    return task
  }

  private async executeTask(task: any) {
    // Simulate real work
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (task.task_type === 'WEBHOOK_BROADCAST') {
       // Logic to call external APIs
    }
  }
}

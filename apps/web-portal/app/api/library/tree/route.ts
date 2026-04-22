import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TreeNode } from '@/lib/types'

export async function GET() {
  try {
    const nodes = await prisma.node.findMany({
      orderBy: { orderIndex: 'asc' }
    })

    const nodesMap: Record<string, any> = {}
    nodes.forEach(n => {
      nodesMap[n.id] = {
        id: n.id,
        name: n.name,
        type: n.level as any, // level maps to type
        slug: n.slug || undefined,
        canonicalRef: n.canonicalRef || undefined,
        children: []
      }
    })

    const tree: any[] = []
    nodes.forEach(n => {
      if (n.parentId && nodesMap[n.parentId]) {
        nodesMap[n.parentId].children.push(nodesMap[n.id])
      } else {
        tree.push(nodesMap[n.id])
      }
    })
    return NextResponse.json(tree)
  } catch (error: any) {
    console.error('Error fetching library tree:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}


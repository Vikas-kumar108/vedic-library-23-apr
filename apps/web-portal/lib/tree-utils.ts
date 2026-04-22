import { TreeNode } from './types'

export function findNodeById(tree: TreeNode[], id: string): TreeNode | null {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

export function findNodePath(tree: TreeNode[], targetId: string, path: TreeNode[] = []): TreeNode[] | null {
  for (const node of tree) {
    const currentPath = [...path, node]

    if (node.id === targetId) {
      return currentPath
    }

    if (node.children) {
      const found = findNodePath(node.children, targetId, currentPath)
      if (found) return found
    }
  }

  return null
}

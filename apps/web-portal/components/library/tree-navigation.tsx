'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  Scroll,
  Library,
  BookMarked,
  Hash,
  GraduationCap,
  Landmark,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TreeNode } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'

// ─── Icon mapping aligned to TreeNode['type'] from lib/types ───

function getNodeIcon(type: TreeNode['type']) {
  switch (type) {
    case 'category':
      return Library
    case 'text':
      return BookOpen
    case 'section':
      return Scroll
    case 'chapter':
      return FileText
    case 'verse':
      return Hash
    case 'school':
      return GraduationCap
    case 'tradition':
      return Landmark
    default:
      return BookMarked
  }
}

// ─── Single tree-node row ───

interface TreeNodeComponentProps {
  node: TreeNode
  level: number
  parentPath?: string
}

function TreeNodeComponent({ node, level, parentPath = '' }: TreeNodeComponentProps) {
  const { expandedNodes, toggleNode, currentNode, setCurrentNode } = useAppStore()
  const [isHovered, setIsHovered] = useState(false)

  const isExpanded = expandedNodes.has(node.id)
  const isSelected = currentNode?.id === node.id
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = node.type === 'verse'
  const Icon = getNodeIcon(node.type)

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (hasChildren) {
        toggleNode(node.id)
      }
    },
    [hasChildren, node.id, toggleNode],
  )

  const handleSelect = useCallback(() => {
    setCurrentNode(node)

    // Auto-expand when selecting a node with children
    if (hasChildren && !expandedNodes.has(node.id)) {
      toggleNode(node.id)
    }
  }, [node, setCurrentNode, hasChildren, expandedNodes, toggleNode])

  // ── Verse chips (compact grid) ──
  if (isLeaf) {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center min-w-[32px] h-7 px-2 text-sm rounded transition-colors',
          'hover:bg-accent/60',
          isSelected
            ? 'bg-primary text-primary-foreground font-medium'
            : 'text-foreground/80 hover:text-foreground',
        )}
        onClick={handleSelect}
      >
        {node.name}
      </button>
    )
  }

  // ── Branch node ──
  return (
    <div className="select-none">
      <div
        className={cn(
          'flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-150',
          'hover:bg-accent/60',
          isSelected && 'bg-accent text-foreground font-medium',
          !isSelected && 'text-foreground/80',
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expand / Collapse Arrow */}
        <button
          onClick={handleToggle}
          className={cn(
            'w-4 h-4 flex items-center justify-center shrink-0 transition-transform duration-150',
            !hasChildren && 'invisible',
          )}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>

        {/* Node Icon */}
        <Icon
          className={cn(
            'w-4 h-4 shrink-0',
            isSelected ? 'text-primary' : 'text-muted-foreground',
          )}
        />

        {/* Node Name */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm truncate">{node.name}</span>
          {node.sanskrit && isHovered && (
            <span className="text-xs text-muted-foreground font-serif truncate">
              {node.sanskrit}
            </span>
          )}
        </div>

        {/* Child count badge (when no children are loaded yet, show '…') */}
        {!hasChildren && node.type !== 'verse' && (
          <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded shrink-0">
            …
          </span>
        )}
      </div>

      {/* Children — verse grid or normal list */}
      {hasChildren && isExpanded && (
        <div className="animate-in slide-in-from-top-1 duration-150">
          {node.children![0]?.type === 'verse' ? (
            <div
              className="flex flex-wrap gap-1 py-2 px-2"
              style={{ paddingLeft: `${(level + 1) * 12 + 24}px` }}
            >
              {node.children!.map((child) => (
                <TreeNodeComponent
                  key={child.id}
                  node={child}
                  level={level + 1}
                  parentPath={`${parentPath}/${node.name}`}
                />
              ))}
            </div>
          ) : (
            node.children!.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
                parentPath={`${parentPath}/${node.name}`}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ─── Public component ───

interface TreeNavigationProps {
  tree: TreeNode[]
  className?: string
}

export function TreeNavigation({ tree, className }: TreeNavigationProps) {
  // Count total texts for the subheading
  const textCount = useMemo(() => {
    let count = 0
    function walk(nodes: TreeNode[]) {
      for (const n of nodes) {
        if (n.type === 'text') count++
        if (n.children) walk(n.children)
      }
    }
    walk(tree)
    return count
  }, [tree])

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="p-3">
        <div className="mb-3 px-2">
          <h2 className="text-sm font-semibold text-foreground">Vedic Corpus</h2>
          <p className="text-xs text-muted-foreground">
            {textCount > 0
              ? `${textCount} texts · Explore the knowledge tree`
              : 'Explore the knowledge tree'}
          </p>
        </div>
        <div className="space-y-0.5">
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} level={0} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

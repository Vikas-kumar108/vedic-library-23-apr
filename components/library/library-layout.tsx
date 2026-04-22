'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, BookOpen } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { TreeNode } from '@/lib/types'

import { Header } from './header'
import { FilterBar } from './filter-bar'
import { TreeNavigation } from './tree-navigation'
import { ContentEngine } from './content-engine'
import { ApplicationPanel } from './application-panel'
import { Breadcrumb } from './breadcrumb'

import { sampleCourses } from '@/data/application/courses'
import { sampleGuidance } from '@/data/application/guidance'
import { sevaDomains } from '@/data/application/seva'

import { findNodePath } from '@/lib/tree-utils'

interface LibraryLayoutProps {
  children?: React.ReactNode
}


export function LibraryLayout({ children }: LibraryLayoutProps) {
  const isMobile = useIsMobile()

  const {
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
    currentNode,
    setCurrentNode,
    currentVerse,
    setCurrentVerse,
    setTree,
    tree
  } = useAppStore()

  const [treeLoading, setTreeLoading] = useState(true)

  // 🌿 Initialize tree
  useEffect(() => {
    async function fetchTree() {
      try {
        setTreeLoading(true)
        const res = await fetch('/api/library/tree')
        if (res.ok) {
          const data = await res.json()
          setTree(data)
        }
      } catch (err) {
        console.error('Failed to fetch tree:', err)
      } finally {
        setTreeLoading(false)
      }
    }
    fetchTree()
  }, [setTree])

  // 🌿 Breadcrumb (node-based)
  const breadcrumbPath = useMemo(() => {
    if (!currentNode || tree.length === 0) return []

    const path = findNodePath(tree, currentNode.id)

    return path?.map(node => ({
      id: node.id,
      name: node.name,
    })) || []
  }, [currentNode, tree])


  // 🌿 Breadcrumb navigation FIXED
  const handleBreadcrumbNavigate = useCallback((id: string) => {
    if (id === 'root') {
      setCurrentNode(null)
      return
    }

    const path = findNodePath(tree, id)
    const node = path?.[path.length - 1] || null

    setCurrentNode(node)
  }, [setCurrentNode, tree])

  // 📱 MOBILE
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <FilterBar />

        {breadcrumbPath.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-card">
            <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
          </div>
        )}

        <main className="flex-1 overflow-hidden">
          <ContentEngine className="h-full" />
        </main>

        <Sheet open={leftSidebarOpen} onOpenChange={toggleLeftSidebar}>
          <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {treeLoading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-60">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-muted-foreground">Syncing Tree...</span>
              </div>
            ) : (
              <TreeNavigation tree={tree} className="pt-4" />
            )}
          </SheetContent>
        </Sheet>

        <Sheet open={rightSidebarOpen} onOpenChange={toggleRightSidebar}>
          <SheetContent side="right" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Application Panel</SheetTitle>
            <ApplicationPanel
              relatedVerses={currentVerse?.relations?.related_verses}
              courses={sampleCourses}
              guidance={sampleGuidance}
              sevaDomains={sevaDomains}
              className="pt-4"
            />
          </SheetContent>
        </Sheet>

        <div className="border-t border-border bg-card p-2 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={toggleLeftSidebar}>
            <Menu className="h-4 w-4 mr-2" />
            Navigate
          </Button>

          <Button variant="outline" className="flex-1" onClick={toggleRightSidebar}>
            <BookOpen className="h-4 w-4 mr-2" />
            Apply
          </Button>
        </div>
      </div>
    )
  }

  // 💻 DESKTOP
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <FilterBar />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">

          {/* LEFT */}
          {leftSidebarOpen && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar border-r border-border">
                {treeLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-60">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-muted-foreground">Syncing Tree...</span>
                  </div>
                ) : (
                  <TreeNavigation tree={tree} className="h-full" />
                )}
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
            </>
          )}

          {/* CENTER */}
          <ResizablePanel defaultSize={rightSidebarOpen ? 55 : 75} minSize={40}>
            <div className="h-full flex flex-col bg-background">

              {breadcrumbPath.length > 0 && (
                <div className="px-6 py-3 border-b border-border bg-card/50">
                  <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
                </div>
              )}

              <ContentEngine className="flex-1" />
            </div>
          </ResizablePanel>

          {/* RIGHT */}
          {rightSidebarOpen && (
            <>
              <ResizableHandle withHandle className="bg-border" />
              <ResizablePanel defaultSize={25} minSize={18} maxSize={35} className="bg-sidebar border-l border-border">
                <ApplicationPanel
                  relatedVerses={currentVerse?.relations?.related_verses}
                  courses={sampleCourses}
                  guidance={sampleGuidance}
                  sevaDomains={sevaDomains}
                  className="h-full"
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
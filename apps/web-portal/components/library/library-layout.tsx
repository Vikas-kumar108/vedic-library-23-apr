'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, BookOpen } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAppStore } from '@/lib/store'
import { useLibraryTree } from '@/hooks/use-library-tree'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'

import { Header } from './header'
import { FilterBar } from './filter-bar'
import { TreeNavigation } from './tree-navigation'
import { ContentEngine } from './content-engine'
import { ApplicationPanel } from './application-panel'
import { Breadcrumb } from './breadcrumb'

import { sampleCourses } from '@/data/application/courses'
import { sampleGuidance } from '@/data/application/guidance'
import { sevaDomains } from '@/data/application/seva'

interface LibraryLayoutProps {
  children?: React.ReactNode
}

export function LibraryLayout({ children }: LibraryLayoutProps) {
  const isMobile = useIsMobile()
  const { tree, loading: treeLoading } = useLibraryTree()
  const { breadcrumbPath, navigateToBreadcrumb } = useBreadcrumbs()

  const {
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
    currentVerse,
  } = useAppStore()

  // 📱 MOBILE VIEW
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <FilterBar />

        {breadcrumbPath.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-card">
            <Breadcrumb items={breadcrumbPath} onNavigate={navigateToBreadcrumb} />
          </div>
        )}

        <main className="flex-1 overflow-hidden">
          <ContentEngine className="h-full" />
        </main>

        <Sheet open={leftSidebarOpen} onOpenChange={toggleLeftSidebar}>
          <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {treeLoading ? <TreeLoadingState /> : <TreeNavigation tree={tree} className="pt-4" />}
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
            <Menu className="h-4 w-4 mr-2" /> Navigate
          </Button>
          <Button variant="outline" className="flex-1" onClick={toggleRightSidebar}>
            <BookOpen className="h-4 w-4 mr-2" /> Apply
          </Button>
        </div>
      </div>
    )
  }

  // 💻 DESKTOP VIEW
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <FilterBar />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">

          {/* LEFT: Tree Navigation */}
          {leftSidebarOpen && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar border-r border-border">
                {treeLoading ? <TreeLoadingState /> : <TreeNavigation tree={tree} className="h-full" />}
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
            </>
          )}

          {/* CENTER: Content Engine */}
          <ResizablePanel defaultSize={rightSidebarOpen ? 55 : 75} minSize={40}>
            <div className="h-full flex flex-col bg-background">
              {breadcrumbPath.length > 0 && (
                <div className="px-6 py-3 border-b border-border bg-card/50">
                  <Breadcrumb items={breadcrumbPath} onNavigate={navigateToBreadcrumb} />
                </div>
              )}
              <ContentEngine className="flex-1" />
            </div>
          </ResizablePanel>

          {/* RIGHT: Application Panel */}
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

function TreeLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-60">
      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-muted-foreground">Syncing Tree...</span>
    </div>
  )
}
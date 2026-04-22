'use client'

import { create } from 'zustand'
import { TreeNode, Verse, Relations } from './types'
import { VEDIC_TREE } from '@/data/tree/vedic-tree'

// Local type aliases for store-only concerns
type Language = 'en' | 'hi' | 'sa' | 'te'
type ContentTab = 'shloka' | 'meaning' | 'commentary'
type Filters = Record<string, any>

interface AppState {
  // 🔥 Navigation State
  currentNode: TreeNode | null
  expandedNodes: Set<string>
  selectedPath: string[]

  // 📖 Content State
  currentVerse: Verse | null
  activeTab: ContentTab
  activeSampradaya: string

  // 🎛 UI State
  language: Language
  filters: Filters
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  searchQuery: string

  // 📦 Data
  tree: TreeNode[]
  verses: Record<string, Verse>
  relations: Record<string, Relations>

  // ⚙️ Actions
  setCurrentNode: (node: TreeNode | null) => void
  toggleNode: (id: string) => void
  setSelectedPath: (path: string[]) => void
  setCurrentVerse: (verse: Verse | null) => void
  setActiveTab: (tab: ContentTab) => void
  setActiveSampradaya: (sampradaya: string) => void
  setLanguage: (lang: Language) => void
  setFilters: (filters: Partial<Filters>) => void
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setSearchQuery: (query: string) => void
  setTree: (tree: TreeNode[]) => void
  cacheVerse: (id: string, verse: Verse) => void
  cacheRelations: (id: string, relations: Relations) => void
}

export const useAppStore = create<AppState>((set) => ({
  // 🔥 Initial State
  currentNode: null,
  selectedPath: [],
  currentVerse: null,
  activeTab: 'shloka',
  activeSampradaya: 'general',
  // 🎛 UI State
  language: 'en',
  filters: {},
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  searchQuery: '',

  // 🔥 Inject full tree
  tree: [],
  expandedNodes: new Set(), // Initialize empty for hydration

  verses: {},
  relations: {},

  // 🔥 Actions
  setCurrentNode: (node) => set({ currentNode: node }),

  toggleNode: (id) =>
    set((state) => {
      const newExpanded = new Set(state.expandedNodes)
      if (newExpanded.has(id)) {
        newExpanded.delete(id)
      } else {
        newExpanded.add(id)
      }
      return { expandedNodes: newExpanded }
    }),

  setSelectedPath: (path) => set({ selectedPath: path }),

  setCurrentVerse: (verse) => set({ currentVerse: verse }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActiveSampradaya: (sampradaya) =>
    set({ activeSampradaya: sampradaya }),

  setLanguage: (lang) => set({ language: lang }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters }
    })),

  toggleLeftSidebar: () =>
    set((state) => ({
      leftSidebarOpen: !state.leftSidebarOpen
    })),

  toggleRightSidebar: () =>
    set((state) => ({
      rightSidebarOpen: !state.rightSidebarOpen
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setTree: (tree) => set({ tree }),

  cacheVerse: (id, verse) =>
    set((state) => ({
      verses: { ...state.verses, [id]: verse }
    })),

  cacheRelations: (id, relations) =>
    set((state) => ({
      relations: { ...state.relations, [id]: relations }
    })),
}))
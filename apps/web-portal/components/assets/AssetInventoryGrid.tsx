'use client'

import React from 'react'
import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AssetCard } from '@/app/admin/assets/components/AssetCard'

interface AssetInventoryGridProps {
  assets: any[]
  loading: boolean
}

export function AssetInventoryGrid({ assets, loading }: AssetInventoryGridProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-800 py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 text-slate-500">
          <Package className="h-8 w-8" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-200">No assets found</h3>
          <p className="text-slate-400">Try adjusting your search or add a new physical asset.</p>
        </div>
        <Button className="mt-4 bg-indigo-600 text-white hover:bg-indigo-500">
          <Plus className="mr-2 h-4 w-4" />
          Add First Asset
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Download, Settings } from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { AssetStats } from '@/components/assets/AssetStats'
import { AssetInventoryGrid } from '@/components/assets/AssetInventoryGrid'

export default function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Mock Org ID
  const orgId = '5d97f5d9-7e5d-4d97-b5d9-7e5d4d97b5d9' 

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    try {
      setLoading(true)
      const data = await InstitutionalService.getAssets(orgId)
      setAssets(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to manifest institutional assets')
    } finally {
      setLoading(false)
    }
  }

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.assetTag?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen bg-slate-950">
      
      {/* 1. Asset Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-left">
        <div>
          <h1 className="text-4xl font-serif font-bold italic text-slate-100 tracking-tight">Institutional <span className="text-indigo-500">Assets</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Physical Inventory & QR Tracking • Pillar V</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 rounded-xl h-12">
            <Download className="mr-2 h-4 w-4" /> Export Audit
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl h-12 px-8 font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add New Asset
          </Button>
        </div>
      </div>

      {/* 2. Modular Asset Stats */}
      <AssetStats assets={assets} />

      {/* 3. Modular Search and Filters */}
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/40 p-6 md:flex-row md:items-center backdrop-blur-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
          <Input 
            placeholder="Search by name or asset tag..." 
            className="border-slate-800 bg-slate-950/50 pl-12 h-14 rounded-2xl text-slate-100 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl w-14 h-14">
            <Filter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl w-14 h-14">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 4. Modular Asset Inventory Grid */}
      <AssetInventoryGrid assets={filteredAssets} loading={loading} />

    </div>
  )
}

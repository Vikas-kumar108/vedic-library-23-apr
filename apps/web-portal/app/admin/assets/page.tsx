'use client'

import { useState, useEffect } from 'react'
import { Package, Plus, Search, Filter, QrCode, Download, Settings } from 'lucide-react'
import { InstitutionalService } from '@/services/institutional-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AssetCard } from './components/AssetCard'
import { toast } from 'sonner'

export default function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Mock Org ID - in real app would come from context/params
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
      toast.error('Failed to load assets')
    } finally {
      setLoading(false)
    }
  }

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.assetTag?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header Area */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Institutional Assets</h1>
          <p className="text-slate-400">Manage physical inventory and QR-based tracking for the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Export Audit
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-500">
            <Plus className="mr-2 h-4 w-4" />
            Add New Asset
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          { label: 'Total Assets', value: assets.length, icon: Package, color: 'text-indigo-400' },
          { label: 'Asset Value', value: `₹${assets.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}`, icon: Settings, color: 'text-emerald-400' },
          { label: 'Active', value: assets.filter(a => a.status === 'ACTIVE').length, icon: QrCode, color: 'text-blue-400' },
          { label: 'In Maintenance', value: assets.filter(a => a.status === 'MAINTENANCE').length, icon: Filter, color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <div className={`rounded-lg bg-slate-800/50 p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input 
            placeholder="Search by name or asset tag..." 
            className="border-slate-800 bg-slate-950/50 pl-10 text-slate-100 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Asset Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
      ) : filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  )
}

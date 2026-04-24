'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Package, MapPin, User, Tag, MoreHorizontal, History } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface AssetCardProps {
  asset: any
}

export function AssetCard({ asset }: AssetCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'MAINTENANCE': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'RETIRED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20'
    }
  }

  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/10">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{asset.name}</h3>
            <p className="text-xs text-slate-400">{asset.assetTag || asset.serialNumber || 'No Tag'}</p>
          </div>
        </div>
        <Badge variant="outline" className={getStatusColor(asset.status)}>
          {asset.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-4">
          <QRCodeSVG value={asset.qrCode} size={160} level="H" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{asset.location || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{asset.custodian?.name || 'No Custodian'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Tag className="h-3.5 w-3.5" />
            <span>₹{asset.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <History className="h-3.5 w-3.5" />
            <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-slate-800 p-2">
        <div className="flex w-full gap-2">
          <Button variant="ghost" size="sm" className="flex-1 text-xs text-slate-400 hover:text-slate-100">
            <History className="mr-2 h-3.5 w-3.5" />
            History
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-xs text-slate-400 hover:text-slate-100">
            <MoreHorizontal className="mr-2 h-3.5 w-3.5" />
            Options
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

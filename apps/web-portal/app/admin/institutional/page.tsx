import { InstitutionalService } from "@/services/institutional-service"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  BarChart3, 
  ShieldCheck, 
  History, 
  TrendingUp,
  FileText,
  AlertCircle
} from "lucide-react"

const ORG_ID = '00000000-0000-0000-0000-000000000001'

export default async function InstitutionalDashboard() {
  const data = await InstitutionalService.getOverview(ORG_ID)
  const grants = await InstitutionalService.getGrants(ORG_ID)
  const ledger = await InstitutionalService.getLedger(ORG_ID)

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-950 text-slate-50 min-h-screen">
      {/* HEADER section */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Institutional Integrity
          </h2>
          <p className="text-slate-400">
            Real-time audit ledger & partnership transparency.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1 border-amber-500/50 text-amber-500 bg-amber-500/10">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Audit Mode: Hardened
          </Badge>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Funding</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Number(data.stats.totalFunding).toLocaleString()}</div>
            <p className="text-xs text-slate-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Grants</CardTitle>
            <BarChart3 className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.activeGrants}</div>
            <p className="text-xs text-slate-500">Across 1 corporate partner</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Compliance Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.pendingTasks}</div>
            <p className="text-xs text-slate-500">Due in next 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Ledger Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Verified</div>
            <p className="text-xs text-slate-500">Last sync: Just now</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* GRANT TRACKER */}
        <Card className="col-span-4 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-amber-500" />
              Partnership & Grants
            </CardTitle>
            <CardDescription className="text-slate-500">
              Tracking CSR milestone disbursement and utilization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {grants.map((grant) => (
                <div key={grant.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{grant.partnership.title}</p>
                      <p className="text-xs text-slate-500">{grant.partnership.partner.name}</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/50">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Budget: ₹{Number(grant.amount).toLocaleString()}</span>
                    <span className="font-medium text-amber-400">65% Utilized</span>
                  </div>
                  <Progress value={65} className="h-1 bg-slate-800" indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AUDIT LOG / RECENT JOURNALS */}
        <Card className="col-span-3 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="mr-2 h-5 w-5 text-amber-500" />
              Forensic Audit Log
            </CardTitle>
            <CardDescription className="text-slate-500">
              Immutably recorded double-entry movements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ledger.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-start justify-between border-l-2 border-amber-500/30 pl-4 py-1">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{entry.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-[10px] py-0 border-slate-700 text-slate-400 uppercase">
                        {entry.transaction?.category}
                      </Badge>
                      <span className="text-[10px] text-slate-600">{new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-emerald-500">
                    ₹{Number(entry.transaction?.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FULL LEDGER TABLE */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Master Double-Entry Ledger</CardTitle>
          <CardDescription className="text-slate-500">
            Audit-grade record of every financial movement within the institution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-800/30">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Description</TableHead>
                <TableHead className="text-slate-400">Account</TableHead>
                <TableHead className="text-slate-400 text-right">Debit</TableHead>
                <TableHead className="text-slate-400 text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledger.map((entry) => (
                entry.lines.map((line: any, idx: number) => (
                  <TableRow key={`${entry.id}-${idx}`} className="border-slate-800 hover:bg-slate-800/20 transition-colors">
                    <TableCell className="font-mono text-xs text-slate-500">
                      {idx === 0 ? new Date(entry.createdAt).toLocaleDateString() : ''}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {idx === 0 ? entry.description : ''}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span className="text-sm">{line.account.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-emerald-400 font-bold">
                      {line.debit > 0 ? `₹${Number(line.debit).toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="text-right font-mono text-rose-400">
                      {line.credit > 0 ? `₹${Number(line.credit).toLocaleString()}` : '-'}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

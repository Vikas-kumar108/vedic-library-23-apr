import { Metadata } from "next"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/lib/models/user"
import { Donation } from "@/lib/models/donation"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User as UserIcon, Shield, IndianRupee } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Users",
  description: "View all registered users",
}

async function getUsers() {
  await connectToDatabase()

  const users = await User.find().sort({ createdAt: -1 }).lean()

  // Get donation totals for each user
  const userIds = users.map((u) => u._id)
  const donationTotals = await Donation.aggregate([
    { $match: { userId: { $in: userIds }, status: "confirmed" } },
    { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  ])

  const totalMap = new Map(
    donationTotals.map((d) => [d._id.toString(), d.total])
  )

  return users.map((u) => ({
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    isMember: u.isMember,
    createdAt: u.createdAt,
    totalDonated: totalMap.get(u._id.toString()) || 0,
  }))
}

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground mt-1">
          View all registered users and their contributions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>{users.length} users registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Total Donated</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <p className="text-muted-foreground">No users found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {user.role === "admin" ? (
                              <Shield className="size-5 text-primary" />
                            ) : (
                              <UserIcon className="size-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            {user.isMember && (
                              <Badge variant="secondary" className="text-xs">
                                Member
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{user.email}</p>
                          {user.phone && (
                            <p className="text-sm text-muted-foreground">
                              {user.phone}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 font-semibold">
                          <IndianRupee className="size-3" />
                          {user.totalDonated.toLocaleString("en-IN")}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

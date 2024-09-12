import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BarChart as BarChartIcon,
    Users,
    FileText,
    Briefcase,
    DollarSign,
    MapPin,
    Activity,
    UserPlus,

} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import PrivateLayout from '@/components/private-layout'
import { Link } from 'react-router-dom'
import { useStatisticsComparison } from '@/hooks/useStatastics'

const monthlyHires = [
    { name: 'Jan', hires: 12 },
    { name: 'Feb', hires: 19 },
    { name: 'Mar', hires: 15 },
    { name: 'Apr', hires: 22 },
    { name: 'May', hires: 28 },
    { name: 'Jun', hires: 24 },
]

const departmentBudget = [
    { name: 'Engineering', budget: 500000 },
    { name: 'Marketing', budget: 300000 },
    { name: 'Sales', budget: 400000 },
    { name: 'HR', budget: 200000 },
    { name: 'Finance', budget: 250000 },
]

export default function Dashboard() {
    const { data: stats, isLoading } = useStatisticsComparison();

    console.log(stats);

    if (isLoading) return <div>Loading...</div>


    const recentActivities = [
        { id: 1, action: "New employee onboarded", name: "Alice Johnson", department: "Marketing" },
        { id: 2, action: "Leave request approved", name: "Bob Smith", department: "Engineering" },
        { id: 3, action: "Performance review completed", name: "Carol Williams", department: "Sales" },
        { id: 4, action: "Training session scheduled", name: "David Brown", department: "HR" },
    ]

    return (
        <PrivateLayout>
            <main className="flex-1 overflow-y-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCandidates?.count}</div>
                            <p className="text-xs text-muted-foreground">{stats.totalCandidates?.percentageDifference}% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.openPositions}</div>
                            {/* <p className="text-xs text-muted-foreground">4 in final interview stage</p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalApplications.count}</div>
                            <p className="text-xs text-muted-foreground">{stats.totalApplications.percentageDifference}% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.averageSalary.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Hires</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyHires}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="hires" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Budget (static)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={departmentBudget}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <li key={activity.id} className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={activity.name} />
                                            <AvatarFallback>{activity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            <p className="text-sm text-muted-foreground">{activity.name} - {activity.department}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-1/3">Engineering</div>
                                    <div className="w-2/3">
                                        <Progress value={40} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/3">Marketing</div>
                                    <div className="w-2/3">
                                        <Progress value={25} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/3">Sales</div>
                                    <div className="w-2/3">
                                        <Progress value={20} className="w-full" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-1/3">HR</div>
                                    <div className="w-2/3">
                                        <Progress value={15} className="w-full" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Link to="/add-candidate">
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add New Candidate
                            </Button>
                        </Link>
                        <Link to="/open-positions">
                            <Button variant="outline">
                                <Briefcase className="mr-2 h-4 w-4" />
                                Manage Open Positions
                            </Button>
                        </Link>
                        <Link to="/schedule-interview">
                            <Button variant="outline">
                                <Activity className="mr-2 h-4 w-4" />
                                Schedule Interview
                            </Button>
                        </Link>
                        <Link to="/reports">
                            <Button variant="outline">
                                <MapPin className="mr-2 h-4 w-4" />
                                View Reports
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        </PrivateLayout>
    )
}
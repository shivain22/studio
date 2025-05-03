'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileCheck, User, MapPin, ArrowLeft, Filter } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type PlotStatus = 'Pending Field Agent Approval' | 'Pending Supervisor Approval' | 'Approved' | 'Rejected';

const getBadgeVariant = (status: PlotStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
    case 'Pending Supervisor Approval': // Treat as 'approved' by agent
      return 'default';
    case 'Pending Field Agent Approval':
      return 'secondary'; // Use accent or secondary
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function AgentPlotApprovalsPage() {
    // Placeholder data - replace with actual data fetching
   const allPlots: { id: string; plotName: string; farmerName: string; area: number; status: PlotStatus; submissionDate: string }[] = [
    { id: 'plot2', plotName: 'Back Field', farmerName: 'Sita Devi', area: 1.8, status: 'Pending Field Agent Approval', submissionDate: '2024-07-27' },
    { id: 'plot3', plotName: 'North Field', farmerName: 'Gopal Sharma', area: 3.1, status: 'Pending Field Agent Approval', submissionDate: '2024-07-28' },
    { id: 'plot4', plotName: 'West Patch', farmerName: 'Ramesh Kumar', area: 1.2, status: 'Pending Supervisor Approval', submissionDate: '2024-07-26' },
     { id: 'plot5', plotName: 'East Meadow', farmerName: 'Sita Devi', area: 2.0, status: 'Rejected', submissionDate: '2024-07-25' },
  ];

  const [filter, setFilter] = useState<PlotStatus | 'all'>('Pending Field Agent Approval');

  const filteredPlots = allPlots.filter(plot => filter === 'all' || plot.status === filter);


  return (
    <div className="space-y-6">
      <Link href="/dashboard/field-agent" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><FileCheck className="h-6 w-6 text-primary"/> Plot Approvals</CardTitle>
             <CardDescription>Review and approve plot submissions from your assigned farmers.</CardDescription>
           </div>
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground"/>
                <Select value={filter} onValueChange={(value) => setFilter(value as PlotStatus | 'all')}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending Field Agent Approval">Pending My Approval</SelectItem>
                    <SelectItem value="Pending Supervisor Approval">Pending Supervisor</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          {filteredPlots.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No plots match the current filter.</p>
                 {/* Optionally add a button to clear filter */}
                 {filter !== 'all' && (
                    <Button variant="outline" onClick={() => setFilter('all')}>Show All Plots</Button>
                 )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot Name</TableHead>
                  <TableHead>Farmer Name</TableHead>
                   <TableHead>Area (Ha)</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlots.map((plot) => (
                  <TableRow key={plot.id}>
                    <TableCell className="font-medium">{plot.plotName}</TableCell>
                     <TableCell>{plot.farmerName}</TableCell>
                    <TableCell>{plot.area.toFixed(2)}</TableCell>
                    <TableCell>{plot.submissionDate}</TableCell>
                    <TableCell>
                       <Badge variant={getBadgeVariant(plot.status)}>{plot.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/field-agent/plots/${plot.id}/approve`} passHref legacyBehavior>
                         <Button
                           variant={plot.status === 'Pending Field Agent Approval' ? 'default' : 'outline'}
                           size="sm"
                         >
                            {plot.status === 'Pending Field Agent Approval' ? 'Review' : 'View'}
                         </Button>
                       </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

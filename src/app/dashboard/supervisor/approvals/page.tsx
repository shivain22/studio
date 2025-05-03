'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileCheck, User, ChevronsRight, ArrowLeft, Filter } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type PlotStatus = 'Pending Supervisor Approval' | 'Approved' | 'Rejected by Supervisor';

const getBadgeVariant = (status: PlotStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Pending Supervisor Approval':
      return 'secondary'; // Use accent or secondary
    case 'Rejected by Supervisor':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function SupervisorPlotApprovalsPage() {
    // Placeholder data - replace with actual data fetching
   const allPlots: { id: string; plotName: string; farmerName: string; agentName: string; area: number; status: PlotStatus; agentApprovalDate: string }[] = [
    { id: 'plot4', plotName: 'West Patch', farmerName: 'Ramesh Kumar', agentName: 'Anil Gupta', area: 1.2, status: 'Pending Supervisor Approval', agentApprovalDate: '2024-07-28' },
    { id: 'plot6', plotName: 'River Bed Field', farmerName: 'Gopal Sharma', agentName: 'Priya Singh', area: 2.8, status: 'Pending Supervisor Approval', agentApprovalDate: '2024-07-29' },
    { id: 'plot7', plotName: 'Hillside Plot', farmerName: 'Sita Devi', agentName: 'Anil Gupta', area: 0.7, status: 'Approved', agentApprovalDate: '2024-07-27' },
    { id: 'plot8', plotName: 'Roadside Strip', farmerName: 'Ramesh Kumar', agentName: 'Priya Singh', area: 0.5, status: 'Rejected by Supervisor', agentApprovalDate: '2024-07-26' },
  ];

  const [filter, setFilter] = useState<PlotStatus | 'all'>('Pending Supervisor Approval');

  const filteredPlots = allPlots.filter(plot => filter === 'all' || plot.status === filter);


  return (
    <div className="space-y-6">
      <Link href="/dashboard/supervisor" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><FileCheck className="h-6 w-6 text-primary"/> Supervisor Plot Approvals</CardTitle>
             <CardDescription>Review plots approved by Field Agents and provide final approval.</CardDescription>
           </div>
           <div className="flex items-center gap-2">
               <Filter className="h-4 w-4 text-muted-foreground"/>
               <Select value={filter} onValueChange={(value) => setFilter(value as PlotStatus | 'all')}>
                 <SelectTrigger className="w-[200px]">
                   <SelectValue placeholder="Filter by status" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Statuses</SelectItem>
                   <SelectItem value="Pending Supervisor Approval">Pending My Approval</SelectItem>
                   <SelectItem value="Approved">Approved</SelectItem>
                   <SelectItem value="Rejected by Supervisor">Rejected</SelectItem>
                 </SelectContent>
               </Select>
           </div>
        </CardHeader>
        <CardContent>
          {filteredPlots.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No plots match the current filter.</p>
                 {filter !== 'all' && (
                    <Button variant="outline" onClick={() => setFilter('all')}>Show All Plots</Button>
                 )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot Name</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Approved by Agent</TableHead>
                  <TableHead>Area (Ha)</TableHead>
                   <TableHead>Agent Approval Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlots.map((plot) => (
                  <TableRow key={plot.id}>
                    <TableCell className="font-medium">{plot.plotName}</TableCell>
                    <TableCell>{plot.farmerName}</TableCell>
                     <TableCell>{plot.agentName}</TableCell>
                    <TableCell>{plot.area.toFixed(2)}</TableCell>
                     <TableCell>{plot.agentApprovalDate}</TableCell>
                    <TableCell>
                       <Badge variant={getBadgeVariant(plot.status)}>{plot.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/supervisor/approvals/${plot.id}`} passHref legacyBehavior>
                         <Button
                           variant={plot.status === 'Pending Supervisor Approval' ? 'default' : 'outline'}
                           size="sm"
                         >
                            {plot.status === 'Pending Supervisor Approval' ? 'Review' : 'View'}
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

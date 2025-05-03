'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, ArrowLeft, Eye, BarChart2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SupervisorFieldAgentsPage() {
    // Placeholder data - replace with actual data fetching
   const assignedFieldAgents: { id: string; name: string; farmersAssigned: number; pendingApprovals: number; contact: string }[] = [
    { id: 'fa1', name: 'Anil Gupta', farmersAssigned: 15, pendingApprovals: 3, contact: '99XXXXXX01' },
    { id: 'fa2', name: 'Priya Singh', farmersAssigned: 12, pendingApprovals: 1, contact: 'agent2@email.com' },
  ];

   // Add filtering/search state if needed
   // const [searchTerm, setSearchTerm] = useState('');
   // const filteredAgents = assignedFieldAgents.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <Link href="/dashboard/supervisor" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary"/> My Field Agents</CardTitle>
             <CardDescription>View and monitor the performance of your assigned field agents.</CardDescription>
           </div>
           {/* Add Search Input if needed */}
           {/* <Input
             placeholder="Search agents..."
             className="max-w-sm"
             // value={searchTerm}
             // onChange={(e) => setSearchTerm(e.target.value)}
           /> */}
        </CardHeader>
        <CardContent>
          {assignedFieldAgents.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No field agents are currently assigned to you.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Farmers Assigned</TableHead>
                  <TableHead>Pending Plot Reviews</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {/* Replace assignedFieldAgents with filteredAgents if search is implemented */}
                {assignedFieldAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.farmersAssigned}</TableCell>
                    <TableCell>{agent.pendingApprovals}</TableCell>
                    <TableCell>{agent.contact}</TableCell>
                    <TableCell className="flex gap-1">
                       <Link href={`/dashboard/supervisor/field-agents/${agent.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> Details
                         </Button>
                       </Link>
                       {/* Link to agent-specific reports if applicable */}
                       {/* <Link href={`/dashboard/supervisor/reports?agentId=${agent.id}`} passHref legacyBehavior>
                         <Button variant="ghost" size="sm">
                           <BarChart2 className="mr-1 h-3 w-3" /> Reports
                         </Button>
                       </Link> */}
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

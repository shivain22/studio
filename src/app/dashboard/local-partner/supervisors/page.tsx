'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, ArrowLeft, Eye, BarChart2 } from 'lucide-react';

export default function LocalPartnerSupervisorsPage() {
    // Placeholder data - replace with actual data fetching
   const assignedSupervisors: { id: string; name: string; region: string; agentsAssigned: number; totalPlotsOverseen: number }[] = [
    { id: 'sup1', name: 'Rajesh Singh', region: 'North Zone', agentsAssigned: 5, totalPlotsOverseen: 750 },
    { id: 'sup2', name: 'Meena Kumari', region: 'South Zone', agentsAssigned: 4, totalPlotsOverseen: 500 },
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard/local-partner" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader>
             <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary"/> My Supervisors</CardTitle>
             <CardDescription>Monitor the supervisors operating within your region.</CardDescription>
        </CardHeader>
        <CardContent>
          {assignedSupervisors.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No supervisors are currently assigned to your region.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supervisor Name</TableHead>
                  <TableHead>Region/Zone</TableHead>
                  <TableHead>Field Agents</TableHead>
                   <TableHead>Total Plots Overseen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedSupervisors.map((supervisor) => (
                  <TableRow key={supervisor.id}>
                    <TableCell className="font-medium">{supervisor.name}</TableCell>
                     <TableCell>{supervisor.region}</TableCell>
                    <TableCell>{supervisor.agentsAssigned}</TableCell>
                     <TableCell>{supervisor.totalPlotsOverseen}</TableCell>
                    <TableCell className="flex gap-1">
                       <Link href={`/dashboard/local-partner/supervisors/${supervisor.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> Details
                         </Button>
                       </Link>
                        {/* <Link href={`/dashboard/local-partner/reports?supervisorId=${supervisor.id}`} passHref legacyBehavior>
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

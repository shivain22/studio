import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileCheck, Link as LinkIcon } from 'lucide-react';

export function FieldAgentDashboard() {
  // Placeholder data - replace with actual data fetching
  const assignedFarmers = [
    { id: 'farmer1', name: 'Ramesh Kumar', plots: 2 },
    { id: 'farmer2', name: 'Sita Devi', plots: 1 },
  ];
  const pendingApprovals = [
    { id: 'plot3', farmerName: 'Gopal Sharma', plotName: 'North Field', area: 3.1 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Field Agent Dashboard</CardTitle>
          <CardDescription>Oversee your assigned farmers and manage plot approvals.</CardDescription>
        </CardHeader>
        <CardContent>
           {/* Add key stats or overview if needed */}
           <p>Welcome! Here you can manage your farmers and review their plot submissions.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">My Farmers</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           {assignedFarmers.length === 0 ? (
             <p className="text-muted-foreground">No farmers assigned yet.</p>
           ) : (
             <div className="space-y-2">
               {assignedFarmers.map((farmer) => (
                 <div key={farmer.id} className="flex justify-between items-center p-2 border rounded-md">
                   <div>
                     <p className="font-semibold">{farmer.name}</p>
                     <p className="text-sm text-muted-foreground">{farmer.plots} Plot(s)</p>
                   </div>
                   <Link href={`/dashboard/field-agent/farmers/${farmer.id}`} passHref legacyBehavior>
                     <Button variant="outline" size="sm">View Details</Button>
                   </Link>
                 </div>
               ))}
             </div>
           )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Pending Plot Approvals</CardTitle>
           <FileCheck className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           {pendingApprovals.length === 0 ? (
             <p className="text-muted-foreground">No pending approvals.</p>
           ) : (
              <div className="space-y-2">
                {pendingApprovals.map((plot) => (
                  <div key={plot.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                       <p className="font-semibold">{plot.plotName} ({plot.area} Ha)</p>
                       <p className="text-sm text-muted-foreground">Submitted by: {plot.farmerName}</p>
                   </div>
                    <Link href={`/dashboard/field-agent/plots/${plot.id}/approve`} passHref legacyBehavior>
                     <Button variant="default" size="sm">Review</Button>
                   </Link>
                 </div>
               ))}
              </div>
           )}
            <Link href="/dashboard/field-agent/plots" passHref legacyBehavior>
              <Button variant="link" className="mt-4 p-0 h-auto">View All Plot Approvals</Button>
            </Link>
        </CardContent>
      </Card>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Quick Links</CardTitle>
           <LinkIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-2">
            <Link href="/dashboard/field-agent/farmers" passHref legacyBehavior>
              <Button variant="outline">Manage Farmers</Button>
            </Link>
            <Link href="/dashboard/field-agent/plots" passHref legacyBehavior>
              <Button variant="outline">Manage Plot Approvals</Button>
            </Link>
        </CardContent>
      </Card>

    </div>
  );
}

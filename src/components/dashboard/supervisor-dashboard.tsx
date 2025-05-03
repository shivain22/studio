import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileCheck, BarChart2, Link as LinkIcon } from 'lucide-react';

export function SupervisorDashboard() {
  // Placeholder data - replace with actual data fetching
  const assignedFieldAgents = [
    { id: 'fa1', name: 'Anil Gupta', farmers: 15 },
    { id: 'fa2', name: 'Priya Singh', farmers: 12 },
  ];
  const pendingSupervisorApprovals = [
    { id: 'plot4', farmerName: 'Ramesh Kumar', plotName: 'Field A', agentName: 'Anil Gupta' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supervisor Dashboard</CardTitle>
          <CardDescription>Monitor your field agents and approve submitted plots.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Oversee the activities of your team and ensure data accuracy.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">My Field Agents</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {assignedFieldAgents.length === 0 ? (
            <p className="text-muted-foreground">No field agents assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {assignedFieldAgents.map((agent) => (
                <div key={agent.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.farmers} Farmer(s) Assigned</p>
                  </div>
                  <Link href={`/dashboard/supervisor/field-agents/${agent.id}`} passHref legacyBehavior>
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
          <CardTitle className="text-lg font-medium">Pending Supervisor Approvals</CardTitle>
          <FileCheck className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {pendingSupervisorApprovals.length === 0 ? (
            <p className="text-muted-foreground">No pending approvals requiring your review.</p>
          ) : (
            <div className="space-y-2">
              {pendingSupervisorApprovals.map((plot) => (
                <div key={plot.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">{plot.plotName} (Farmer: {plot.farmerName})</p>
                    <p className="text-sm text-muted-foreground">Approved by Agent: {plot.agentName}</p>
                  </div>
                  <Link href={`/dashboard/supervisor/approvals/${plot.id}`} passHref legacyBehavior>
                    <Button variant="default" size="sm">Review & Approve</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
           <Link href="/dashboard/supervisor/approvals" passHref legacyBehavior>
              <Button variant="link" className="mt-4 p-0 h-auto">View All Pending Approvals</Button>
            </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Reports</CardTitle>
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground mb-2">Access performance and progress reports for your area.</p>
           <Link href="/dashboard/supervisor/reports" passHref legacyBehavior>
              <Button variant="outline">View Reports</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}

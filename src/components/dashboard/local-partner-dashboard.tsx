import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart2, TrendingUp, Link as LinkIcon } from 'lucide-react';

export function LocalPartnerDashboard() {
  // Placeholder data - replace with actual data fetching
  const assignedSupervisors = [
    { id: 'sup1', name: 'Rajesh Singh', agents: 5, region: 'North Zone' },
    { id: 'sup2', name: 'Meena Kumari', agents: 4, region: 'South Zone' },
  ];
  const totalPlots = 1250;
  const totalHectares = 875.5;
  const pendingApprovals = 45;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Local Partner Dashboard</CardTitle>
          <CardDescription>Monitor regional progress and manage supervisors.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get an overview of the AWD program performance in your assigned region.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Plots Registered</CardTitle>
             <MapPin className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalPlots}</div>
             <p className="text-xs text-muted-foreground">Across all supervisors</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Area (Hectares)</CardTitle>
             <AreaChart className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalHectares} Ha</div>
             <p className="text-xs text-muted-foreground">Under AWD program</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
             <FileCheck className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{pendingApprovals}</div>
             <p className="text-xs text-muted-foreground">Awaiting final review</p>
           </CardContent>
         </Card>
      </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">My Supervisors</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {assignedSupervisors.length === 0 ? (
            <p className="text-muted-foreground">No supervisors assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {assignedSupervisors.map((supervisor) => (
                <div key={supervisor.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">{supervisor.name} ({supervisor.region})</p>
                    <p className="text-sm text-muted-foreground">{supervisor.agents} Field Agent(s)</p>
                  </div>
                  <Link href={`/dashboard/local-partner/supervisors/${supervisor.id}`} passHref legacyBehavior>
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
          <CardTitle className="text-lg font-medium">Regional Reports</CardTitle>
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">Analyze performance data across different zones and supervisors.</p>
          <Link href="/dashboard/local-partner/reports" passHref legacyBehavior>
            <Button variant="outline">Generate & View Reports</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Icons (assuming they might be needed for stats cards)
function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function AreaChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 12v5h12V8l-5 5-4-4Z" />

    </svg>
  )
}


function FileCheck(props: React.SVGProps<SVGSVGElement>) {
 return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  )
}

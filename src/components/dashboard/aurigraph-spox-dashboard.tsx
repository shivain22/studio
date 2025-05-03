import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart2, Globe, TrendingUp, Link as LinkIcon } from 'lucide-react';

export function AurigraphSpoxDashboard() {
  // Placeholder data - replace with actual data fetching
  const localPartners = [
    { id: 'lp1', name: 'Partner Org A', region: 'Northern India' },
    { id: 'lp2', name: 'Partner Org B', region: 'Southern India' },
  ];
   const totalPlots = 5800;
   const totalHectares = 3200.7;
   const totalFarmers = 2150;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Aurigraph Spox Dashboard</CardTitle>
          <CardDescription>High-level overview of the entire RiceWise AWD project.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Monitor project performance across all regions and local partners.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Registered Plots</CardTitle>
             <MapPin className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalPlots}</div>
             <p className="text-xs text-muted-foreground">Across all partners</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Area (Hectares)</CardTitle>
             <AreaChart className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalHectares} Ha</div>
             <p className="text-xs text-muted-foreground">Under AWD program nationally</p>
           </CardContent>
         </Card>
          <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Total Farmers Involved</CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{totalFarmers}</div>
             <p className="text-xs text-muted-foreground">Participating in the program</p>
           </CardContent>
         </Card>
      </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Local Partners</CardTitle>
          <Globe className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {localPartners.length === 0 ? (
            <p className="text-muted-foreground">No local partners onboarded yet.</p>
          ) : (
            <div className="space-y-2">
              {localPartners.map((partner) => (
                <div key={partner.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">Region: {partner.region}</p>
                  </div>
                  <Link href={`/dashboard/aurigraph-spox/local-partners/${partner.id}`} passHref legacyBehavior>
                    <Button variant="outline" size="sm">View Performance</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Project Overview & Reports</CardTitle>
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">Access comprehensive project reports and analytics.</p>
          <Link href="/dashboard/aurigraph-spox/overview" passHref legacyBehavior>
            <Button variant="outline">View Project Overview</Button>
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
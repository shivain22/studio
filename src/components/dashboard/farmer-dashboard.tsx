import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MapPin, Activity } from 'lucide-react';

export function FarmerDashboard() {
  // Placeholder data - replace with actual data fetching
  const plots = [
    { id: 'plot1', name: 'Field A', area: 2.5, status: 'Approved' },
    { id: 'plot2', name: 'Back Field', area: 1.8, status: 'Pending Approval' },
  ];
  const recentActivity = [
    { id: 'act1', description: 'Uploaded photo for Field A', date: '2024-07-28' },
    { id: 'act2', description: 'Registered Back Field', date: '2024-07-27' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Farmer!</CardTitle>
          <CardDescription>Manage your plots and track your AWD progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for all activities related to the RiceWise AWD program.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">My Plots</CardTitle>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           {plots.length === 0 ? (
             <div className="text-center py-4">
                <p className="text-muted-foreground mb-2">You haven't registered any plots yet.</p>
                 <Link href="/dashboard/farmer/plots/register" passHref legacyBehavior>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Register Your First Plot
                    </Button>
                </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {plots.map((plot) => (
                <div key={plot.id} className="flex justify-between items-center p-2 border rounded-md">
                   <div>
                      <p className="font-semibold">{plot.name}</p>
                      <p className="text-sm text-muted-foreground">{plot.area} Hectares - Status: {plot.status}</p>
                  </div>
                   <Link href={`/dashboard/farmer/plots/${plot.id}`} passHref legacyBehavior>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </div>
              ))}
               <Link href="/dashboard/farmer/plots/register" passHref legacyBehavior>
                  <Button variant="default" className="mt-4 w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Register New Plot
                  </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
           <Activity className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           {recentActivity.length === 0 ? (
             <p className="text-muted-foreground">No recent activity.</p>
           ) : (
              <ul className="space-y-2">
                 {recentActivity.map((activity) => (
                   <li key={activity.id} className="text-sm text-muted-foreground">
                      {activity.date}: {activity.description}
                  </li>
                ))}
              </ul>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

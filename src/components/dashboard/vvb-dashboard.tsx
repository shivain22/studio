import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, FileText, BarChart2, Link as LinkIcon } from 'lucide-react';

export function VvbDashboard() {
  // Placeholder data - replace with actual data fetching
  const validationTasks = [
    { id: 'task1', region: 'North Zone', type: 'Plot Data Verification', status: 'Pending' },
    { id: 'task2', region: 'South Zone', type: 'AWD Practice Audit', status: 'In Progress' },
  ];
  const completedReports = 5;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VVB Dashboard</CardTitle>
          <CardDescription>Manage and execute validation and verification tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Access assigned tasks and submit your validation reports.</p>
        </CardContent>
      </Card>

       <div className="grid gap-4 md:grid-cols-2">
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
             <CheckSquare className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{validationTasks.filter(t => t.status === 'Pending').length}</div>
             <p className="text-xs text-muted-foreground">Tasks awaiting initiation</p>
           </CardContent>
         </Card>
          <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
             <FileText className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{completedReports}</div>
             <p className="text-xs text-muted-foreground">Validation reports submitted</p>
           </CardContent>
         </Card>
       </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Assigned Validation Tasks</CardTitle>
          <CheckSquare className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {validationTasks.length === 0 ? (
            <p className="text-muted-foreground">No validation tasks assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {validationTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-semibold">{task.type} ({task.region})</p>
                    <p className="text-sm text-muted-foreground">Status: {task.status}</p>
                  </div>
                  <Link href={`/dashboard/vvb/validation/${task.id}`} passHref legacyBehavior>
                    <Button variant="outline" size="sm">View Task</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
           <Link href="/dashboard/vvb/validation" passHref legacyBehavior>
              <Button variant="link" className="mt-4 p-0 h-auto">View All Tasks</Button>
            </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Validation Reports</CardTitle>
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">Access submitted reports and reporting tools.</p>
          <Link href="/dashboard/vvb/reports" passHref legacyBehavior>
            <Button variant="outline">View/Submit Reports</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

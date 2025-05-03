'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MapPin, Eye, ArrowLeft } from 'lucide-react';

// Define plot status types
type PlotStatus = 'Pending Approval' | 'Approved' | 'Rejected';

// Function to determine badge variant based on status
const getBadgeVariant = (status: PlotStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
      return 'default'; // Use primary color (Earthy Green)
    case 'Pending Approval':
      return 'secondary'; // Use accent color (Golden Yellow) - Requires adjusting badge variants or direct styling if needed. Let's use secondary for now.
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};


export default function MyPlotsPage() {
  // Placeholder data - replace with actual data fetching
  const plots: { id: string; name: string; area: number; status: PlotStatus; submissionDate: string }[] = [
    { id: 'plot1', name: 'Field A', area: 2.5, status: 'Approved', submissionDate: '2024-07-25' },
    { id: 'plot2', name: 'Back Field', area: 1.8, status: 'Pending Approval', submissionDate: '2024-07-27' },
    { id: 'plot3', name: 'South Patch', area: 0.9, status: 'Rejected', submissionDate: '2024-07-20' },
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard/farmer" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/> My Registered Plots</CardTitle>
             <CardDescription>View the status of your submitted plots.</CardDescription>
           </div>
            <Link href="/dashboard/farmer/plots/add-map" passHref legacyBehavior>
               <Button>
                 <PlusCircle className="mr-2 h-4 w-4" /> Add New Plot
               </Button>
            </Link>
        </CardHeader>
        <CardContent>
          {plots.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't registered any plots yet.</p>
                 <Link href="/dashboard/farmer/plots/add-map" passHref legacyBehavior>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Plot
                    </Button>
                </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot Name</TableHead>
                  <TableHead>Area (Ha)</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plots.map((plot) => (
                  <TableRow key={plot.id}>
                    <TableCell className="font-medium">{plot.name}</TableCell>
                    <TableCell>{plot.area.toFixed(2)}</TableCell>
                    <TableCell>{plot.submissionDate}</TableCell>
                    <TableCell>
                       <Badge variant={getBadgeVariant(plot.status)}>{plot.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/farmer/plots/${plot.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> View
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

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, FileText, Camera, Edit, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


// Define plot status types
type PlotStatus = 'Pending Approval' | 'Approved' | 'Rejected';

// Function to determine badge variant based on status
const getBadgeVariant = (status: PlotStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
      return 'default'; // Use primary color (Earthy Green)
    case 'Pending Approval':
      return 'secondary'; // Use accent or secondary color
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function PlotDetailsPage({ params }: { params: { plotId: string } }) {
  const { plotId } = params;
  const { toast } = useToast();

  // Placeholder data - replace with actual data fetching based on plotId
  const plot = {
    id: plotId,
    name: 'Back Field',
    area: 1.8,
    status: 'Pending Approval' as PlotStatus,
    submissionDate: '2024-07-27',
    propertyRecordUrl: 'https://picsum.photos/seed/propdoc/300/200', // Placeholder
    plotPhotoUrl: 'https://picsum.photos/seed/plotphoto/400/300', // Placeholder
    notes: 'Located near the river, requires careful water management.',
    rejectionReason: null as string | null, // Add rejection reason if status is Rejected
  };
  // Example for rejected plot:
  // const plot = { id: 'plot3', name: 'South Patch', area: 0.9, status: 'Rejected' as PlotStatus, submissionDate: '2024-07-20', propertyRecordUrl: '#', plotPhotoUrl: '#', notes: '', rejectionReason: 'Property document unclear.' };


  if (!plot) {
    // Handle plot not found
    return (
       <div className="space-y-6">
          <Link href="/dashboard/farmer/plots" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to My Plots
          </Link>
           <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Plot not found.</AlertDescription>
          </Alert>
       </div>
    );
  }

  const handleDelete = () => {
      console.log(`Deleting plot ${plotId}`);
      // Add API call logic here
      toast({
          title: "Plot Deletion Requested",
          description: `Request to delete plot ${plot.name} submitted. (Placeholder)`,
        });
      // Optionally redirect after deletion: router.push('/dashboard/farmer/plots');
  };

  return (
    <div className="space-y-6">
       <Link href="/dashboard/farmer/plots" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to My Plots
       </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
             <div>
               <CardTitle className="flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/> {plot.name}</CardTitle>
               <CardDescription>Details for plot ID: {plot.id}</CardDescription>
             </div>
             <Badge variant={getBadgeVariant(plot.status)} className="text-base px-3 py-1">{plot.status}</Badge>
           </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
           <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Plot Information</h3>
                <p><span className="font-medium">Area:</span> {plot.area.toFixed(2)} Hectares</p>
                <p><span className="font-medium">Submission Date:</span> {plot.submissionDate}</p>
                {plot.notes && <p><span className="font-medium">Notes:</span> {plot.notes}</p>}
                 {plot.status === 'Rejected' && plot.rejectionReason && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertTitle>Rejection Reason</AlertTitle>
                      <AlertDescription>{plot.rejectionReason}</AlertDescription>
                    </Alert>
                  )}
             </div>

              <div className="space-y-2">
                 <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5"/> Property Record</h3>
                 <Image
                    src={plot.propertyRecordUrl}
                    alt="Property Record"
                    data-ai-hint="document paper"
                    width={300}
                    height={200}
                    className="rounded border object-contain"
                 />
                  {/* Add a link to view/download the full document if needed */}
                  {/* <Link href={plot.propertyRecordUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" size="sm">View Full Document</Button>
                  </Link> */}
             </div>
           </div>

           <div className="space-y-4">
               <h3 className="font-semibold flex items-center gap-2"><Camera className="h-5 w-5"/> Plot Photo (with AWD Pipe)</h3>
                 <Image
                    src={plot.plotPhotoUrl}
                    alt="Plot Photo with AWD Pipe"
                    data-ai-hint="rice field pipe"
                    width={400}
                    height={300}
                    className="rounded border object-cover"
                 />
           </div>
        </CardContent>
         {/* Action Buttons - Conditionally render based on status */}
         {(plot.status === 'Pending Approval' || plot.status === 'Rejected') && (
           <CardFooter className="flex justify-end gap-2">
                <Link href={`/dashboard/farmer/plots/${plotId}/edit`} passHref legacyBehavior>
                   <Button variant="outline">
                     <Edit className="mr-2 h-4 w-4" /> Edit Submission
                   </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="destructive">
                       <Trash2 className="mr-2 h-4 w-4" /> Delete Submission
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        plot submission for "{plot.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
           </CardFooter>
         )}
      </Card>
    </div>
  );
}

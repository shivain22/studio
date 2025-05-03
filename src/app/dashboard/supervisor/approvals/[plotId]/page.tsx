'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, FileText, Camera, CheckCircle, XCircle, User, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// Define plot status types relevant to Supervisor
type PlotStatusSup = 'Pending Supervisor Approval' | 'Approved' | 'Rejected by Supervisor';

// Function to determine badge variant based on status
const getBadgeVariant = (status: PlotStatusSup): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Pending Supervisor Approval':
      return 'secondary';
    case 'Rejected by Supervisor':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function SupervisorPlotReviewPage({ params }: { params: { plotId: string } }) {
  const { plotId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - replace with actual data fetching based on plotId
  const plot = {
    id: plotId,
    plotName: 'West Patch',
    farmerName: 'Ramesh Kumar',
    agentName: 'Anil Gupta',
    area: 1.8,
    status: 'Pending Supervisor Approval' as PlotStatusSup,
    submissionDate: '2024-07-26',
    agentApprovalDate: '2024-07-28',
    propertyRecordUrl: 'https://picsum.photos/seed/propdoc/300/200', // Placeholder
    plotPhotoUrl: 'https://picsum.photos/seed/plotphoto/400/300', // Placeholder
    farmerNotes: 'Near main road access.',
    agentNotes: 'Verified pipe installation and documents look okay.', // Notes from Field Agent if available
  };

   if (!plot) {
    // Handle plot not found
    return (
       <div className="space-y-6">
          <Link href="/dashboard/supervisor/approvals" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Approvals List
          </Link>
           <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Plot submission not found or already processed.</AlertDescription>
          </Alert>
       </div>
    );
  }

  const handleApproval = async (approve: boolean) => {
     if (!approve && !rejectionReason.trim()) {
         toast({
            title: "Rejection Reason Required",
            description: "Please provide a reason for rejecting this submission.",
            variant: "destructive",
         });
         return;
     }

     setIsLoading(true);
     // Placeholder for API call
     console.log(`Action: ${approve ? 'Final Approving' : 'Rejecting'} plot ${plotId}`);
     if (!approve) {
         console.log(`Rejection Reason: ${rejectionReason}`);
     }

     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

     toast({
        title: `Plot ${approve ? 'Approved' : 'Rejected'}`,
        description: `Plot ${plot.plotName} has been ${approve ? 'granted final approval' : 'rejected'}.`,
     });
     setIsLoading(false);
     router.push('/dashboard/supervisor/approvals');
  };


  return (
    <div className="space-y-6">
       <Link href="/dashboard/supervisor/approvals" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Approvals List
       </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
             <div>
               <CardTitle className="flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/> Supervisor Review: {plot.plotName}</CardTitle>
               <CardDescription>Farmer: {plot.farmerName} | Agent: {plot.agentName} | Submitted: {plot.submissionDate} | Agent Approved: {plot.agentApprovalDate}</CardDescription>
             </div>
             <Badge variant={getBadgeVariant(plot.status)} className="text-base px-3 py-1">{plot.status}</Badge>
           </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
           <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Plot Information</h3>
                <p><span className="font-medium">Area:</span> {plot.area.toFixed(2)} Hectares</p>
                {plot.farmerNotes && <p><span className="font-medium">Farmer's Notes:</span> {plot.farmerNotes}</p>}
                 {plot.agentNotes && <p className="mt-2 p-2 bg-secondary rounded"><span className="font-medium text-sm">Agent Notes:</span> <span className="text-sm text-muted-foreground">{plot.agentNotes}</span></p>}
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

           {/* Approval/Rejection Form - Only show if pending supervisor approval */}
            {plot.status === 'Pending Supervisor Approval' && (
              <div className="md:col-span-2 mt-4 border-t pt-4">
                 <h3 className="font-semibold mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Rejection Reason (if rejecting)</h3>
                   <Label htmlFor="rejectionReason" className="sr-only">Rejection Reason</Label>
                    <Textarea
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Provide clear feedback if rejecting the submission..."
                        rows={3}
                        disabled={isLoading}
                    />
              </div>
            )}

        </CardContent>
        {/* Action Buttons - Show based on status */}
         <CardFooter className="flex justify-end gap-2 border-t pt-4">
           {plot.status === 'Pending Supervisor Approval' && (
             <>
               <Button variant="destructive" onClick={() => handleApproval(false)} disabled={isLoading}>
                  <XCircle className="mr-2 h-4 w-4" /> {isLoading ? 'Rejecting...' : 'Reject'}
                </Button>
               <Button variant="default" onClick={() => handleApproval(true)} disabled={isLoading}>
                   <CheckCircle className="mr-2 h-4 w-4" /> {isLoading ? 'Final Approve' : 'Final Approve'}
                </Button>
             </>
           )}
            {plot.status !== 'Pending Supervisor Approval' && (
                <p className="text-sm text-muted-foreground">This plot has already been reviewed.</p>
            )}
         </CardFooter>

      </Card>
    </div>
  );
}

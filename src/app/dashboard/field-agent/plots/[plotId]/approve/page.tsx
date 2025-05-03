'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, FileText, Camera, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';


// Define plot status types relevant to Field Agent
type PlotStatusFA = 'Pending Field Agent Approval' | 'Pending Supervisor Approval' | 'Rejected';

// Function to determine badge variant based on status
const getBadgeVariant = (status: PlotStatusFA): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Pending Supervisor Approval':
      return 'default';
    case 'Pending Field Agent Approval':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};


export default function AgentPlotReviewPage({ params }: { params: { plotId: string } }) {
  const { plotId } = params;
  const router = useRouter();
  const { toast } = useToast();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - replace with actual data fetching based on plotId
  const plot = {
    id: plotId,
    plotName: 'Back Field',
    farmerName: 'Sita Devi',
    area: 1.8,
    status: 'Pending Field Agent Approval' as PlotStatusFA,
    submissionDate: '2024-07-27',
    propertyRecordUrl: 'https://picsum.photos/seed/propdoc/300/200', // Placeholder
    plotPhotoUrl: 'https://picsum.photos/seed/plotphoto/400/300', // Placeholder
    farmerNotes: 'Located near the river, requires careful water management.',
  };

   if (!plot) {
    // Handle plot not found
    return (
       <div className="space-y-6">
          <Link href="/dashboard/field-agent/plots" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Plot Approvals
          </Link>
           <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Plot submission not found.</AlertDescription>
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
     console.log(`Action: ${approve ? 'Approving' : 'Rejecting'} plot ${plotId}`);
     if (!approve) {
         console.log(`Rejection Reason: ${rejectionReason}`);
     }

     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

     toast({
        title: `Plot ${approve ? 'Approved' : 'Rejected'}`,
        description: `Plot ${plot.plotName} has been ${approve ? 'approved and sent for supervisor review' : 'rejected'}.`,
     });
     setIsLoading(false);
     router.push('/dashboard/field-agent/plots');
  };


  return (
    <div className="space-y-6">
       <Link href="/dashboard/field-agent/plots" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Plot Approvals
       </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
             <div>
               <CardTitle className="flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/> Review Plot: {plot.plotName}</CardTitle>
               <CardDescription>Submitted by: {plot.farmerName} on {plot.submissionDate}</CardDescription>
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

           {/* Approval/Rejection Form - Only show if pending agent approval */}
            {plot.status === 'Pending Field Agent Approval' && (
              <div className="md:col-span-2 mt-4 border-t pt-4">
                 <h3 className="font-semibold mb-2 flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Rejection Reason (if rejecting)</h3>
                   <Label htmlFor="rejectionReason" className="sr-only">Rejection Reason</Label>
                    <Textarea
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Provide clear feedback to the farmer if rejecting..."
                        rows={3}
                        disabled={isLoading}
                    />
              </div>
            )}

        </CardContent>
        {/* Action Buttons - Show based on status */}
         <CardFooter className="flex justify-end gap-2 border-t pt-4">
           {plot.status === 'Pending Field Agent Approval' && (
             <>
               <Button variant="destructive" onClick={() => handleApproval(false)} disabled={isLoading}>
                  <XCircle className="mr-2 h-4 w-4" /> {isLoading ? 'Rejecting...' : 'Reject'}
                </Button>
               <Button variant="default" onClick={() => handleApproval(true)} disabled={isLoading}>
                   <CheckCircle className="mr-2 h-4 w-4" /> {isLoading ? 'Approving...' : 'Approve & Send to Supervisor'}
                </Button>
             </>
           )}
            {plot.status !== 'Pending Field Agent Approval' && (
                <p className="text-sm text-muted-foreground">This plot has already been reviewed.</p>
            )}
         </CardFooter>

      </Card>
    </div>
  );
}

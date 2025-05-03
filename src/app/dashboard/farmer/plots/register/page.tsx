'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, MapPin, FileText, Camera } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPlotPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [plotName, setPlotName] = useState('');
  const [hectares, setHectares] = useState('');
  const [propertyRecord, setPropertyRecord] = useState<File | null>(null);
  const [plotPhoto, setPlotPhoto] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setter(event.target.files[0]);
    } else {
      setter(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!plotName || !hectares || !propertyRecord || !plotPhoto) {
       toast({
         title: "Missing Information",
         description: "Please fill in all fields and upload both required files.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
    }

     if (isNaN(parseFloat(hectares)) || parseFloat(hectares) <= 0) {
        toast({
          title: "Invalid Area",
          description: "Please enter a valid positive number for hectares.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }


    // Placeholder for actual submission logic (e.g., API call)
    console.log('Submitting plot:', { plotName, hectares, propertyRecord, plotPhoto, notes });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: "Plot Registered Successfully",
      description: `${plotName} has been submitted for approval.`,
    });

    // Redirect back to the farmer's plot list or dashboard
    router.push('/dashboard/farmer/plots'); // Or '/dashboard/farmer'
  };

  return (
    <div className="space-y-6">
        <Link href="/dashboard/farmer" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
        </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/> Register New Plot</CardTitle>
          <CardDescription>Enter the details for your new plot and upload the required documents and photos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="plotName">Plot Name / Identifier</Label>
              <Input
                id="plotName"
                value={plotName}
                onChange={(e) => setPlotName(e.target.value)}
                placeholder="e.g., North Field, Plot #123"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hectares">Area in Hectares</Label>
              <Input
                id="hectares"
                type="number"
                step="0.01"
                min="0.01"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                placeholder="e.g., 2.5"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyRecord" className="flex items-center gap-2"><FileText className="h-4 w-4"/> Property Record (PDF, JPG, PNG)</Label>
              <div className="flex items-center gap-2">
                 <Input
                   id="propertyRecord"
                   type="file"
                   accept=".pdf,.jpg,.jpeg,.png"
                   onChange={handleFileChange(setPropertyRecord)}
                   required
                   className="flex-grow"
                   disabled={isLoading}
                 />
                 {propertyRecord && <span className="text-sm text-muted-foreground truncate max-w-xs">{propertyRecord.name}</span>}
              </div>
                 <p className="text-xs text-muted-foreground">Upload a clear scan or photo of the property document.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plotPhoto" className="flex items-center gap-2"><Camera className="h-4 w-4"/> Photo of Plot with AWD Pipe (JPG, PNG)</Label>
               <div className="flex items-center gap-2">
                 <Input
                   id="plotPhoto"
                   type="file"
                   accept=".jpg,.jpeg,.png"
                   capture="environment" // Suggest using the camera on mobile
                   onChange={handleFileChange(setPlotPhoto)}
                   required
                   className="flex-grow"
                   disabled={isLoading}
                 />
                 {plotPhoto && <span className="text-sm text-muted-foreground truncate max-w-xs">{plotPhoto.name}</span>}
               </div>
                <p className="text-xs text-muted-foreground">Take or upload a photo showing the installed AWD pipe clearly visible in the plot.</p>
            </div>

             <div className="space-y-2">
               <Label htmlFor="notes">Additional Notes (Optional)</Label>
               <Textarea
                 id="notes"
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 placeholder="Any relevant details about the plot, location landmarks, etc."
                 disabled={isLoading}
               />
             </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
               {isLoading ? 'Submitting...' : <> <Upload className="mr-2 h-4 w-4" /> Submit Plot for Approval </>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, Download, Filter } from 'lucide-react';
import { DatePickerWithRange } from '@/components/ui/date-range-picker'; // Assume this component exists or needs creation
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


// Helper function to get the display name for a role
const getRoleDisplayName = (role: string): string => {
  return role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export default function GenericReportsPage({ params }: { params: { role: string } }) {
   const { role } = params;
   const roleDisplayName = getRoleDisplayName(role);

   // Placeholder state for filters
   // const [dateRange, setDateRange] = useState<DateRange | undefined>();
   // const [reportType, setReportType] = useState<string>('');

   const handleGenerateReport = () => {
       console.log("Generating report...");
       // Add report generation logic based on filters
   }

   if (role === 'farmer') {
      // Farmers likely don't have a dedicated reports section in this design
       return (
          <div className="space-y-6">
              <Link href={`/dashboard/${role}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                 <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Dashboard
               </Link>
             <p>Reports are not available for this role.</p>
          </div>
       )
   }

  return (
    <div className="space-y-6">
       <Link href={`/dashboard/${role}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to {roleDisplayName} Dashboard
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart2 className="h-6 w-6 text-primary"/> Reports</CardTitle>
          <CardDescription>Generate and view reports based on various criteria.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-4 items-end mb-6 p-4 border rounded-lg">
                {/* Placeholder for Date Range Picker */}
                {/* <div className="flex flex-col gap-1">
                    <Label>Date Range</Label>
                    <DatePickerWithRange onDateChange={setDateRange} />
                 </div> */}
                 <div className="flex flex-col gap-1">
                    <Label>Report Type</Label>
                    <Select
                        // value={reportType}
                        // onValueChange={setReportType}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Populate based on role */}
                        {role === 'supervisor' && <SelectItem value="agent_performance">Agent Performance</SelectItem>}
                        {role === 'supervisor' && <SelectItem value="plot_status_summary">Plot Status Summary</SelectItem>}
                         {role === 'local-partner' && <SelectItem value="supervisor_summary">Supervisor Summary</SelectItem>}
                         {role === 'local-partner' && <SelectItem value="regional_overview">Regional Overview</SelectItem>}
                         {role === 'aurigraph-spox' && <SelectItem value="partner_performance">Partner Performance</SelectItem>}
                         {role === 'aurigraph-spox' && <SelectItem value="national_summary">National Summary</SelectItem>}
                         {role === 'vvb' && <SelectItem value="validation_summary">Validation Summary</SelectItem>}
                         {role === 'vvb' && <SelectItem value="task_completion">Task Completion Report</SelectItem>}
                      </SelectContent>
                    </Select>
                 </div>
                {/* Add more filters as needed (e.g., Agent, Supervisor, Region) */}

                <Button onClick={handleGenerateReport} className="ml-auto">
                   <Download className="mr-2 h-4 w-4"/> Generate Report
                </Button>
            </div>

            {/* Placeholder for displaying the generated report */}
            <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Select filters and click "Generate Report" to view data.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}


// Function to generate static paths for each role (optional but good for performance)
export async function generateStaticParams() {
  const roles = ['field-agent', 'supervisor', 'local-partner', 'aurigraph-spox', 'vvb']; // Exclude farmer
  return roles.map((role) => ({
    role: role,
  }));
}

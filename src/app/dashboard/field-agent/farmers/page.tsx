'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, ArrowLeft, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AgentFarmersPage() {
    // Placeholder data - replace with actual data fetching
   const assignedFarmers: { id: string; name: string; plotsRegistered: number; village: string; contact: string }[] = [
    { id: 'farmer1', name: 'Ramesh Kumar', plotsRegistered: 2, village: 'Village A', contact: '98XXXXXX01' },
    { id: 'farmer2', name: 'Sita Devi', plotsRegistered: 1, village: 'Village B', contact: 'farmer2@email.com' },
     { id: 'farmer3', name: 'Gopal Sharma', plotsRegistered: 1, village: 'Village A', contact: '97XXXXXX03' },
  ];

   // Add filtering/search state if needed
   // const [searchTerm, setSearchTerm] = useState('');
   // const filteredFarmers = assignedFarmers.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.village.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <Link href="/dashboard/field-agent" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary"/> My Assigned Farmers</CardTitle>
             <CardDescription>View and manage the farmers assigned to you.</CardDescription>
           </div>
           {/* Add Search Input if needed */}
           {/* <Input
             placeholder="Search farmers..."
             className="max-w-sm"
             // value={searchTerm}
             // onChange={(e) => setSearchTerm(e.target.value)}
           /> */}
        </CardHeader>
        <CardContent>
          {assignedFarmers.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No farmers are currently assigned to you.</p>
                {/* Optionally add instructions or contact info */}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farmer Name</TableHead>
                   <TableHead>Village</TableHead>
                  <TableHead>Plots Registered</TableHead>
                   <TableHead>Contact Info</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {/* Replace assignedFarmers with filteredFarmers if search is implemented */}
                {assignedFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>{farmer.village}</TableCell>
                    <TableCell>{farmer.plotsRegistered}</TableCell>
                     <TableCell>{farmer.contact}</TableCell>
                    <TableCell>
                       <Link href={`/dashboard/field-agent/farmers/${farmer.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> View Details
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

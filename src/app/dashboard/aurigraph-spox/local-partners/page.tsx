'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, ArrowLeft, Eye, BarChart2 } from 'lucide-react';

export default function AurigraphLocalPartnersPage() {
    // Placeholder data - replace with actual data fetching
   const localPartners: { id: string; name: string; region: string; supervisors: number; totalPlots: number }[] = [
    { id: 'lp1', name: 'Partner Org A', region: 'Northern India', supervisors: 2, totalPlots: 1250 },
    { id: 'lp2', name: 'Partner Org B', region: 'Southern India', supervisors: 1, totalPlots: 875 },
    { id: 'lp3', name: 'Partner Org C', region: 'Eastern India', supervisors: 3, totalPlots: 1500 },
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard/aurigraph-spox" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader>
             <CardTitle className="flex items-center gap-2"><Globe className="h-6 w-6 text-primary"/> Local Partners Overview</CardTitle>
             <CardDescription>Monitor the local partner organizations involved in the project.</CardDescription>
        </CardHeader>
        <CardContent>
          {localPartners.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No local partners are currently onboarded.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Supervisors</TableHead>
                  <TableHead>Total Plots</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                     <TableCell>{partner.region}</TableCell>
                     <TableCell>{partner.supervisors}</TableCell>
                     <TableCell>{partner.totalPlots}</TableCell>
                    <TableCell className="flex gap-1">
                       <Link href={`/dashboard/aurigraph-spox/local-partners/${partner.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> Details
                         </Button>
                       </Link>
                       {/* <Link href={`/dashboard/aurigraph-spox/overview?partnerId=${partner.id}`} passHref legacyBehavior>
                         <Button variant="ghost" size="sm">
                           <BarChart2 className="mr-1 h-3 w-3" /> Reports
                         </Button>
                       </Link> */}
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

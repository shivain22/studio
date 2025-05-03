'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, ArrowLeft, Eye, Filter } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'On Hold';

const getBadgeVariant = (status: TaskStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Completed':
      return 'default';
    case 'Pending':
    case 'In Progress':
      return 'secondary'; // Use accent or secondary
    case 'On Hold':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function VvbValidationTasksPage() {
    // Placeholder data - replace with actual data fetching
   const validationTasks: { id: string; type: string; region: string; assignedDate: string; dueDate: string; status: TaskStatus }[] = [
    { id: 'task1', type: 'Plot Data Verification (Batch 1)', region: 'North Zone', assignedDate: '2024-07-20', dueDate: '2024-08-10', status: 'Pending' },
    { id: 'task2', type: 'AWD Practice Audit (Sample)', region: 'South Zone', assignedDate: '2024-07-22', dueDate: '2024-08-15', status: 'In Progress' },
    { id: 'task3', type: 'Record Keeping Review', region: 'North Zone', assignedDate: '2024-07-15', dueDate: '2024-07-30', status: 'Completed' },
    { id: 'task4', type: 'Plot Data Verification (Batch 2)', region: 'East Zone', assignedDate: '2024-07-25', dueDate: '2024-08-20', status: 'Pending' },
  ];

  const [filter, setFilter] = useState<TaskStatus | 'all'>('Pending');

  const filteredTasks = validationTasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/vvb" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
           <div>
             <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary"/> Validation Tasks</CardTitle>
             <CardDescription>View your assigned validation and verification tasks.</CardDescription>
           </div>
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground"/>
                <Select value={filter} onValueChange={(value) => setFilter(value as TaskStatus | 'all')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                     <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No tasks match the current filter.</p>
                 {filter !== 'all' && (
                    <Button variant="outline" onClick={() => setFilter('all')}>Show All Tasks</Button>
                 )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Type</TableHead>
                   <TableHead>Region</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.type}</TableCell>
                    <TableCell>{task.region}</TableCell>
                    <TableCell>{task.assignedDate}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                       <Badge variant={getBadgeVariant(task.status)}>{task.status}</Badge>
                    </TableCell>
                    <TableCell>
                       <Link href={`/dashboard/vvb/validation/${task.id}`} passHref legacyBehavior>
                         <Button variant="outline" size="sm">
                           <Eye className="mr-1 h-3 w-3" /> View Task
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

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Lock } from 'lucide-react';

// Helper function to get the display name for a role
const getRoleDisplayName = (role: string): string => {
  return role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export default function GenericSettingsPage({ params }: { params: { role: string } }) {
   const { role } = params;
   const roleDisplayName = getRoleDisplayName(role);

   // Placeholder for form handling state
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log('Updating settings...');
     // Add API call logic here
   };

   if (role === 'farmer') {
      // This case should be handled by src/app/dashboard/farmer/settings/page.tsx
      // This is a fallback in case routing gets here.
       return (
          <div className="space-y-6">
             <p>Redirecting to farmer settings...</p>
             {/* Add a meta refresh or router.push if needed */}
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
          <CardTitle className="flex items-center gap-2"><User className="h-6 w-6 text-primary"/> Profile Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
           <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
             <div className="space-y-2">
               <Label htmlFor="name">Full Name</Label>
               {/* Pre-fill with actual data */}
               <Input id="name" defaultValue={`${roleDisplayName} Name Placeholder`} />
             </div>
              <div className="space-y-2">
               <Label htmlFor="contact">Email / Phone Number</Label>
                {/* Pre-fill with actual data */}
               <Input id="contact" defaultValue={`${role}@example.com`} />
             </div>
              {/* Add role-specific fields if necessary */}
             <Button type="submit">Save Profile Changes</Button>
           </form>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-6 w-6 text-primary"/> Security Settings</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent>
           <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
             <div className="space-y-2">
               <Label htmlFor="current-password">Current Password</Label>
               <Input id="current-password" type="password" placeholder="Enter your current password" />
             </div>
             <div className="space-y-2">
               <Label htmlFor="new-password">New Password</Label>
               <Input id="new-password" type="password" placeholder="Enter a new password" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
               <Input id="confirm-password" type="password" placeholder="Confirm your new password" />
             </div>
             <Button type="submit">Change Password</Button>
           </form>
        </CardContent>
      </Card>

    </div>
  );
}

// Function to generate static paths for each role (optional but good for performance)
export async function generateStaticParams() {
  const roles = ['field-agent', 'supervisor', 'local-partner', 'aurigraph-spox', 'vvb'];
  return roles.map((role) => ({
    role: role,
  }));
}

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout } from 'lucide-react';

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'farmer'; // Default/Only allow farmer registration for now

  // Convert role slug to a display-friendly format
  const displayRole = role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for registration logic
    console.log(`Attempting registration for role: ${role}`);
    // Redirect to farmer dashboard after successful registration
    window.location.href = `/dashboard/farmer`;
  };

  // Restrict registration to farmers only for now
  if (role !== 'farmer') {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
         <Card className="w-full max-w-md shadow-lg">
           <CardHeader>
             <CardTitle className="text-2xl text-center">Registration Unavailable</CardTitle>
           </CardHeader>
           <CardContent className="text-center">
             <p className="text-muted-foreground mb-4">Registration is currently only available for Farmers.</p>
             <Link href="/" passHref legacyBehavior>
               <Button variant="outline">Back to Login</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-secondary">
       <header className="p-4 bg-primary text-primary-foreground flex justify-between items-center shadow-md">
         <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
           <Sprout className="h-8 w-8" />
           <h1 className="text-2xl font-bold">RiceWise AWD</h1>
         </Link>
       </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{displayRole} Registration</CardTitle>
            <CardDescription className="text-center">
              Create your account to start managing your plots.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your full name" required />
              </div>
               <div className="space-y-2">
                 <Label htmlFor="contact">Email / Phone Number</Label>
                 <Input id="contact" type="text" placeholder="Enter your email or phone" required />
               </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Register
              </Button>
            </form>
             <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                {/* Update login link to point to root with role param */}
                <Link href={`/?role=${role}`} className="underline text-primary hover:text-primary/80">
                  Login here
                </Link>
              </div>
               <div className="mt-2 text-center text-sm">
                   {/* Update "Back to Role Selection" text and ensure link points to root */}
                   <Link href="/" className="underline text-muted-foreground hover:text-foreground">
                      Back to Login
                   </Link>
              </div>
          </CardContent>
        </Card>
      </main>

      <footer className="p-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} RiceWise AWD. All rights reserved.
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  )
}

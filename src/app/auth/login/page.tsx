'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout } from 'lucide-react';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'User'; // Default to 'User' if no role specified

  // Convert role slug to a display-friendly format
  const displayRole = role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const isFarmer = role === 'farmer';

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for login logic
    console.log(`Attempting login for role: ${role}`);
    // Redirect to the appropriate dashboard based on role after successful login
    // For now, redirecting to a placeholder dashboard
    window.location.href = `/dashboard/${role}`;
  };

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
            <CardTitle className="text-2xl text-center">{displayRole} Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email / Phone Number</Label>
                <Input id="email" type="text" placeholder="Enter your email or phone" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Login
              </Button>
            </form>
            {isFarmer && (
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href={`/auth/register?role=${role}`} className="underline text-primary hover:text-primary/80">
                  Register here
                </Link>
              </div>
            )}
             <div className="mt-2 text-center text-sm">
                 <Link href="/" className="underline text-muted-foreground hover:text-foreground">
                    Back to Role Selection
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


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
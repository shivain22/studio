import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="p-4 bg-primary text-primary-foreground flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8" />
          <h1 className="text-2xl font-bold">RiceWise AWD</h1>
        </div>
        {/* Placeholder for future navigation or user actions if needed */}
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="items-center">
            <Image
              src="https://picsum.photos/400/200"
              alt="Rice Paddy Field"
              data-ai-hint="rice paddy field agriculture"
              width={400}
              height={200}
              className="rounded-t-lg mb-4 object-cover"
            />
            <CardTitle className="text-2xl text-center">Welcome to RiceWise AWD</CardTitle>
            <CardDescription className="text-center">
              Efficiently manage Alternate Wetting and Drying for sustainable rice cultivation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center">
            <p className="text-muted-foreground text-center">Please select your role to proceed:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
               <Link href="/auth/login?role=farmer" passHref legacyBehavior>
                  <Button className="w-full" variant="default">Farmer Login/Register</Button>
                </Link>
               <Link href="/auth/login?role=field-agent" passHref legacyBehavior>
                  <Button className="w-full" variant="outline">Field Agent Login</Button>
                </Link>
                <Link href="/auth/login?role=supervisor" passHref legacyBehavior>
                   <Button className="w-full" variant="outline">Supervisor Login</Button>
                 </Link>
                 <Link href="/auth/login?role=local-partner" passHref legacyBehavior>
                   <Button className="w-full" variant="outline">Local Partner Login</Button>
                 </Link>
                 <Link href="/auth/login?role=aurigraph-spox" passHref legacyBehavior>
                   <Button className="w-full" variant="outline">Aurigraph Spox Login</Button>
                 </Link>
                 <Link href="/auth/login?role=vvb" passHref legacyBehavior>
                   <Button className="w-full" variant="outline">VVB Login</Button>
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

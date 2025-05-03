import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FarmerDashboard } from '@/components/dashboard/farmer-dashboard';
import { FieldAgentDashboard } from '@/components/dashboard/field-agent-dashboard';
import { SupervisorDashboard } from '@/components/dashboard/supervisor-dashboard';
import { LocalPartnerDashboard } from '@/components/dashboard/local-partner-dashboard';
import { AurigraphSpoxDashboard } from '@/components/dashboard/aurigraph-spox-dashboard';
import { VvbDashboard } from '@/components/dashboard/vvb-dashboard';

// Define role types
type Role = 'farmer' | 'field-agent' | 'supervisor' | 'local-partner' | 'aurigraph-spox' | 'vvb' | 'unknown';

// Mapping roles to their display names and components
const roleComponents: Record<Role, React.ComponentType | null> = {
  'farmer': FarmerDashboard,
  'field-agent': FieldAgentDashboard,
  'supervisor': SupervisorDashboard,
  'local-partner': LocalPartnerDashboard,
  'aurigraph-spox': AurigraphSpoxDashboard,
  'vvb': VvbDashboard,
  'unknown': null, // Handle unknown roles
};

// Helper function to get the display name for a role
const getRoleDisplayName = (role: Role): string => {
  switch (role) {
    case 'farmer': return 'Farmer';
    case 'field-agent': return 'Field Agent';
    case 'supervisor': return 'Supervisor';
    case 'local-partner': return 'Local Partner';
    case 'aurigraph-spox': return 'Aurigraph Spox';
    case 'vvb': return 'VVB';
    default: return 'User';
  }
};


export default function RoleDashboardPage({ params }: { params: { role: string } }) {
  const role = params.role as Role;
  const DashboardComponent = roleComponents[role] ?? null; // Get the component or null
  const roleDisplayName = getRoleDisplayName(role);

  return (
    <DashboardLayout role={role} roleDisplayName={roleDisplayName}>
      {DashboardComponent ? (
        <DashboardComponent />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Invalid Role</CardTitle>
            <CardDescription>The requested dashboard role is not recognized.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please return to the login page and select a valid role.</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}

// Function to generate static paths for each role (optional but good for performance)
export async function generateStaticParams() {
  const roles: Role[] = ['farmer', 'field-agent', 'supervisor', 'local-partner', 'aurigraph-spox', 'vvb'];
  return roles.map((role) => ({
    role: role,
  }));
}

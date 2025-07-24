import { AppShell } from '@/components/app-shell';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { BudgetStatus } from '@/components/dashboard/budget-status';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <div className="space-y-4">
          <OverviewCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <SpendingChart />
            </div>
            <div className="col-span-4 lg:col-span-3">
              <BudgetStatus />
            </div>
          </div>
          <RecentTransactions />
        </div>
      </div>
    </AppShell>
  );
}

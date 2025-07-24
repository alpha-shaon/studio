'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { budgets } from '@/lib/data';
import { cn } from '@/lib/utils';

export function BudgetStatus() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Budget Goals</CardTitle>
        <CardDescription>Your monthly spending goals. Stay on track!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            return (
              <div key={budget.category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={cn(
                    percentage > 90 ? '[&>div]:bg-destructive' :
                    percentage > 75 ? '[&>div]:bg-accent' : ''
                  )}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

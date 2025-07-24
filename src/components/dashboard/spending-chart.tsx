'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { transactions } from '@/lib/data';

const getSpendingByCategory = () => {
  const spending = new Map<string, number>();
  transactions.forEach((t) => {
    if (t.type === 'expense') {
      const currentTotal = spending.get(t.category) || 0;
      spending.set(t.category, currentTotal + t.amount);
    }
  });
  return Array.from(spending.entries()).map(([name, total]) => ({ name, total }));
};

export function SpendingChart() {
  const data = getSpendingByCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Spending Overview</CardTitle>
        <CardDescription>A breakdown of your spending by category for this month.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

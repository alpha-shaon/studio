import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { transactions } from '@/lib/data';
import {
  Car,
  Utensils,
  ShoppingCart,
  Lightbulb,
  Ticket,
  MoreHorizontal,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryIcons = {
  Income: <TrendingUp className="h-4 w-4" />,
  Food: <Utensils className="h-4 w-4" />,
  Transport: <Car className="h-4 w-4" />,
  Shopping: <ShoppingCart className="h-4 w-4" />,
  Utilities: <Lightbulb className="h-4 w-4" />,
  Entertainment: <Ticket className="h-4 w-4" />,
  Other: <MoreHorizontal className="h-4 w-4" />,
};

export function RecentTransactions() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions</CardTitle>
        <CardDescription>A list of your most recent income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-2 w-fit">
                    {categoryIcons[transaction.category]}
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right',
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

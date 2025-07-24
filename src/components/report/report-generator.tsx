'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Loader2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { generateSpendingReport } from '@/ai/flows/generate-spending-report';
import { transactions } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';

export default function ReportGenerator({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setDate(1)));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Please select both a start and end date.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setReport(null);

    try {
      const result = await generateSpendingReport({
        userId: 'user-123',
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        spendingData: JSON.stringify(transactions),
      });
      setReport(result.report);
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast({
        title: 'Report Generation Failed',
        description: 'There was an error generating your report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileText className="mr-2 h-4 w-4" /> Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Generate Spending Report</DialogTitle>
          <DialogDescription>
            Select a date range to generate an AI-powered spending report.
          </DialogDescription>
        </DialogHeader>
        {report ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h3 className="font-headline">Your Spending Report</h3>
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              {report.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        <DialogFooter>
          {report ? (
            <Button onClick={() => setReport(null)}>Generate New Report</Button>
          ) : (
            <Button onClick={handleGenerateReport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

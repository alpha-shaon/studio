import { AppShell } from '@/components/app-shell';
import { UploadForm } from '@/components/upload/upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UploadPage() {
  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Upload Data</CardTitle>
            <CardDescription>
              Add a new transaction or upload a CSV file with your spending data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

import { getCategories } from '@/server/getCategories';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

const EditTransactionPage = async ({
  params
}: {
  params: Promise<{ transactionId: string }>
}) => {
  const paramsValue = await params;
  const transactionId = Number(paramsValue.transactionId);

  if (isNaN(transactionId)) {
    return <div>oops! transaction not found!</div>;
  };

  const categories = await getCategories();
  console.log(categories);

  return (
    <div className='max-w-screen-xl mx-auto p-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard/transactions'>
                Transactions
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              Edit Transaction
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>

      <Card className='mt-4 max-w-screen-md'>
        <CardHeader>
          <CardTitle>
            Edit Transaction
          </CardTitle>
        </CardHeader>

        <CardContent>
          {paramsValue.transactionId}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTransactionPage;
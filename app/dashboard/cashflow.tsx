import { getAnnualCashflow } from '@/server/getAnnualCashflow';
import { getTransactionYearsRange } from '@/server/getTransactionYearsRange';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import CashflowFilters from './cashflow-filters';

const Cashflow = async ({
  year
}: {
  year: number;
}) => {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearsRange()
  ]);
  console.log(cashflow);

  return (
    <Card className='mb-5'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Cashflow</span>
          <CashflowFilters
            year={year}
            yearsRange={yearsRange}
          />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Cashflow;
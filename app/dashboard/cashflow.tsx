import { getAnnualCashflow } from '@/server/getAnnualCashflow';

const Cashflow = async () => {
  const cashflow = await getAnnualCashflow(2025);
  console.log(cashflow);

  return (
    <div>Cashflow</div>
  );
};

export default Cashflow;
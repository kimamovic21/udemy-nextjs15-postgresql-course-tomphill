'use client';

import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type CashflowFiltersProps = {
  year: number;
  yearsRange: number[];
};

const CashflowFilters = ({
  year,
  yearsRange
}: CashflowFiltersProps) => {
  const router = useRouter();

  return (
    <Select
      defaultValue={year.toString()}
      onValueChange={(value) => {
        router.push(`/dashboard?cfyear=${value}`)
      }}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {yearsRange?.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CashflowFilters;
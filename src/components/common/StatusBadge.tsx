import { MopStatus } from '@/types';

interface StatusBadgeProps {
  status: MopStatus;
}

const statusColors: Record<MopStatus, string> = {
  [MopStatus.RELEVANT]: "bg-blue-50 text-blue-700 border-blue-200",
  [MopStatus.NOT_RELEVANT]: "bg-gray-100 text-gray-400 border-gray-200",
  [MopStatus.NOT_STARTED]: "bg-red-50 text-red-700 border-red-200",
  [MopStatus.STARTED]: "bg-amber-50 text-amber-700 border-amber-200",
  [MopStatus.IVARETATT]: "bg-purple-50 text-purple-700 border-purple-200",
  [MopStatus.FERDIG]: "bg-green-50 text-green-700 border-green-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${statusColors[status]}`}>
      {status}
    </span>
  );
}

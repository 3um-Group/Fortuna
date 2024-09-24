export interface TransactionItemProps {
  title: string;
  time: string;
  amount: string;
  icon: React.ReactNode;
  isNegative?: boolean;
}

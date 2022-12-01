export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  hasAlertsActivated: boolean;
  hasNotificationsActivated: boolean;
  monthlySpendingLimit: number;
}

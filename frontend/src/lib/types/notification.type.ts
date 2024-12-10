export type ToastPosition =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'middle_left'
  | 'middle_center'
  | 'middle_right'
  | 'bottom_left'
  | 'bottom_center'
  | 'bottom_right';

export interface ToastNotification {
  position: ToastPosition;
  toasts: Toast[];
}

export interface Toast {
  index?: number;
  message: string;
  duration: number;
  type?: string;
}

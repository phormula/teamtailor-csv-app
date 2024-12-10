import { notifications } from '$lib/services/store.service';
import type { Toast, ToastNotification, ToastPosition } from '$lib/types/notification.type';

type status = 'success' | 'danger' | 'warning' | 'info';

export function showNotification(
  message: string,
  type: status,
  position: ToastPosition = 'bottom_right',
  duration = 5000,
) {
  notifications.update((currentNotifications: ToastNotification) => {
    let prev: Toast[] = [];
    if (currentNotifications) {
      prev = currentNotifications.toasts;
    }
    return {
      position,
      toasts: [...prev, { message, type, duration }],
    };
  });
}

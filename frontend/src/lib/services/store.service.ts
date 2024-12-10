import type { ToastNotification } from '$lib/types/notification.type';
import { writable, type Writable } from 'svelte/store';

export const notifications: Writable<ToastNotification> = writable();

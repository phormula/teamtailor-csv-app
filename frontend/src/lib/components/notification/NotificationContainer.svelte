<script lang="ts">
  import { notifications } from '$lib/services/store.service';
  import Notification from '$lib/components/notification/Notification.svelte';

  let positions: { [key: string]: string } = {
    top_left: 'top-0 start-0',
    top_center: 'top-0 start-50 translate-middle-x',
    top_right: 'top-0 end-0',
    middle_left: 'top-50 start-0 translate-middle-y',
    middle_center: 'top-50 start-50 translate-middle',
    middle_right: 'top-50 end-0 translate-middle-y',
    bottom_left: 'bottom-0 start-0',
    bottom_center: 'bottom-0 start-50 translate-middle-x',
    bottom_right: 'bottom-0 end-0'
  };
</script>

{#if $notifications}
  <div
    class="toast-container pt-5 p-3 mt-5 {positions[$notifications.position]} position-fixed"
    id="toastPlacement"
  >
    {#each $notifications.toasts as notification}
      <Notification
        message={notification.message}
        duration={notification.duration}
        type={notification.type}
      />
    {/each}
  </div>
{/if}

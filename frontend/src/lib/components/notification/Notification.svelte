<script lang="ts">
  import { Toast, ToastBody, ToastHeader } from '@sveltestrap/sveltestrap';

  export let duration: number;
  export let message: string;
  export let type = 'success';
  let percentage = 100;
  let elapsedTime = 0;
  let interval = 10;
  let isOpen = true;

  function updateProgress(duration: number) {
    const update = () => {
      percentage = (1 - elapsedTime / duration) * 100;
      if (elapsedTime < duration) {
        elapsedTime += interval;
        setTimeout(update, interval);
      }
    };

    update();
  }
  function toggle() {
    isOpen = !isOpen;
  }

  updateProgress(duration);
</script>

<Toast
  autohide
  {isOpen}
  class="position-relative bg-{type} text-white"
  bind:delay={duration}
  on:close={() => (isOpen = false)}
>
  <ToastHeader {toggle}>Message</ToastHeader>
  <ToastBody>
    <div class="toast-progress position-absolute bg-black" style="width: {percentage}%;" />
    {@html message}
  </ToastBody>
</Toast>

<style>
  .toast-progress {
    height: 4px;
    opacity: 0.4;
    left: 0;
    bottom: 0;
  }
</style>

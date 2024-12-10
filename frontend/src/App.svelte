<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';
  import NotificationContainer from '$lib/components/notification/NotificationContainer.svelte';
  import { showNotification } from '$lib/services/notification.service';

  let downloading = false;

  const downloadCsv = async () => {
    try {
      downloading = true;
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${BASE_URL}api/download`);

      if (!response.ok) {
        showNotification('Failed to download cas file.', 'danger');
        throw new Error('Failed to download cas file.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `candidates.csv`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error: any) {
      showNotification(error.message, 'danger');
    } finally {
      downloading = false;
    }
  };
</script>

<div class="d-flex justify-content-center align-items-center vh-100 w-100">
  <button
    class="btn btn-primary d-flex flex-row align-content-center gap-2 rounded-pill text-white py-3 px-5 fs-5"
    on:click={downloadCsv}
    disabled={downloading}
  >
    Download CSV {#if downloading}
      <Loader size="sm" />
    {/if}</button
  >
</div>
<NotificationContainer />

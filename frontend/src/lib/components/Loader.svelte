<script lang="ts">
  export let size = '';
  export let classes = '';
</script>

<div class="text-center justify-content {classes}">
  <div class="spinner-border spinner-border-{size}" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>

<style>
  :global(.spinner-border span) {
    display: none;
  }
</style>

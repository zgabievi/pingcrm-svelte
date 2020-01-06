<script>
    export let title;
</script>

<svelte:head>
    <title>{title ? `${title} | Ping CRM` : 'Ping CRM'}</title>
</svelte:head>

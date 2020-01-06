<script>
    export let loading;
    export let className = '';

    $: props = (({loading, className, ...rest}) => rest)($$props);
</script>

<button
    disabled={loading}
    class="focus:outline-none flex items-center {className}"
    {...props}
>
    {#if loading}
        <div class="btn-spinner mr-2"/>
    {/if}
    <slot/>
</button>

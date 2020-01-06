<script>
    export let onDelete;
</script>

<button
    class="text-red-600 focus:outline-none hover:underline"
    tabindex="-1"
    type="button"
    on:click={onDelete}
>
    <slot />
</button>

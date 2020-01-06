<script>
    import Icon from '@/Shared/Icon.svelte';

    export let onRestore;
</script>

<div class="max-w-3xl mb-6 p-4 bg-yellow-400 rounded border border-yellow-500 flex items-center justify-between">
    <div class="flex items-center">
        <Icon
            name="trash"
            className="flex-shrink-0 w-4 h-4 fill-yellow-800 mr-2"
        />

        <div class="text-yellow-800">
            <slot/>
        </div>
    </div>

    <button
        class="text-yellow-800 focus:outline-none text-sm hover:underline"
        tabindex="-1"
        type="button"
        on:click={onRestore}
    >
        Restore
    </button>
</div>

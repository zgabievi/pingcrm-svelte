<script>
    import { filesize } from '@/utils';

    export let className = '';
    export let name;
    export let label;
    export let accept;
    export let errors = [];
    export let onChange;
    export let value;

    // unused value for now
    console.log(value);

    let fileInput;
    let file = null;

    function browse() {
        fileInput.click();
    }

    function remove() {
        file = null;
        onChange(null);
        fileInput.value = null;
    }

    function handleFileChange(e) {
        file = e.target.files[0];
        onChange(file);
    }
</script>

<div class={className}>
    {#if label}
        <label class="form-label" for={name}>{label}:</label>
    {/if}

    <div class="form-input p-0" class:error={errors && errors.length}>
        <input
        id={name}
        bind:this={fileInput}
        accept={accept}
        type="file"
        class="hidden"
        on:change={handleFileChange}
        />

        {#if file}
            <div class="flex items-center justify-between p-2">
                <div class="flex-1 pr-1">
                    {file.name}
                    <span class="text-gray-600 text-xs ml-1">
                        ({filesize(file.size)})
                    </span>
                </div>

                <button
                    type="button"
                    class="focus:outline-none px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded-sm text-xs font-medium text-white"
                    on:click={remove}
                >
                    Remove
                </button>
            </div>
        {:else}
            <div class="p-2">
                <button
                    type="button"
                    class="focus:outline-none px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded-sm text-xs font-medium text-white"
                    on:click={browse}
                >
                    Browse
                </button>
            </div>
        {/if}
    </div>

    {#if errors && errors.length > 0}
        <div class="form-error">{errors[0]}</div>
    {/if}
</div>

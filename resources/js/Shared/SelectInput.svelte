<script>
    export let label;
    export let name;
    export let className = '';
    export let onChange;
    export let value;
    export let errors = [];

    $: props = (({ label, name, className, errors, onChange, value, ...rest }) => rest)($$props);
</script>


<div class={className}>
    {#if label}
        <label class="form-label" for={name}>{label}:</label>
    {/if}

    <select
        id={name}
        name={name}
        {...props}
        class="form-select"
        class:error={errors && errors.length}
        on:change={onChange}
        bind:value
    >
        <slot/>
    </select>

    {#if errors && errors.length}
        <div class="form-error">{errors[0]}</div>
    {/if}
</div>

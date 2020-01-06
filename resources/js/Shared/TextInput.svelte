<script>
    export let onChange;
    export let label;
    export let name;
    export let className = '';
    export let errors = [];

    $: props = (({ onChange, label, name, className, errors, ...rest }) => rest)($$props);
</script>

<div class={className}>
    {#if label}
        <label class="form-label" for={name}>{label}:</label>
    {/if}

    <input
        id={name}
        name={name}
        {...props}
        on:change={onChange}
        class="form-input"
        class:error={errors && errors.length}
    />

    {#if errors && errors.length}
        <div class="form-error">{errors[0]}</div>
    {/if}
</div>

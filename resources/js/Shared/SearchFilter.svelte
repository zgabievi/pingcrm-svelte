<script>
    import { onMount } from 'svelte';
    import { Inertia } from '@inertiajs/inertia';
    import { page } from '@inertiajs/inertia-svelte';
    import SelectInput from '@/Shared/SelectInput.svelte';
    import pickBy from 'lodash/pickBy';

    let { filters } = $page;
    $: filters = $page.filters;

    const route = window.route;

    let opened = false;
    let values = {
        role: filters.role || '', // role is used only on users page
        search: filters.search || '',
        trashed: filters.trashed || ''
    };

    let prevValues;

    onMount(() => {
        prevValues = values;
    });

    function reset() {
        values = {
            role: '',
            search: '',
            trashed: ''
        };
    }

    $: {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: 'forget' };
            Inertia.replace(route(route().current(), query));
        }
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        values = {
            ...values,
            [key]: value
        };

        if (opened) {
            opened = false;
        }
    }
</script>

<div class="flex items-center w-full max-w-md mr-4">
    <div class="relative flex w-full bg-white shadow rounded">
        <div
            style="top: 100%"
            class="absolute" class:hidden={!opened}
        >
            <div
                on:click={() => opened = false}
                class="bg-black opacity-25 fixed inset-0 z-20"
            />

            <div class="relative w-64 mt-2 px-4 py-6 shadow-lg bg-white rounded z-30">
                {#if filters.hasOwnProperty('role')}
                    <SelectInput
                        className="mb-4"
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                    </SelectInput>
                {/if}

                <SelectInput
                    label="Trashed"
                    name="trashed"
                    value={values.trashed}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="with">With Trashed</option>
                    <option value="only">Only Trashed</option>
                </SelectInput>
            </div>
        </div>

        <button
            on:click={() => opened = true}
            class="px-4 md:px-6 rounded-l border-r hover:bg-gray-100 focus:outline-none focus:border-white focus:shadow-outline focus:z-10"
        >
            <div class="flex items-baseline">
                <span class="text-gray-700 hidden md:inline">Filter</span>

                <svg
                    class="w-2 h-2 fill-current text-gray-700 md:ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 961.243 599.998"
                >
                    <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
                </svg>
            </div>
        </button>

        <input
            class="relative w-full px-6 py-3 rounded-r focus:shadow-outline"
            autocomplete="off"
            type="text"
            name="search"
            value={values.search}
            on:change={handleChange}
            placeholder="Search…"
        />
    </div>

    <button
        on:click={reset}
        class="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
        type="button"
    >
        Reset
    </button>
</div>

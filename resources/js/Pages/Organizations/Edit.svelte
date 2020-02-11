<script>
    import { Inertia } from '@inertiajs/inertia';
    import { InertiaLink, page } from '@inertiajs/inertia-svelte';
    import Helmet from '@/Shared/Helmet.svelte';
    import Layout from '@/Shared/Layout.svelte';
    import DeleteButton from '@/Shared/DeleteButton.svelte';
    import LoadingButton from '@/Shared/LoadingButton.svelte';
    import TextInput from '@/Shared/TextInput.svelte';
    import SelectInput from '@/Shared/SelectInput.svelte';
    import TrashedMessage from '@/Shared/TrashedMessage.svelte';
    import Icon from '@/Shared/Icon.svelte';

    const route = window.route;

    let { organization } = $page;
    $: errors = $page.errors;
    $: organization = $page.organization;

    let sending = false;
    let values = {
        name: organization.name || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        city: organization.city || '',
        region: organization.region || '',
        country: organization.country || '',
        postal_code: organization.postal_code || ''
    };

    function handleChange({ target: { name, value } }) {
        values = {
            ...values,
            [name]: value
        };
    }

    function handleSubmit() {
        sending = true;
        Inertia.put(route('organizations.update', organization.id), values).then(() => sending = false);
    }

    function destroy() {
        if (confirm('Are you sure you want to delete this organization?')) {
            Inertia.delete(route('organizations.destroy', organization.id));
        }
    }

    function restore() {
        if (confirm('Are you sure you want to restore this organization?')) {
            Inertia.put(route('organizations.restore', organization.id));
        }
    }
</script>

<Helmet title={values.name} />

<Layout>
    <div>
        <h1 class="mb-8 font-bold text-3xl">
            <InertiaLink
                href={route('organizations')}
                class="text-indigo-600 hover:text-indigo-700"
            >
                Organizations
            </InertiaLink>

            <span class="text-indigo-600 font-medium mx-2">/</span>
            {values.name}
        </h1>

        {#if organization.deleted_at}
            <TrashedMessage onRestore={restore}>This organization has been deleted.</TrashedMessage>
        {/if}

        <div class="bg-white rounded shadow overflow-hidden max-w-3xl">
            <form on:submit|preventDefault={handleSubmit}>
                <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Name"
                        name="name"
                        errors={errors.name}
                        value={values.name}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Email"
                        name="email"
                        type="email"
                        errors={errors.email}
                        value={values.email}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Phone"
                        name="phone"
                        type="text"
                        errors={errors.phone}
                        value={values.phone}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Address"
                        name="address"
                        type="text"
                        errors={errors.address}
                        value={values.address}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="City"
                        name="city"
                        type="text"
                        errors={errors.city}
                        value={values.city}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Province/State"
                        name="region"
                        type="text"
                        errors={errors.region}
                        value={values.region}
                        onChange={handleChange}
                    />

                    <SelectInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Country"
                        name="country"
                        errors={errors.country}
                        value={values.country}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="CA">Canada</option>
                        <option value="US">United States</option>
                    </SelectInput>

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Postal Code"
                        name="postal_code"
                        type="text"
                        errors={errors.postal_code}
                        value={values.postal_code}
                        onChange={handleChange}
                    />
                </div>

                <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center">
                    {#if !organization.deleted_at}
                        <DeleteButton onDelete={destroy}>Delete Organization</DeleteButton>
                    {/if}

                    <LoadingButton
                        loading={sending}
                        type="submit"
                        className="btn-indigo ml-auto"
                    >
                        Update Organization
                    </LoadingButton>
                </div>
            </form>
        </div>

        <h2 class="mt-12 font-bold text-2xl">Contacts</h2>

        <div class="mt-6 bg-white rounded shadow overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-left font-bold">
                        <th class="px-6 pt-5 pb-4">Name</th>
                        <th class="px-6 pt-5 pb-4">City</th>
                        <th class="px-6 pt-5 pb-4" colspan="2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {#if !organization.contacts || organization.contacts.length === 0}
                        <tr>
                            <td class="border-t px-6 py-4" colspan="4">
                                No contacts found.
                            </td>
                        </tr>
                    {:else}
                        {#each organization.contacts as { id, name, phone, city, deleted_at } (id)}
                            <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
                                <td class="border-t">
                                    <InertiaLink
                                        href={route('contacts.edit', id)}
                                        class="px-6 py-4 flex items-center focus:text-indigo"
                                    >
                                        {name}

                                        {#if deleted_at}
                                            <Icon
                                                name="trash"
                                                className="flex-shrink-0 w-3 h-3 text-gray-400 fill-current ml-2"
                                            />
                                        {/if}
                                    </InertiaLink>
                                </td>

                                <td class="border-t">
                                    <InertiaLink
                                        tabindex="-1"
                                        href={route('contacts.edit', id)}
                                        class="px-6 py-4 flex items-center focus:text-indigo"
                                    >
                                        {city}
                                    </InertiaLink>
                                </td>

                                <td class="border-t">
                                    <InertiaLink
                                        tabindex="-1"
                                        href={route('contacts.edit', id)}
                                        class="px-6 py-4 flex items-center focus:text-indigo"
                                    >
                                        {phone}
                                    </InertiaLink>
                                </td>

                                <td class="border-t w-px">
                                    <InertiaLink
                                        tabindex="-1"
                                        href={route('contacts.edit', id)}
                                        class="px-4 flex items-center"
                                    >
                                        <Icon
                                            name="cheveron-right"
                                            className="block w-6 h-6 text-gray-400 fill-current"
                                        />
                                    </InertiaLink>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</Layout>

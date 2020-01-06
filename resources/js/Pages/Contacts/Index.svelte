<script>
    import Helmet from '@/Shared/Helmet.svelte';
    import { InertiaLink, page } from '@inertiajs/inertia-svelte';
    import Layout from '@/Shared/Layout.svelte';
    import Icon from '@/Shared/Icon.svelte';
    import Pagination from '@/Shared/Pagination.svelte';
    import SearchFilter from '@/Shared/SearchFilter.svelte';

    const route = window.route;

    $: data = $page.contacts.data;
    $: links = $page.contacts.links;
</script>

<Helmet title="Contacts" />

<Layout>
    <div>
        <h1 class="mb-8 font-bold text-3xl">Contacts</h1>

        <div class="mb-6 flex justify-between items-center">
            <SearchFilter />

            <InertiaLink class="btn-indigo" href={route('contacts.create')}>
                <span>Create</span>
                <span class="hidden md:inline"> Contact</span>
            </InertiaLink>
        </div>

        <div class="bg-white rounded shadow overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-left font-bold">
                        <th class="px-6 pt-5 pb-4">Name</th>
                        <th class="px-6 pt-5 pb-4">Organization</th>
                        <th class="px-6 pt-5 pb-4">City</th>
                        <th class="px-6 pt-5 pb-4" colspan="2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {#if !data || data.length === 0}
                        <tr>
                            <td class="border-t px-6 py-4" colspan="4">
                                No contacts found.
                            </td>
                        </tr>
                    {:else}
                        {#each data as { id, name, city, phone, organization, deleted_at } (id)}
                            <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
                                <td class="border-t">
                                    <InertiaLink
                                        href={route('contacts.edit', id)}
                                        class="px-6 py-4 flex items-center focus:text-indigo-700"
                                    >
                                        {name}

                                        {#if deleted_at}
                                            <Icon
                                                name="trash"
                                                class="flex-shrink-0 w-3 h-3 text-gray-400 fill-current ml-2"
                                            />
                                        {/if}
                                    </InertiaLink>
                                </td>

                                <td class="border-t">
                                    <InertiaLink
                                        tabindex="1"
                                        class="px-6 py-4 flex items-center focus:text-indigo"
                                        href={route('contacts.edit', id)}
                                    >
                                        {organization && organization.name}
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

        <Pagination links={links} />
    </div>
</Layout>

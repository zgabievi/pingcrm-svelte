<script>
    import { Inertia } from '@inertiajs/inertia';
    import { InertiaLink, page } from '@inertiajs/inertia-svelte';
    import Layout from '@/Shared/Layout.svelte';
    import Helmet from '@/Shared/Helmet.svelte';
    import LoadingButton from '@/Shared/LoadingButton.svelte';
    import TextInput from '@/Shared/TextInput.svelte';
    import SelectInput from '@/Shared/SelectInput.svelte';

    const route = window.route;

    $: organizations = $page.organizations;
    $: errors = $page.errors;

    let sending = false;

    let values = {
        first_name: '',
        last_name: '',
        organization_id: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        country: '',
        postal_code: ''
    };

    function handleChange({ target: { name, value } }) {
        values = {
            ...values,
            [name]: value
        };
    }

    function handleSubmit() {
        sending = true;
        Inertia.post(route('contacts.store'), values).then(() => sending = false);
    }
</script>

<Helmet title="Create Contact" />

<Layout>
    <div>
        <h1 class="mb-8 font-bold text-3xl">
            <InertiaLink
                href={route('contacts')}
                class="text-indigo-600 hover:text-indigo-700"
            >
                Contacts
            </InertiaLink>

            <span class="text-indigo-600 font-medium"> /</span> Create
        </h1>

        <div class="bg-white rounded shadow overflow-hidden max-w-3xl">
            <form on:submit|preventDefault={handleSubmit}>
                <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="First Name"
                        name="first_name"
                        errors={errors.first_name}
                        value={values.first_name}
                        onChange={handleChange}
                    />

                    <TextInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Last Name"
                        name="last_name"
                        errors={errors.last_name}
                        value={values.last_name}
                        onChange={handleChange}
                    />

                    <SelectInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Organization"
                        name="organization_id"
                        errors={errors.organization_id}
                        value={values.organization_id}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        {#each organizations as {id, name} (id)}
                            <option value={`${id}`}>{name}</option>
                        {/each}
                        <option value="CA">Canada</option>
                        <option value="US">United States</option>
                    </SelectInput>

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

                <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
                    <LoadingButton
                        loading={sending}
                        type="submit"
                        class="btn-indigo"
                    >
                        Create Contact
                    </LoadingButton>
                </div>
            </form>
        </div>
    </div>
</Layout>

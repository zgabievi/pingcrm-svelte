<script>
    import { Inertia } from '@inertiajs/inertia';
    import { InertiaLink, page } from '@inertiajs/inertia-svelte';
    import Helmet from '@/Shared/Helmet.svelte';
    import Layout from '@/Shared/Layout.svelte';
    import LoadingButton from '@/Shared/LoadingButton.svelte';
    import TextInput from '@/Shared/TextInput.svelte';
    import SelectInput from '@/Shared/SelectInput.svelte';
    import FileInput from '@/Shared/FileInput.svelte';
    import { toFormData } from '@/utils';

    const route = window.route;

    $: errors = $page.errors;

    let sending = false;
    let values = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        owner: '0',
        photo: ''
    };

    function handleChange({ target: { name, value } }) {
        values = {
            ...values,
            [key]: value
        };
    }

    function handleFileChange(file) {
        values = {
            ...values,
            photo: file
        };
    }

    function handleSubmit() {
        sending = true;

        // since we are uploading an image
        // we need to use FormData object
        // for more info check utils.js
        const formData = toFormData(values);

        Inertia.post(route('users.store'), formData).then(() =>  sending = false);
    }
</script>

<Helmet title="Create User" />

<Layout>
    <div>
        <div>
            <h1 class="mb-8 font-bold text-3xl">
                <InertiaLink
                    href={route('users')}
                    class="text-indigo-600 hover:text-indigo-700"
                >
                    Users
                </InertiaLink>

                <span class="text-indigo-600 font-medium"> /</span> Create
            </h1>
        </div>

        <div class="bg-white rounded shadow overflow-hidden max-w-3xl">
            <form name="createForm" on:submit|preventDefault={handleSubmit}>
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
                        label="Password"
                        name="password"
                        type="password"
                        errors={errors.password}
                        value={values.password}
                        onChange={handleChange}
                    />

                    <SelectInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Owner"
                        name="owner"
                        errors={errors.owner}
                        value={values.owner}
                        onChange={handleChange}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </SelectInput>

                    <FileInput
                        className="pr-6 pb-8 w-full lg:w-1/2"
                        label="Photo"
                        name="photo"
                        accept="image/*"
                        errors={errors.photo}
                        value={values.photo}
                        onChange={handleFileChange}
                    />
                </div>

                <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
                    <LoadingButton
                        loading={sending}
                        type="submit"
                        className="btn-indigo"
                    >
                        Create User
                    </LoadingButton>
                </div>
            </form>
        </div>
    </div>
</Layout>

<script>
    import { Inertia } from '@inertiajs/inertia';
    import {page} from '@inertiajs/inertia-svelte';
    import Logo from '@/Shared/Logo.svelte';
    import LoadingButton from '@/Shared/LoadingButton.svelte';
    import TextInput from '@/Shared/TextInput.svelte';
    import Helmet from '@/Shared/Helmet.svelte';

    $: errors = $page.errors;

    let sending = false;
    let values = {
        email: 'johndoe@example.com',
        password: 'secret',
        remember: true
    };

    function handleChange(e) {
        const key = e.target.name;
        const value =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        values = {
            ...values,
            [key]: value
        };
    }

    function handleSubmit() {
        sending = true;
        Inertia.post(route('login.attempt'), values).then(() => sending = false);
    }
</script>

<Helmet title="Login"/>

<div class="p-6 bg-indigo-900 min-h-screen flex justify-center items-center">
    <div class="w-full max-w-md">
        <Logo
            class="block mx-auto w-full max-w-xs text-white fill-current"
            height={50}
        />

        <form
            on:submit|preventDefault={handleSubmit}
            class="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
        >
            <div class="px-10 py-12">
                <h1 class="text-center font-bold text-3xl">Welcome Back!</h1>
                <div class="mx-auto mt-6 w-24 border-b-2"/>

                <TextInput
                    className="mt-10"
                    label="Email"
                    name="email"
                    type="email"
                    errors={errors.email}
                    value={values.email}
                    onChange={handleChange}
                />

                <TextInput
                    className="mt-6"
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors.password}
                    value={values.password}
                    onChange={handleChange}
                />

                <label
                    class="mt-6 select-none flex items-center"
                    for="remember"
                >
                    <input
                        name="remember"
                        id="remember"
                        class="mr-1"
                        type="checkbox"
                        checked={values.remember}
                        on:change={handleChange}
                    />

                    <span class="text-sm">Remember Me</span>
                </label>
            </div>

            <div class="px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                <a class="hover:underline" tabindex="-1" href="#reset-password">
                    Forget password?
                </a>

                <LoadingButton
                    type="submit"
                    loading={sending}
                    className="btn-indigo"
                >
                    Login
                </LoadingButton>
            </div>
        </form>
    </div>
</div>

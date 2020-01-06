<script>
    import {InertiaLink} from '@inertiajs/inertia-svelte';
    import Layout from '@/Shared/Layout.svelte';
    import Helmet from '@/Shared/Helmet.svelte';
</script>

<Helmet title="Dashboard"/>

<Layout>
    <div>
        <h1 class="mb-8 font-bold text-3xl">Dashboard</h1>

        <p class="mb-12 leading-normal">
            Hey there! Welcome to Ping CRM, a demo app designed to help illustrate
            how
            <a
                class="text-indigo-600 underline hover:text-orange-500 mx-1"
                href="https://inertiajs.com"
            >
                Inertia.js
            </a>
            works with
            <a
                class="text-indigo-600 underline hover:text-orange-500 ml-1"
                href="https://svelte.dev/"
            >
                Svelte
            </a>
            .
        </p>

        <div>
            <InertiaLink class="btn-indigo mr-1" href="/500">
                500 error
            </InertiaLink>

            <InertiaLink class="btn-indigo" href="/404">
                404 error
            </InertiaLink>
        </div>
    </div>
</Layout>

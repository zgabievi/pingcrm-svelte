<script>
    import {InertiaLink} from '@inertiajs/inertia-svelte';
    import Logo from '@/Shared/Logo.svelte';
    import MainMenu from '@/Shared/MainMenu.svelte';

    let menuOpened = false;
</script>

<div class="bg-indigo-900 md:flex-shrink-0 md:w-56 px-6 py-4 flex items-center justify-between md:justify-center">
    <InertiaLink class="mt-1" href="/">
        <Logo class="text-white fill-current" width="120" height="28"/>
    </InertiaLink>

    <div class="relative md:hidden">
        <svg
            on:click={() => menuOpened = true}
            class="fill-current text-white w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>

        <div class:hidden={!menuOpened} class="absolute right-0 z-20">
            <MainMenu className="relative z-20 mt-2 px-8 py-4 pb-2 shadow-lg bg-indigo-800 rounded"/>

            <div
                on:click={() => menuOpened = false}
                class="bg-black opacity-25 fixed inset-0 z-10"
            />
        </div>
    </div>
</div>

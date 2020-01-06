<script>
    import MainMenu from '@/Shared/MainMenu.svelte';
    import FlashMessages from '@/Shared/FlashMessages.svelte';
    import TopHeader from '@/Shared/TopHeader.svelte';
    import BottomHeader from '@/Shared/BottomHeader.svelte';
</script>

<div class="flex flex-col">
    <div class="h-screen flex flex-col">
        <div class="md:flex">
            <TopHeader />
            <BottomHeader />
        </div>

        <div class="flex flex-grow overflow-hidden">
            <MainMenu className="bg-indigo-800 flex-shrink-0 w-56 p-12 hidden md:block overflow-y-auto" />

            <!-- To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below -->
            <div class="w-full overflow-hidden px-4 py-8 md:p-12 overflow-y-auto">
                <FlashMessages />
                <slot />
            </div>
        </div>
    </div>
</div>

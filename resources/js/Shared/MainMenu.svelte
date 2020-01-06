<script>
    export let className = '';

    import MainMenuItem from '@/Shared/MainMenuItem.svelte';
</script>

<div class={className}>
    <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard"/>
    <MainMenuItem text="Organizations" link="organizations" icon="office"/>
    <MainMenuItem text="Contacts" link="contacts" icon="users"/>
    <MainMenuItem text="Reports" link="reports" icon="printer"/>
</div>

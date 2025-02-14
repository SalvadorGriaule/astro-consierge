<script>
    let { role, id } = $props();
</script>

<ul class="flex space-x-2">
    {#if role == "user"}
        <a href="/Map">Map</a>
        <a href={`/user/${id}`}>Votre Espace</a>
    {:else if role == "Igor"}
        <a href={`/Igor/${id}`}>Votre Espace</a>
    {:else if role == "admin"}
        <a href="/Admin/dashboard">Dashboard</a>
    {:else}
        <a href="/signIn"><li>Inscription</li></a>
        <a href="/login"><li>Connection</li></a>
    {/if}
    {#if role != "guest"}
        <a href="/logout"><li>Déconnection</li></a>
    {/if}
</ul>

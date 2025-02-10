<script>
    let { role, id } = $props();
</script>

<ul class="flex space-x-2">
    <a href="/Map">Map</a>
    {#if role == "user"}
        <a href={`/user/${id}`}>Votre Espace</a>
        <a href="/logout"><li>Déconnection</li></a>
    {:else if role == "admin"}
        <a href="/Dashboard">Dashboard</a>
        <a href="/logout"><li>Déconnection</li></a>
    {:else}
        <a href="/signIn"><li>Inscription</li></a>
        <a href="/login"><li>Connection</li></a>
    {/if}
</ul>

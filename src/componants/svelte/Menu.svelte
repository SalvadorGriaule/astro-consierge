<script>
    let { role } = $props();
</script>

<ul class="flex space-x-2">
    {#if role == "user"}
        <a href="/logout"><li>Déconnection</li></a>
    {:else}
        <a href="/signIn"><li>Inscription</li></a>
        <a href="/login"><li>Connection</li></a>
    {/if}
</ul>

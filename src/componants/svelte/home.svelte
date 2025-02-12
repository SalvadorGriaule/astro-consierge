<script>
    let { role, id } = $props();
</script>

{#if role == "user"}
<div id="user-actions"><a href="/"><div id="prez">Nos services</div></a></div><!-- indiquer le href ici pour rediriger vers la page des services proposées -->
{:else}
<div id="user-actions"><a href="/signIn"><div id="register">S'inscrire</div></a><a href="/login"><div id="login">Connexion</div></a></div>
{/if}
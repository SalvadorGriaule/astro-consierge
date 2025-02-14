<script>
    let { role } = $props();
</script>

{#if role == "user"}
<div id="user-actions"><a href="#services"><div id="prez"><div class="button-home">Nos services</div></div></a></div><!-- indiquer le href ici pour rediriger vers la page des services proposées -->
{:else}
<div id="user-actions"><a href="/signIn"><div id="register"><div class="button-home">S'inscrire</div></div></a></div>
{/if}
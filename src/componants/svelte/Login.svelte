<script>
    let form = [];
    let btn = [];
    const role = ["user","Igor"]
    let current = "user"

    const clickBtn = (e,num) => {
        btn.map((elem) => {
            if (elem == btn[num]){
                elem.classList.remove("bg-neutral-200")
                elem.classList.add("bg-neutral-300")
            } else {
                elem.classList.remove("bg-neutral-300")
                elem.classList.add("bg-neutral-200")
            }
        })
        current = role[num]
    };
</script>

<div class="w-8/10 p-2 flex flex-col justify-center bg-neutral-100 rounded-md shadow-xl md:w-2/3 lg:w-1/2">
    <nav>
        <ul class="flex space-x-2 w-full mb-2">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <li bind:this={btn[0]} onclick={(e) => {clickBtn(e,0)}}  class="bg-neutral-300 p-2 w-1/2 text-center rounded-t-md duration-150">Utilisateur</li>
             <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <li bind:this={btn[1]} onclick={(e) => {clickBtn(e,1)}} class="bg-neutral-200 p-2 w-1/2 text-center rounded-t-md duration-150">Igor</li>
        </ul>
    </nav>
    <div class="w-full p-2 flex flex-col justify-center">
        <form action="/login/{current}/post" method="POST" class="flex flex-col space-y-2">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" name="email" type="email" placeholder="e-mail">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" name="password" type="password" placeholder="password">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md bg-black text-white" type="submit" >
        </form>
        <p><a href="/resetPassword">Mot de passe oublier</a></p>
    </div>
</div>

<script>
    let form = [];
    let btn = [];
    
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
        form.map((elem) => {
            if (elem == form[num]){
                elem.classList.add("flex")
                elem.classList.remove("hidden")
            } else {
                elem.classList.add("hidden")
                elem.classList.remove("flex")
            }
        })
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
        <form bind:this={form[0]} action="/signIn/post" method="POST" class="flex flex-col space-y-2">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="username" placeholder="pseudo">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="email" name="email" placeholder="e-mail">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="password" name="password" placeholder="password">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="ville" placeholder="ville">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="postal" placeholder="code postal">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="addres" placeholder="addres">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md bg-black text-white" type="submit">
        </form>
        <form bind:this={form[1]} action="/Igor/create" method="POST" class="hidden flex-col space-y-2">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="prenom" placeholder="prenom">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="nom" placeholder="nom">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="email" name="email" placeholder="e-mail">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="password" name="password" placeholder="password">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md" type="text" name="ville" placeholder="ville">
            <input class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md bg-black text-white" type="submit">
        </form>
    </div>

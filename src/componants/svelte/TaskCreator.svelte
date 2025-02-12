<script>
    import { Datepicker } from "flowbite-svelte";

    let selectDate = $state(null);
    let rallyPointDate = $state(null);
   
    const getAllIgor = async () => {
        const igorAll = await fetch(`http://localhost:3000/Igor/all/public`);
        const igorJson = await igorAll.json();
        return igorJson;
    };

    const list = getAllIgor();
</script>

<main class="w-full flex justify-center mt-2">
    <div class="w-8/10 p-2 flex flex-col justify-center bg-neutral-100 rounded-md shadow-xl md:w-2/3 lg:w-1/2">
        <h2 class="text-2xl text-center text-neutral-600 py-2">Crée une tache</h2>
    <form
        action="/Task/create"
        method="POST"
        class="flex flex-col space-y-3 items-center w-full"
    >
        <input
            class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md w-full"
            type="text"
            name="titre"
            placeholder="titre"
        />
        <textarea
            class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md w-full"
            name="descritption"
            placeholder="Descritpion ici"
            id=""
        >
        </textarea>
        <label for="limitData"> Date Limite</label>
        <div class="w-full">
            <Datepicker bind:this={selectDate} />
        </div>
        <p>{selectDate ? selectDate.toLocaleDateString() : "None"}</p>
        <fieldset class="flex flex-col justify-center items-center space-x-2 border-2 border-black py-2 w-full">
            <legend>Crée un point de rendez-vous</legend>
            <input
                class="border-2 border-solid border-black mx-auto placeholder:text-center p-2 rounded-md w-4/5"
                type="text"
                name="addres de rendez-vous"
                placeholder=" addres de rendez-vous"
            />
            <label for="rallyDate" class="text-center">Date du rendez-vous</label>
            <div class="w-4/5 flex justify-center">
                <Datepicker bind:this={rallyPointDate} />
            </div>
            <p class="text-center">
                Date: {rallyPointDate
                    ? rallyPointDate.toLocaleDateString()
                    : "None"}
            </p>
          
        </fieldset>
        <label for="igor">Choisir votre igor</label>
        <select name="IgorId" class="border-[1px] border-neutral-200 bg-white p-1 w-3/4" id="">
            {#await list then igorList}
                {#each igorList as igor}
                    <option value={igor.id}>{igor.prenom}{igor.nom}</option>
                {/each}
            {/await}
        </select>
        <input
            class="border-2 border-solid border-black placeholder:text-center p-2 rounded-md bg-black text-white"
            type="submit"
        />
    </form>
</div>
</main>

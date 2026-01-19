<script lang="ts">
  function handleClick() {
    console.log("Debug Button Clicked!");
    alert("Debug Button Works!");
  }
</script>

<button
  on:click={handleClick}
  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
>
  Debug Click Me
</button>

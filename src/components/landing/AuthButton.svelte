<script lang="ts">
  import { auth } from "../../services/firebaseAuthentication/auth";
  import { onAuthStateChanged } from "firebase/auth";
  import { onMount } from "svelte";
  import { getUserRole } from "../../services/firebaseFirestore/users";

  let user: any = null;
  let userRole: string | null = null;

  function openModal() {
    console.log("Dispatching open-auth-modal");
    window.dispatchEvent(new CustomEvent("open-auth-modal"));
  }

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      user = u;
      if (user) {
        userRole = await getUserRole(user.uid);
      } else {
        userRole = null;
      }
    });
    return unsubscribe;
  });

  async function handleLogout() {
    await auth.signOut();
  }
</script>

<div>
  {#if user && userRole === "user"}
    <div class="flex items-center gap-4">
      <span class="text-white hidden md:inline-block"
        >Hola, {user.displayName || "Estudiante"}</span
      >
      <button
        on:click={handleLogout}
        class="text-gray-400 hover:text-white transition-colors"
        aria-label="Cerrar sesión"
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  {:else}
    <button
      on:click={openModal}
      class="bg-primary hover:bg-opacity-90 text-secondary font-display font-bold py-2.5 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(12,242,242,0.3)] hover:shadow-[0_0_25px_rgba(12,242,242,0.5)] transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
    >
      <span>Empieza Ahora</span>
      <i class="fas fa-arrow-right text-sm"></i>
    </button>
  {/if}
</div>

<script context="module">
  import { fade, fly } from "svelte/transition";
</script>

<script lang="ts">
  let users = [
    {
      id: 1,
      name: "Juan Perez",
      email: "juan@example.com",
      plan: "Free",
      status: "Active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      plan: "Premium",
      status: "Active",
    },
    {
      id: 3,
      name: "Carlos Lopez",
      email: "carlos@example.com",
      plan: "VIP",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Ana Torres",
      email: "ana@example.com",
      plan: "Free",
      status: "Active",
    },
    {
      id: 5,
      name: "Luis Diaz",
      email: "luis@example.com",
      plan: "Premium",
      status: "Active",
    },
  ];

  let searchQuery = "";
  let editingUser: any = null;

  $: filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function openEditModal(user: any) {
    editingUser = { ...user };
  }

  function closeModal() {
    editingUser = null;
  }

  function saveUser() {
    users = users.map((u) => (u.id === editingUser.id ? editingUser : u));
    closeModal();
  }
</script>

<div
  class="bg-[#13151A]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
>
  <!-- Search Header -->
  <div
    class="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 relative z-10"
  >
    <div>
      <h2 class="text-2xl font-display font-bold text-white mb-1">
        Base de Usuarios
      </h2>
      <p class="text-gray-400 text-xs">Gestiona los accesos y roles</p>
    </div>

    <div class="relative w-full md:w-80 group">
      <div
        class="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
      ></div>
      <i
        class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-primary transition-colors"
      ></i>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar usuario..."
        class="w-full bg-[#0B0D11]/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all shadow-inner"
      />
    </div>
  </div>

  <!-- Table Container -->
  <div class="overflow-x-auto relative z-10 rounded-2xl border border-white/5">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr
          class="bg-black/20 text-gray-400 text-xs uppercase tracking-wider backdrop-blur-sm"
        >
          <th class="py-5 px-6 font-bold">Usuario</th>
          <th class="py-5 px-6 font-bold">Plan Actual</th>
          <th class="py-5 px-6 font-bold">Estado</th>
          <th class="py-5 px-6 font-bold text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5 text-sm">
        {#each filteredUsers as user}
          <tr class="group hover:bg-white/[0.02] transition-colors">
            <td class="py-4 px-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center font-bold text-white shadow-lg relative overflow-hidden group-hover:border-primary/30 transition-colors"
                >
                  <span class="relative z-10">{user.name.charAt(0)}</span>
                  <div
                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                </div>
                <div>
                  <p
                    class="text-white font-bold group-hover:text-primary transition-colors"
                  >
                    {user.name}
                  </p>
                  <p class="text-gray-500 text-xs font-mono">{user.email}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <span
                class={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wide shadow-sm
                                ${
                                  user.plan === "VIP"
                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    : user.plan === "Premium"
                                      ? "bg-primary/10 text-primary border-primary/20"
                                      : "bg-gray-800/50 text-gray-400 border-gray-700"
                                }`}
              >
                {#if user.plan === "VIP"}
                  <i class="fas fa-crown text-[8px]"></i>
                {:else if user.plan === "Premium"}
                  <i class="fas fa-star text-[8px]"></i>
                {/if}
                {user.plan}
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center gap-2">
                <span
                  class={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500"}`}
                ></span>
                <span
                  class={`text-xs font-medium ${user.status === "Active" ? "text-green-400" : "text-red-400"}`}
                >
                  {user.status}
                </span>
              </div>
            </td>
            <td class="py-4 px-6 text-right">
              <button
                on:click={() => openEditModal(user)}
                class="w-8 h-8 rounded-lg bg-black/20 hover:bg-primary/20 hover:text-primary text-gray-400 transition-all flex items-center justify-center border border-white/5 hover:border-primary/20"
              >
                <i class="fas fa-pen-to-square text-xs"></i>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if editingUser}
  <div
    class="fixed inset-0 bg-[#000]/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="bg-[#13151A] border border-white/10 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
      in:fly={{ y: 20, duration: 400 }}
    >
      <!-- Header Gradient -->
      <div
        class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"
      ></div>

      <div class="p-8">
        <h3
          class="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3"
        >
          <i class="fas fa-user-edit text-primary/50"></i> Editar Usuario
        </h3>

        <div class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label
                class="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2"
                >Nombre</label
              >
              <input
                type="text"
                value={editingUser.name}
                disabled
                class="w-full bg-black/20 text-gray-400 rounded-xl px-4 py-3 border border-white/5 cursor-not-allowed text-sm"
              />
            </div>
          </div>

          <div>
            <label
              class="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2"
              >Plan Suscripción</label
            >
            <div class="relative">
              <select
                bind:value={editingUser.plan}
                class="w-full bg-[#0B0D11] text-white rounded-xl px-4 py-3 border border-white/10 focus:border-primary/50 focus:outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors"
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              ></i>
            </div>
          </div>

          <div>
            <label
              class="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2"
              >Estado</label
            >
            <div class="relative">
              <select
                bind:value={editingUser.status}
                class="w-full bg-[#0B0D11] text-white rounded-xl px-4 py-3 border border-white/10 focus:border-primary/50 focus:outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <i
                class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
              ></i>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-white/5">
          <button
            on:click={closeModal}
            class="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            on:click={saveUser}
            class="px-6 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(12,242,242,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] text-sm transform hover:-translate-y-0.5"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

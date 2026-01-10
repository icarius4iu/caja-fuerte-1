<script lang="ts">
  let users = [
    { id: 1, name: "Juan Perez", email: "juan@example.com", plan: "Free", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", plan: "Premium", status: "Active" },
    { id: 3, name: "Carlos Lopez", email: "carlos@example.com", plan: "VIP", status: "Inactive" },
    { id: 4, name: "Ana Torres", email: "ana@example.com", plan: "Free", status: "Active" },
    { id: 5, name: "Luis Diaz", email: "luis@example.com", plan: "Premium", status: "Active" }
  ];

  let searchQuery = "";
  let editingUser: any = null;

  $: filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function openEditModal(user: any) {
    editingUser = { ...user };
  }

  function closeModal() {
    editingUser = null;
  }

  function saveUser() {
    users = users.map(u => u.id === editingUser.id ? editingUser : u);
    closeModal();
  }
</script>

<div class="bg-secondary/50 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
  <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
    <h2 class="text-2xl font-bold text-white font-display">Gestión de Usuarios</h2>
    <div class="relative w-full md:w-64">
      <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      <input 
        type="text" 
        bind:value={searchQuery} 
        placeholder="Buscar por nombre o email..." 
        class="w-full bg-surface-dark border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-gray-700 text-gray-400 text-sm uppercase">
          <th class="py-3 px-4 font-semibold">Usuario</th>
          <th class="py-3 px-4 font-semibold">Plan</th>
          <th class="py-3 px-4 font-semibold">Estado</th>
          <th class="py-3 px-4 font-semibold text-right">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        {#each filteredUsers as user}
          <tr class="hover:bg-white/5 transition-colors">
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p class="text-white font-medium text-sm">{user.name}</p>
                  <p class="text-gray-400 text-xs">{user.email}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <span class={`text-xs px-2 py-1 rounded-full font-bold border ${
                user.plan === 'VIP' ? 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/50' :
                user.plan === 'Premium' ? 'bg-primary/20 text-primary border-primary/50' :
                'bg-gray-700 text-gray-300 border-gray-600'
              }`}>
                {user.plan}
              </span>
            </td>
            <td class="py-3 px-4">
              <span class={`text-xs px-2 py-1 rounded-full ${
                user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {user.status}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <button 
                on:click={() => openEditModal(user)}
                class="text-gray-400 hover:text-white transition-colors p-1"
              >
                <i class="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if editingUser}
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div class="bg-surface-dark border border-gray-600 rounded-xl p-6 w-full max-w-md shadow-2xl">
      <h3 class="text-xl font-bold text-white mb-4">Editar Usuario</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-gray-400 text-sm mb-1">Nombre</label>
          <input type="text" value={editingUser.name} disabled class="w-full bg-gray-800 text-gray-500 rounded px-3 py-2 border border-gray-700 cursor-not-allowed" />
        </div>
        
        <div>
          <label class="block text-gray-400 text-sm mb-1">E-mail</label>
          <input type="text" value={editingUser.email} disabled class="w-full bg-gray-800 text-gray-500 rounded px-3 py-2 border border-gray-700 cursor-not-allowed" />
        </div>

        <div>
          <label class="block text-white text-sm mb-1">Plan</label>
          <select 
            bind:value={editingUser.plan} 
            class="w-full bg-surface-darker text-white rounded px-3 py-2 border border-primary/50 focus:border-primary focus:outline-none"
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div>
          <label class="block text-white text-sm mb-1">Estado</label>
          <select 
            bind:value={editingUser.status} 
            class="w-full bg-surface-darker text-white rounded px-3 py-2 border border-gray-600 focus:border-gray-500 focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button 
          on:click={closeModal}
          class="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          Cancelar
        </button>
        <button 
          on:click={saveUser}
          class="px-4 py-2 rounded-lg bg-primary text-secondary font-bold hover:bg-opacity-90 transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
{/if}

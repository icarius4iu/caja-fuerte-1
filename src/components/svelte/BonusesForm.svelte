<script lang="ts">
    import { createBonus, type Bonus } from "../../services/firebaseFirestore/bonuses";

    let title = "";
    let type: Bonus['type'] = "welcome";
    // Mapped fields
    let investment = "S/. 0";
    let profit = "S/. 0";
    let investmentAmount = 0;
    let profitAmount = 0;
    
    let code = "";
    let expiryDate = "";
    let description = "";
    
    // New Fields
    let country: 'PE' | 'Global' = 'PE';
    let videoUrl = "";
    let slug = ""; // Handle auto-generation or manual

    let isLoading = false;
    let message = "";
    let messageType: "success" | "error" = "success";

    const BONUS_TYPES = [
        { id: "welcome", label: "Bono de Bienvenida" },
        { id: "free_bet", label: "Apuesta Gratuita" }, // Updated ID to match data
        { id: "cashback", label: "Reembolso" }, // Updated label mapping
        { id: "rollover", label: "Rollover" },
        { id: "combined", label: "Combinada" },
    ];

    async function handleSubmit() {
        isLoading = true;
        message = "";

        // Auto-generate slug from title if empty
        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        try {
            await createBonus({
                slug: finalSlug,
                title,
                type,
                investment,
                profit,
                investmentAmount: Number(investmentAmount),
                profitAmount: Number(profitAmount),
                country,
                logo: "", // Placeholder or add input
                bgColor: "bg-gray-600", // Default or add picker
                verification: "DNI", // Default
                paymentMethods: "Variado", // Default
                videoUrl,
                code,
                expiryDate,
                description,
                isActive: true
            });

            message = "Bono creado exitosamente.";
            messageType = "success";

            // Reset form
            title = "";

            code = "";
            expiryDate = "";
            description = "";
        } catch (e: any) {
            console.error(e);
            message = "Error al crear el bono: " + e.message;
            messageType = "error";
        } finally {
            isLoading = false;
        }
    }
</script>

<div
    class="max-w-4xl mx-auto bg-[#13151A]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
>
    <!-- Decoration -->
    <div
        class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none rounded-r-3xl"
    ></div>
    <h2 class="text-2xl font-bold text-white font-display mb-6">
        Agregar Nuevo Bono
    </h2>

    <form
        on:submit|preventDefault={handleSubmit}
        class="space-y-6 max-w-2xl mx-auto"
    >
        {#if message}
            <div class={`p-4 rounded-lg mb-4 ${messageType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                {message}
            </div>
        {/if}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-1 md:col-span-2">
                <label
                    for="bonus-title"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Nombre del Bono</label
                >
                <input
                    id="bonus-title"
                    type="text"
                    bind:value={title}
                    required
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Ej: Bono de Bienvenida 100%"
                />
            </div>

            <div>
                <label
                    for="bonus-type"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Tipo de Bono</label
                >
                <select
                    id="bonus-type"
                    bind:value={type}
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                >
                    {#each BONUS_TYPES as t}
                        <option value={t.id}>{t.label}</option>
                    {/each}
                </select>
            </div>



            <!-- New Fields -->
            <div>
                <label class="block text-gray-300 text-sm font-bold mb-2">Inversión (Texto)</label>
                <input type="text" bind:value={investment} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" placeholder="Ej: S/. 200" />
            </div>
            
            <div>
                <label class="block text-gray-300 text-sm font-bold mb-2">Ganancia (Texto)</label>
                <input type="text" bind:value={profit} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" placeholder="Ej: S/. 20" />
            </div>

            <div>
                 <label class="block text-gray-300 text-sm font-bold mb-2">Inversión (Numérico)</label>
                 <input type="number" bind:value={investmentAmount} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" />
            </div>

            <div>
                 <label class="block text-gray-300 text-sm font-bold mb-2">Ganancia (Numérico)</label>
                 <input type="number" bind:value={profitAmount} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" />
            </div>

            <div>
                <label class="block text-gray-300 text-sm font-bold mb-2">País</label>
                <select bind:value={country} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none">
                    <option value="PE">PerúOnly</option>
                    <option value="Global">Global</option>
                </select>
            </div>

            <div>
                <label class="block text-gray-300 text-sm font-bold mb-2">Video URL</label>
                <input type="url" bind:value={videoUrl} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" placeholder="https://youtube.com/..." />
            </div>
            
             <!-- Slug Override -->
            <div>
                <label class="block text-gray-300 text-sm font-bold mb-2">Slug (Opcional)</label>
                <input type="text" bind:value={slug} class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none" placeholder="Auto-generado si está vacío" />
            </div>

            <!-- Legacy Fields -->
            <div>
                <label
                    for="bonus-code"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Código Promocional</label
                >
                <input
                    id="bonus-code"
                    type="text"
                    bind:value={code}
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="Ej: BIENVENIDA2025"
                />
            </div>

            <div>
                <label
                    for="bonus-expiry"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Fecha de Expiración</label
                >
                <input
                    id="bonus-expiry"
                    type="date"
                    bind:value={expiryDate}
                    required
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
            </div>

            <div class="col-span-1 md:col-span-2">
                <label
                    for="bonus-description"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Descripción / Términos</label
                >
                <textarea
                    id="bonus-description"
                    bind:value={description}
                    rows="3"
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="Detalles del bono y condiciones importantes..."
                ></textarea>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button
                type="submit"
                disabled={isLoading}
                class="bg-primary hover:bg-opacity-90 text-secondary font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(12,242,242,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {#if isLoading}
                    <span class="inline-block animate-spin mr-2">⟳</span> Guardando...
                {:else}
                    Guardar Bono
                {/if}
            </button>
        </div>
    </form>
</div>

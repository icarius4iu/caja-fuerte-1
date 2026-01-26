<script lang="ts">
    import { onMount } from "svelte";
    import { getBonuses, type Bonus } from "../../../services/firebaseFirestore/bonuses";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    // Internal state instead of props
    let bonuses: Bonus[] = [];
    let isLoading = true;

    onMount(async () => {
        try {
            bonuses = await getBonuses(true); // Get active bonuses
        } catch (error) {
            console.error("Error loading bonuses:", error);
        } finally {
            isLoading = false;
        }
    });

    // State
    let selectedType = "all";
    let selectedSort = "popularity";
    let showPeruvianOnly = false;

    // Dropdown States
    let isTypeOpen = false;
    let isSortOpen = false;

    // Configuration
    const typeLabels = {
        all: "Todos los bonos",
        welcome: "Bono de Bienvenida",
        free_bet: "Apuesta Gratuita",
        rollover: "Rollover",
        combined: "Combinada",
        cashback: "Reembolso",
    };

    const sortOptions = [
        { id: "popularity", label: "Más Reclamados", icon: "fas fa-fire" },
        {
            id: "profit_desc",
            label: "Mayor Ganancia",
            icon: "fas fa-chart-line",
        },
        {
            id: "investment_asc",
            label: "Menor Inversión",
            icon: "fas fa-piggy-bank",
        },
        { id: "newest", label: "Más Recientes", icon: "fas fa-clock" },
    ];

    // Reactive Logic
    $: filteredBonuses = [...bonuses]
        .filter((b) => selectedType === "all" || b.type === selectedType)
        .filter((b) => !showPeruvianOnly || b.country === "PE")
        .sort((a, b) => {
            if (selectedSort === "profit_desc")
                return b.profitAmount - a.profitAmount;
            if (selectedSort === "investment_asc")
                return a.investmentAmount - b.investmentAmount;
            if (selectedSort === "newest")
                return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                );
            return b.popularity - a.popularity; // default logic
        });

    function toggleTypeDropdown() {
        isTypeOpen = !isTypeOpen;
        isSortOpen = false;
    }
    function toggleSortDropdown() {
        isSortOpen = !isSortOpen;
        isTypeOpen = false;
    }

    function selectType(type: string) {
        selectedType = type;
        isTypeOpen = false;
    }
    function selectSort(sort: string) {
        selectedSort = sort;
        isSortOpen = false;
    }

    // Color mapping for badges
    const typeColors = {
        welcome: "bg-green-500/20 text-green-400 border-green-500/20",
        free_bet: "bg-blue-500/20 text-blue-400 border-blue-500/20",
        cashback: "bg-red-500/20 text-red-400 border-red-500/20",
        rollover: "bg-purple-500/20 text-purple-400 border-purple-500/20",
        other: "bg-gray-500/20 text-gray-400 border-gray-500/20",
    };
</script>

<div class="space-y-10 relative z-10 w-full">
    <!-- Filter/Sort Header -->
    <div
        class="bg-[#13151A]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative z-50"
    >
        <!-- Decoration Gradient -->
        <div
            class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none rounded-r-3xl"
        ></div>

        <div
            class="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 relative z-10"
        >
            <!-- Title Section -->
            <div class="flex items-center gap-6">
                <div
                    class="w-16 h-16 bg-surface-darker rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.4)] border border-white/5 relative overflow-hidden group"
                >
                    <div
                        class="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl"
                    ></div>
                    <i
                        class="fas fa-layer-group text-primary text-2xl relative z-10"
                    ></i>
                </div>
                <div>
                    <h2
                        class="text-3xl font-display font-bold text-white mb-2 tracking-tight"
                    >
                        Bonos Exclusivos
                    </h2>
                    <div class="flex items-center gap-3 text-sm">
                        <span
                            class="bg-primary/10 text-primary px-3 py-1 rounded w-fit font-bold shadow-[0_0_10px_rgba(12,242,242,0.1)]"
                        >
                            {filteredBonuses.length} Disponibles
                        </span>
                        <span
                            class="text-gray-500 text-xs uppercase tracking-wide"
                            >Actualizado hoy</span
                        >
                    </div>
                </div>
            </div>

            <!-- Controls Container -->
            <div class="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                <!-- Filter Dropdown -->
                <div class="relative w-full md:w-56 group">
                    <label
                        class="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-2 ml-1 group-hover:text-primary transition-colors"
                        for="filter-type">Categoría</label
                    >
                    <button
                        id="filter-type"
                        on:click={toggleTypeDropdown}
                        class="w-full bg-[#0B0D11] border border-white/10 text-white rounded-xl px-5 py-3.5 flex justify-between items-center hover:bg-surface-darker hover:border-primary/50 transition-all shadow-lg outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <span class="font-medium truncate mr-2 text-sm"
                            >{typeLabels[
                                selectedType as keyof typeof typeLabels
                            ]}</span
                        >
                        <i
                            class={`fas fa-chevron-down text-gray-600 transition-transform duration-300 ${isTypeOpen ? "rotate-180 text-primary" : ""}`}
                        ></i>
                    </button>

                    {#if isTypeOpen}
                        <!-- Dropdown Menu -->
                        <div
                            transition:fly={{ y: -10, duration: 200 }}
                            class="absolute top-full left-0 w-full mt-2 bg-[#1A1E29] border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden ring-1 ring-white/5"
                        >
                            {#each Object.entries(typeLabels) as [key, label]}
                                <button
                                    on:click={() => selectType(key)}
                                    class="w-full text-left px-5 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors text-sm border-b border-white/5 last:border-0 group/item"
                                >
                                    <div
                                        class={`w-2 h-2 rounded-full transition-colors ${selectedType === key ? "bg-primary shadow-[0_0_8px_rgba(12,242,242,0.8)]" : "bg-gray-700 group-hover/item:bg-gray-500"}`}
                                    ></div>
                                    {label}
                                </button>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Sort Dropdown -->
                <div class="relative w-full md:w-56 group">
                    <label
                        class="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-2 ml-1 group-hover:text-accent-orange transition-colors"
                        for="sort-order">Ordenar</label
                    >
                    <button
                        id="sort-order"
                        on:click={toggleSortDropdown}
                        class="w-full bg-[#0B0D11] border border-white/10 text-white rounded-xl px-5 py-3.5 flex justify-between items-center hover:bg-surface-darker hover:border-accent-orange/50 transition-all shadow-lg outline-none focus:ring-2 focus:ring-accent-orange/20"
                    >
                        <span
                            class="font-medium truncate mr-2 flex items-center gap-2 text-sm"
                        >
                            <i
                                class={`${sortOptions.find((o) => o.id === selectedSort)?.icon} text-accent-orange text-xs`}
                            ></i>
                            {sortOptions.find((o) => o.id === selectedSort)
                                ?.label}
                        </span>
                        <i
                            class={`fas fa-chevron-down text-gray-600 transition-transform duration-300 ${isSortOpen ? "rotate-180 text-accent-orange" : ""}`}
                        ></i>
                    </button>

                    {#if isSortOpen}
                        <!-- Dropdown Menu -->
                        <div
                            transition:fly={{ y: -10, duration: 200 }}
                            class="absolute top-full left-0 w-full mt-2 bg-[#1A1E29] border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden ring-1 ring-white/5"
                        >
                            {#each sortOptions as option}
                                <button
                                    on:click={() => selectSort(option.id)}
                                    class="w-full text-left px-5 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors text-sm border-b border-white/5 last:border-0"
                                >
                                    <i
                                        class={`${option.icon} w-5 text-center ${selectedSort === option.id ? "text-accent-orange" : "opacity-30"}`}
                                    ></i>
                                    {option.label}
                                </button>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Peruvian Toggle -->
                <div
                    class="relative w-full md:w-auto h-full flex flex-col justify-end"
                >
                    <!-- Spacer to align with labels -->
                    <div class="h-[22px] mb-2"></div>
                    <button
                        on:click={() => (showPeruvianOnly = !showPeruvianOnly)}
                        class={`w-full md:w-auto px-6 h-[50px] rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 outline-none
                         ${
                             showPeruvianOnly
                                 ? "bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                 : "bg-[#0B0D11] border-white/10 text-gray-400 hover:text-white hover:border-gray-500"
                         }`}
                    >
                        <i class="fas fa-flag"></i>
                        <span class="font-medium text-sm">Solo Perú</span>
                        <div
                            class={`w-2 h-2 rounded-full transition-all duration-300 ${showPeruvianOnly ? "bg-red-500 shadow-[0_0_8px_red]" : "bg-gray-700"}`}
                        ></div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Grid -->
    {#if isLoading}
        <div class="flex justify-center py-20">
            <i class="fas fa-circle-notch fa-spin text-4xl text-primary"></i>
        </div>
    {:else}
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-0"
    >
    
    {#if bonuses.length === 0}
         <div class="col-span-full text-center py-10 text-gray-500">
            No hay bonos disponibles en este momento.
         </div>
    {/if}
        {#each filteredBonuses as bonus, i (bonus.slug)}
            <div
                animate:flip={{ duration: 400 }}
                in:fly={{ y: 30, duration: 500, delay: i * 75 }}
                class="group h-full perspective-1000"
            >
                <div
                    class="relative h-full bg-[#13151A] rounded-3xl border border-white/5 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(12,242,242,0.1)] hover:-translate-y-2 flex flex-col overflow-hidden group-hover:bg-[#16181F]"
                >
                    <!-- Hover Highlight -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    ></div>

                    <!-- Top Card Content -->
                    <div class="p-6 pb-4 relative z-10 flex-grow">
                        <!-- Header Row -->
                        <div class="flex justify-between items-start mb-5">
                            <!-- Logo Container -->
                            <div
                                class={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-white/10 relative overflow-hidden group-hover:scale-105 transition-transform duration-300 ${bonus.bgColor}`}
                            >
                                <div
                                    class="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
                                ></div>
                                <span class="relative z-10 drop-shadow-md"
                                    >{bonus.slug
                                        .substring(0, 2)
                                        .toUpperCase()}</span
                                >
                            </div>

                            <!-- Badges -->
                            <div class="flex flex-col items-end gap-2">
                                <span
                                    class={`text-[10px] font-black uppercase px-2 py-1 rounded border backdrop-blur-sm ${typeColors[bonus.type as keyof typeof typeColors] || typeColors.other}`}
                                >
                                    {typeLabels[
                                        bonus.type as keyof typeof typeLabels
                                    ]?.split(" ")[0] || "BONO"}
                                </span>
                                {#if bonus.country === "PE"}
                                    <span
                                        class="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-1"
                                    >
                                        <i class="fas fa-certificate text-[8px]"
                                        ></i> Perú
                                    </span>
                                {/if}
                            </div>
                        </div>

                        <!-- Titles -->
                        <h3
                            class="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors"
                        >
                            {bonus.title}
                        </h3>
                        <p
                            class="text-gray-400 text-xs leading-relaxed line-clamp-2 h-[2.5em]"
                        >
                            {bonus.description}
                        </p>
                    </div>

                    <!-- Dashed Divider -->
                    <div class="px-6">
                        <div
                            class="border-t border-dashed border-white/10"
                        ></div>
                    </div>

                    <!-- Data Grid - The "Tech" Look -->
                    <div class="px-6 py-4 grid grid-cols-2 gap-4">
                        <div
                            class="bg-black/20 rounded-lg p-2 border border-white/5 text-center group-hover:border-white/10 transition-colors"
                        >
                            <p
                                class="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1"
                            >
                                INVERSIÓN
                            </p>
                            <p
                                class="text-white font-mono font-bold text-sm tracking-tight"
                            >
                                {bonus.investment}
                            </p>
                        </div>
                        <div
                            class="bg-black/20 rounded-lg p-2 border border-white/5 text-center group-hover:border-primary/20 transition-colors relative overflow-hidden"
                        >
                            <!-- Glow behind profit -->
                            <div
                                class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                            ></div>

                            <p
                                class="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1"
                            >
                                GANANCIA
                            </p>
                            <p
                                class={`font-mono font-bold text-sm tracking-tight relative z-10 ${bonus.profitAmount > 0 ? "text-primary" : "text-gray-400"}`}
                            >
                                {bonus.profit}
                            </p>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="p-4 pt-0 mt-auto relative z-10">
                        <a
                            href={`/bonos/${bonus.slug}`}
                            class="relative flex w-full items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0B0D11] border border-white/10 text-white font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300 group/btn shadow-lg overflow-hidden"
                        >
                            <span class="relative z-10">VER ANÁLISIS</span>
                            <i
                                class="fas fa-arrow-right text-xs relative z-10 transform group-hover/btn:translate-x-1 transition-transform"
                            ></i>

                            <!-- Hover Fill -->
                            <div
                                class="absolute inset-0 bg-primary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"
                            ></div>
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {/if}
</div>

<style>
    /* Custom Scrollbar for dropdowns if needed */
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        background: #1a1e29;
    }
    ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>

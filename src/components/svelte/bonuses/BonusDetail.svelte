<script lang="ts">
    import type { Bonus } from "../../../data/bonuses";
    export let bonus: Bonus;
</script>

<div
    class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in relative z-10"
>
    <!-- Sidebar (Left) - Sticky -->
    <div class="lg:col-span-1 space-y-6 sticky top-24">
        <!-- Hero Card -->
        <div
            class="bg-[#13151A]/90 border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden group"
        >
            <!-- Decoration -->
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"
            ></div>

            <div class="flex flex-col items-center text-center relative z-10">
                <div
                    class={`w-28 h-28 ${bonus.bgColor} rounded-3xl flex items-center justify-center text-4xl font-bold text-white mb-6 shadow-2xl border-4 border-[#1A1E29] transform group-hover:scale-105 transition-transform duration-500`}
                >
                    <span class="drop-shadow-lg"
                        >{bonus.slug.substring(0, 2).toUpperCase()}</span
                    >
                </div>

                <h1
                    class="text-3xl font-display font-bold text-white mb-2 leading-tight"
                >
                    {bonus.title}
                </h1>
                <div class="flex items-center gap-2 mb-6">
                    <span
                        class={`text-xs font-bold uppercase px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10`}
                    >
                        {bonus.type.replace("_", " ")}
                    </span>
                    {#if bonus.country === "PE"}
                        <span
                            class="text-xs font-bold uppercase px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20"
                        >
                            <i class="fas fa-flag"></i> Perú
                        </span>
                    {/if}
                </div>
            </div>

            <!-- Profit Highlight Box -->
            <div
                class="bg-gradient-to-br from-[#1A1E29] to-[#0B0D11] rounded-2xl p-5 border border-white/10 relative overflow-hidden group/box hover:border-primary/30 transition-colors"
            >
                <div
                    class="absolute inset-0 bg-primary/5 opacity-0 group-hover/box:opacity-100 transition-opacity duration-500"
                ></div>

                <div
                    class="flex justify-between items-center mb-2 relative z-10"
                >
                    <span
                        class="text-primary text-xs font-bold uppercase tracking-widest"
                        ><i class="fas fa-chart-line mr-2"></i>Ganancia Estimada</span
                    >
                </div>
                <div
                    class="text-4xl font-mono font-bold text-white relative z-10"
                >
                    {bonus.profit}
                </div>
                <div class="text-xs text-gray-500 mt-2 relative z-10">
                    *Ganancia calculada basada en el rollover perfecto.
                </div>
            </div>
        </div>

        <!-- Stats Card -->
        <div
            class="bg-[#13151A]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
        >
            <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                <i class="fas fa-info-circle text-gray-400"></i> Detalles Clave
            </h3>

            <div class="space-y-3">
                <div
                    class="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                    <span class="text-gray-400 text-sm"
                        ><i class="fas fa-piggy-bank w-5 text-center mr-2"></i> Inversión</span
                    >
                    <span class="text-white font-bold font-mono"
                        >{bonus.investment}</span
                    >
                </div>

                <div
                    class="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                    <span class="text-gray-400 text-sm"
                        ><i class="fas fa-id-card w-5 text-center mr-2"></i> Verificación</span
                    >
                    <span class="text-white font-medium text-sm text-right"
                        >{bonus.verification}</span
                    >
                </div>

                <div
                    class="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                    <span class="text-gray-400 text-sm"
                        ><i class="fas fa-wallet w-5 text-center mr-2"></i> Métodos</span
                    >
                    <span
                        class="text-white font-medium text-sm text-right max-w-[50%] truncate"
                        title={bonus.paymentMethods}
                        >{bonus.paymentMethods}</span
                    >
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content (Right) -->
    <div class="lg:col-span-2 space-y-8">
        <!-- Action Banner -->
        <div
            class="bg-gradient-to-r from-secondary to-[#13151A] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden"
        >
            <!-- Background Pattern -->
            <div
                class="absolute inset-0 opacity-10"
                style="background-image: radial-gradient(circle, #0CF2F2 1px, transparent 1px); background-size: 24px 24px;"
            ></div>

            <div class="relative z-10">
                <h2 class="text-2xl font-bold text-white mb-2">
                    ¿Listo para reclamar este bono?
                </h2>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span class="flex items-center gap-1"
                        ><i class="fas fa-check-circle text-green-400"></i> Verificado</span
                    >
                    <span class="flex items-center gap-1"
                        ><i class="fas fa-users text-blue-400"></i>
                        {bonus.popularity || 85}% Popularidad</span
                    >
                </div>
            </div>

            <div class="relative z-10 w-full md:w-auto">
                <button
                    class="group w-full md:w-auto bg-white text-secondary font-bold text-lg py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(12,242,242,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                    <i class="fas fa-external-link-alt"></i>
                    <span>RECLAMAR OFERTA</span>
                </button>
                <p class="text-[10px] text-gray-500 text-center mt-2">
                    Se aplican T&C. Juega con responsabilidad.
                </p>
            </div>
        </div>

        <!-- Video Guide Placeholder -->
        <div
            class="bg-[#0B0D11] rounded-3xl border border-white/10 overflow-hidden relative group aspect-video shadow-2xl"
        >
            {#if bonus.videoUrl && bonus.videoUrl.includes("youtube")}
                <iframe
                    class="w-full h-full"
                    src={bonus.videoUrl}
                    title="Video Guia"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            {:else}
                <!-- Empty State -->
                <div
                    class="absolute inset-0 flex flex-col items-center justify-center bg-[#13151A] group-hover:bg-[#16181F] transition-colors"
                >
                    <div
                        class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10"
                    >
                        <i class="fas fa-play text-4xl text-white ml-2"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">
                        Tutorial Explicativo
                    </h3>
                    <p class="text-gray-500">
                        Aprende paso a paso cómo liberar este bono
                    </p>

                    <!-- Decoration Lines -->
                    <div
                        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20"
                    ></div>
                </div>
            {/if}
        </div>

        <!-- Description Text -->
        <div class="prose prose-invert max-w-none">
            <h3 class="text-white text-xl font-bold mb-4">
                Sobre esta promoción
            </h3>
            <div
                class="bg-[#13151A] rounded-2xl p-6 border border-white/5 text-gray-300 leading-relaxed"
            >
                {bonus.description}
                <br /><br />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
    }
</style>

<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import { auth } from "../../services/firebaseAuthentication/auth";
  import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import {
    getUserRole,
    createUserProfile,
  } from "../../services/firebaseFirestore/users";

  // Interaction Props
  export let isOpen = false;

  const dispatch = createEventDispatcher();

  // State
  let mode: "login" | "register" | "forgot" = "login";
  let email = "";
  let password = "";
  let confirmPassword = ""; // For register
  let fullName = ""; // For register
  let isLoading = false;
  let error = "";
  let successMessage = "";

  onMount(() => {
    // Listen for global open event
    const handleOpen = () => {
      isOpen = true;
    };
    window.addEventListener("open-auth-modal", handleOpen);

    return () => {
      window.removeEventListener("open-auth-modal", handleOpen);
    };
  });

  function close() {
    dispatch("close");
    isOpen = false; // Self-manage closing
    resetForm();
  }

  function resetForm() {
    email = "";
    password = "";
    confirmPassword = "";
    fullName = "";
    error = "";
    successMessage = "";
    mode = "login";
  }

  function toggleMode(newMode: "login" | "register" | "forgot") {
    mode = newMode;
    error = "";
    successMessage = "";
  }

  async function handleSubmit() {
    error = "";
    successMessage = "";
    isLoading = true;

    try {
      if (mode === "login") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        const role = await getUserRole(user.uid);

        if (role !== "user") {
          await signOut(auth);
          error = "Acceso denegado: Esta entrada es solo para estudiantes.";
          isLoading = false;
          return;
        }

        dispatch("login", { user });
        close();
      } else if (mode === "register") {
        if (password !== confirmPassword) {
          error = "Las contraseñas no coinciden";
          isLoading = false;
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        // Update basic profile
        await updateProfile(user, { displayName: fullName });

        // Create Firestore profile
        await createUserProfile(user.uid, email, "user");

        // Auto-login success behavior, or maybe show verify email?
        // For now, assume auto-login ok if role set.

        dispatch("login", { user });
        close();
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        successMessage = "Revisa tu correo para restablecer tu contraseña.";
      }
    } catch (e: any) {
      console.error("Auth error:", e);
      // Map Firebase error codes to user-friendly messages
      switch (e.code) {
        case "auth/email-already-in-use":
          error = "El correo ya está registrado.";
          break;
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          error = "Credenciales incorrectas.";
          break;
        case "auth/weak-password":
          error = "La contraseña es muy débil (mínimo 6 caracteres).";
          break;
        default:
          error = e.message || "Ocurrió un error inesperado.";
      }
    } finally {
      if (mode !== "forgot" || error) {
        isLoading = false;
      } else {
        // Keep loading false but show success message for forgot password
        isLoading = false;
      }
    }
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 dark:bg-black/80 backdrop-blur-md"
    role="button"
    tabindex="0"
    transition:fade={{ duration: 250 }}
    on:click|self={close}
    on:keydown={(e) => e.key === "Escape" && close()}
  >
    <!-- Modal Container -->
    <div
      class="w-full max-w-md bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative transform transition-all"
      transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
    >
      <!-- Close Button -->
      <button
        on:click={close}
        class="absolute top-4 right-4 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors z-20 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
        aria-label="Cerrar modal"
      >
        <i class="fas fa-times text-lg"></i>
      </button>

      <!-- Premium Top Decoration -->
      <div
        class="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
      ></div>

      <!-- Background Glow Effect (Dark Mode Only usually, but let's keep minimal) -->
      <div
        class="absolute -top-20 -right-20 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] pointer-events-none hidden dark:block"
      ></div>
      <div
        class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05] pointer-events-none hidden dark:block"
      ></div>

      <div class="p-8 relative z-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 shadow-[0_0_20px_rgba(12,242,242,0.1)]"
          >
            {#if mode === "login"}
              <i class="fas fa-user text-xl"></i>
            {:else if mode === "register"}
              <i class="fas fa-user-plus text-xl"></i>
            {:else}
              <i class="fas fa-key text-xl"></i>
            {/if}
          </div>
          <h2
            class="text-2xl font-display font-bold text-text-main-light dark:text-white mb-2 tracking-tight"
          >
            {#if mode === "login"}Bienvenido de nuevo
            {:else if mode === "register"}Únete a Caja Fuerte
            {:else}Recuperar Acceso{/if}
          </h2>
          <p
            class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-[80%] mx-auto"
          >
            {#if mode === "login"}Accede a tu cuenta para continuar aprendiendo.
            {:else if mode === "register"}Sé parte de la comunidad educativa de
              apuestas más grande de Latam.
            {:else}Ingresa tu correo y te enviaremos un enlace de recuperación.{/if}
          </p>
        </div>

        <!-- Form -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          {#if mode === "register"}
            <div class="space-y-1.5 text-left">
              <label
                for="fullName"
                class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
                >Nombre</label
              >
              <div class="relative group">
                <input
                  id="fullName"
                  type="text"
                  bind:value={fullName}
                  required
                  class="w-full bg-gray-50 dark:bg-surface-darker border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-400 dark:placeholder-gray-600 pl-11"
                  placeholder="Tu nombre completo"
                />
                <i
                  class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                ></i>
              </div>
            </div>
          {/if}

          <div class="space-y-1.5 text-left">
            <label
              for="email"
              class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
              >Correo</label
            >
            <div class="relative group">
              <input
                id="email"
                type="email"
                bind:value={email}
                required
                class="w-full bg-gray-50 dark:bg-surface-darker border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-400 dark:placeholder-gray-600 pl-11"
                placeholder="hola@ejemplo.com"
              />
              <i
                class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
              ></i>
            </div>
          </div>

          {#if mode !== "forgot"}
            <div class="space-y-1.5 text-left">
              <div class="flex justify-between items-center">
                <label
                  for="password"
                  class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
                  >Contraseña</label
                >
                {#if mode === "login"}
                  <button
                    type="button"
                    on:click={() => toggleMode("forgot")}
                    class="text-xs text-primary hover:text-accent-orange dark:hover:text-[#0CB0B0] transition-colors font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                {/if}
              </div>
              <div class="relative group">
                <input
                  id="password"
                  type="password"
                  bind:value={password}
                  required
                  class="w-full bg-gray-50 dark:bg-surface-darker border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-400 dark:placeholder-gray-600 pl-11"
                  placeholder="••••••••"
                />
                <i
                  class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                ></i>
              </div>
            </div>
          {/if}

          {#if mode === "register"}
            <div class="space-y-1.5 text-left">
              <label
                for="confirmPassword"
                class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1"
                >Confirmar</label
              >
              <div class="relative group">
                <input
                  id="confirmPassword"
                  type="password"
                  bind:value={confirmPassword}
                  required
                  class="w-full bg-gray-50 dark:bg-surface-darker border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-gray-400 dark:placeholder-gray-600 pl-11"
                  placeholder="••••••••"
                />
                <i
                  class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                ></i>
              </div>
            </div>
          {/if}

          <!-- Status Messages -->
          {#if error}
            <div
              class="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm px-4 py-3 rounded-lg flex items-start gap-3"
              transition:fly={{ y: -10, duration: 200 }}
            >
              <i class="fas fa-exclamation-circle flex-shrink-0 mt-0.5"></i>
              <span class="leading-snug">{error}</span>
            </div>
          {/if}

          {#if successMessage}
            <div
              class="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm px-4 py-3 rounded-lg flex items-start gap-3"
              transition:fly={{ y: -10, duration: 200 }}
            >
              <i class="fas fa-check-circle flex-shrink-0 mt-0.5"></i>
              <span class="leading-snug">{successMessage}</span>
            </div>
          {/if}

          <button
            type="submit"
            disabled={isLoading}
            class="w-full bg-gradient-to-r from-primary to-[#0CB0B0] text-secondary-dark font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(12,242,242,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2 flex items-center justify-center gap-2"
          >
            {#if isLoading}
              <i class="fas fa-circle-notch fa-spin"></i>
              <span>Procesando...</span>
            {:else if mode === "login"}
              <span>Iniciar Sesión</span>
              <i class="fas fa-arrow-right"></i>
            {:else if mode === "register"}
              <span>Crear Cuenta</span>
              <i class="fas fa-user-plus"></i>
            {:else}
              <span>Enviar Instrucciones</span>
              <i class="fas fa-paper-plane"></i>
            {/if}
          </button>
        </form>

        <!-- Footer -->
        <div
          class="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-500"
        >
          {#if mode === "login"}
            <span class="block mb-2">¿Aún no eres miembro?</span>
            <button
              on:click={() => toggleMode("register")}
              class="text-secondary dark:text-white font-bold hover:text-primary transition-colors bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 w-full"
            >
              Regístrate Gratis
            </button>
          {:else if mode === "register"}
            <span class="block mb-2">¿Ya tienes cuenta?</span>
            <button
              on:click={() => toggleMode("login")}
              class="text-secondary dark:text-white font-bold hover:text-primary transition-colors bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 w-full"
            >
              Inicia Sesión
            </button>
          {:else}
            <button
              on:click={() => toggleMode("login")}
              class="text-secondary dark:text-white font-bold hover:text-primary transition-colors flex items-center justify-center gap-2 w-full py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
            >
              <i class="fas fa-arrow-left"></i>
              <span>Volver al inicio de sesión</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

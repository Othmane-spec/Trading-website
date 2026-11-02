"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
  ArrowLeft,
  LogOut,
  RefreshCw,
  Users,
  ChevronDown,
  Lock,
  MessageSquare,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface RegistrationItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age?: string | null;
  city?: string | null;
  country: string;
  experience: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  consent: boolean;
  status: "pending" | "contacted" | "approved" | "rejected";
  createdAt?: any;
}

export default function AdminPage() {
  const [adminUser, setAdminUser] = useState<{ email: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Authentication form state
  const [emailInput, setEmailInput] = useState("essaimeko@gmail.com");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.email && isMounted) {
            setAdminUser({ email: data.email });
            setAuthLoading(false);
            return;
          }
        }

        // Fallback to local session storage
        const stored = typeof window !== "undefined" ? sessionStorage.getItem("pf_admin_email") : null;
        if (stored && isMounted) {
          setAdminUser({ email: stored });
        }
      } catch (err) {
        console.warn("Session check fallback:", err);
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen to Firestore registrations in real time when authenticated
  useEffect(() => {
    if (!adminUser) {
      setRegistrations([]);
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    setFetchError(null);

    // Primary: Realtime Firestore onSnapshot
    try {
      const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: RegistrationItem[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            items.push({
              id: docSnap.id,
              fullName: data.fullName || "Sans nom",
              email: data.email || "",
              phone: data.phone || "",
              age: data.age || null,
              city: data.city || null,
              country: data.country || "Non spécifié",
              experience: data.experience || "Beginner",
              consent: !!data.consent,
              status: data.status || "pending",
              createdAt: data.createdAt,
            });
          });
          setRegistrations(items);
          setLoadingData(false);
        },
        async (error) => {
          console.warn("Firestore realtime listener error, falling back to server API:", error);
          // Fallback: Fetch via server route
          try {
            const res = await fetch("/api/admin/registrations");
            const json = await res.json();
            if (json.success && Array.isArray(json.registrations)) {
              setRegistrations(json.registrations);
              setFetchError(null);
            } else {
              setFetchError(json.error || "Impossible de charger les inscriptions.");
            }
          } catch (apiErr: any) {
            setFetchError(apiErr.message || "Erreur de connexion au serveur.");
          } finally {
            setLoadingData(false);
          }
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("Subscription setup error:", err);
      setFetchError(err.message || "Erreur d'initialisation.");
      setLoadingData(false);
    }
  }, [adminUser]);

  // Auth handler via server route
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    const email = emailInput.trim();
    const password = passwordInput.trim();

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Identifiants invalides ou mot de passe incorrect.");
      }

      // Success
      setAdminUser({ email: data.email || email });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pf_admin_email", data.email || email);
      }
    } catch (err: any) {
      console.error("Auth submit error:", err);
      setAuthError(err.message || "Identifiants invalides ou mot de passe incorrect.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (err) {
      console.error("Sign out error:", err);
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pf_admin_email");
    }
    setAdminUser(null);
    setPasswordInput("");
  };

  // Status update
  const handleStatusChange = async (
    id: string,
    newStatus: "pending" | "contacted" | "approved" | "rejected"
  ) => {
    setUpdatingId(id);
    try {
      // 1. Direct Firestore update
      try {
        const docRef = doc(db, "registrations", id);
        await updateDoc(docRef, {
          status: newStatus,
          updatedAt: serverTimestamp(),
        });
      } catch (fbErr) {
        console.warn("Direct Firestore update warning, calling server PATCH API:", fbErr);
        // 2. Server API fallback
        const res = await fetch("/api/admin/registrations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        });
        if (!res.ok) {
          throw new Error("Échec de la mise à jour via l'API.");
        }
      }

      // Optimistic state update in case realtime snapshot takes time
      setRegistrations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      console.error("Failed to update status:", err);
      alert("Erreur lors de la mise à jour du statut : " + (err.message || "Action non autorisée"));
    } finally {
      setUpdatingId(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "ID",
      "Nom Complet",
      "Email",
      "Telephone",
      "Age",
      "Ville",
      "Pays",
      "Niveau Experience",
      "Statut",
      "Date Inscription",
    ];

    const rows = filteredRegistrations.map((reg) => {
      let dateStr = "";
      if (reg.createdAt?.toDate) {
        dateStr = reg.createdAt.toDate().toISOString();
      } else if (reg.createdAt?.seconds) {
        dateStr = new Date(reg.createdAt.seconds * 1000).toISOString();
      } else if (typeof reg.createdAt === "string") {
        dateStr = reg.createdAt;
      }

      return [
        `"${reg.id}"`,
        `"${reg.fullName.replace(/"/g, '""')}"`,
        `"${reg.email}"`,
        `"${reg.phone}"`,
        `"${reg.age || ""}"`,
        `"${(reg.city || "").replace(/"/g, '""')}"`,
        `"${reg.country.replace(/"/g, '""')}"`,
        `"${reg.experience}"`,
        `"${reg.status}"`,
        `"${dateStr}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `printforex-membres-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date helper
  const formatDate = (val: any) => {
    if (!val) return "Récent";
    try {
      const d = val.toDate
        ? val.toDate()
        : new Date(val.seconds ? val.seconds * 1000 : val);
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return "Date inconnue";
    }
  };

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        searchQuery === "" ||
        reg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.phone.includes(searchQuery) ||
        (reg.city && reg.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        reg.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
      const matchesExp = experienceFilter === "all" || reg.experience === experienceFilter;

      return matchesSearch && matchesStatus && matchesExp;
    });
  }, [registrations, searchQuery, statusFilter, experienceFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = registrations.length;
    const pending = registrations.filter((r) => r.status === "pending").length;
    const contacted = registrations.filter((r) => r.status === "contacted").length;
    const approved = registrations.filter((r) => r.status === "approved").length;
    const rejected = registrations.filter((r) => r.status === "rejected").length;

    const beginners = registrations.filter((r) => r.experience === "Beginner").length;
    const intermediates = registrations.filter((r) => r.experience === "Intermediate").length;
    const advanced = registrations.filter((r) => r.experience === "Advanced").length;
    const pros = registrations.filter((r) => r.experience === "Professional").length;

    return { total, pending, contacted, approved, rejected, beginners, intermediates, advanced, pros };
  }, [registrations]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 text-brand-gold animate-spin" />
          <p className="text-xs text-brand-slateText font-medium">Vérification de l&apos;accès administrateur...</p>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN (WITHOUT CREDENTIALS CARD AS REQUESTED)
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white flex flex-col justify-between p-4 sm:p-8">
        <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
          <Link
            className="flex items-center gap-2 text-xs font-semibold text-brand-slateText hover:text-brand-gold transition cursor-pointer"
            href="/"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site principal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm tracking-wider text-brand-gold">
              PRINT<span className="text-white">FOREX</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
              Admin
            </span>
          </div>
        </header>

        <main className="max-w-md w-full mx-auto my-auto py-10">
          <motion.div
            className="rounded-2xl bg-brand-dark/95 border border-brand-border/60 p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-elevated border border-brand-gold/40 flex items-center justify-center text-brand-gold mx-auto mb-3 shadow-gold-sm">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                Portail Administrateur
              </h1>
              <p className="text-xs text-brand-slateText mt-1.5">
                Gestion sécurisée des inscriptions des membres PRINTFOREX
              </p>
            </div>

            {authError && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleAuthSubmit}>
              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Email Administrateur
                </label>
                <input
                  className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
                  placeholder="admin@printforex.com"
                  required
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg bg-brand-card border border-brand-border text-white text-xs px-3.5 py-2.5 pr-10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition font-mono"
                    placeholder="••••••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                  <button
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    className="w-5 h-5 text-brand-slateText hover:text-white absolute right-3 top-2.5 transition cursor-pointer flex items-center justify-center"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-sm hover:brightness-110 transition cursor-pointer disabled:opacity-50 mt-4"
                disabled={isLoggingIn}
                type="submit"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Vérification...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-black" />
                    <span>Déverrouiller l&apos;Accès Admin</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-brand-slateText/70">
                  Accès direct réservé à la gestion de la communauté PRINTFOREX.
                </p>
              </div>
            </form>
          </motion.div>
        </main>

        <footer className="text-center text-[11px] text-brand-slateText/60 py-4">
          PRINTFOREX Cloud Infrastructure · Base Firestore Protégée
        </footer>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#05070a]/90 backdrop-blur-md border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              className="text-xs font-semibold text-brand-slateText hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              href="/"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Retour au site</span>
            </Link>
            <div className="h-4 w-px bg-brand-border" />
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-wider text-brand-gold">
                PRINT<span className="text-white">FOREX</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-medium text-white">{adminUser.email}</span>
              <span className="text-[10px] text-brand-success flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success inline-block animate-pulse" />
                Connecté à Firestore
              </span>
            </div>

            <button
              className="px-3 py-1.5 rounded-lg bg-brand-card hover:bg-brand-elevated border border-brand-border text-xs text-brand-slateText hover:text-white flex items-center gap-1.5 transition cursor-pointer"
              title="Déconnexion"
              onClick={handleSignOut}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              Gestion des Inscriptions Communauté
              <span className="text-xs font-sans font-normal py-0.5 px-2.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
                {registrations.length} membres
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-slateText mt-1">
              Consultez les candidatures, contactez les membres directement par WhatsApp ou Email, et gérez leurs statuts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              className="px-4 py-2.5 rounded-xl bg-brand-card hover:bg-brand-elevated border border-brand-border text-xs font-semibold text-white flex items-center gap-2 transition cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-3.5 h-3.5 text-brand-gold" />
              <span>Actualiser</span>
            </button>

            <button
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black text-xs font-bold flex items-center gap-2 shadow-gold-sm hover:brightness-110 transition cursor-pointer disabled:opacity-50"
              disabled={registrations.length === 0}
              onClick={handleExportCSV}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter CSV ({filteredRegistrations.length})</span>
            </button>
          </div>
        </div>

        {/* Error banner if permission denied */}
        {fetchError && (
          <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-300">Information d&apos;accès :</p>
              <p className="mt-1 leading-relaxed">{fetchError}</p>
            </div>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-dark border border-brand-border/60 relative overflow-hidden">
            <div className="text-xs font-medium text-brand-slateText flex items-center justify-between">
              <span>Total Inscrits</span>
              <Users className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
              {stats.total}
            </div>
            <div className="text-[11px] text-brand-gold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Base Firestore en direct
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-brand-dark border border-brand-border/60 relative overflow-hidden">
            <div className="text-xs font-medium text-brand-slateText flex items-center justify-between">
              <span>En Attente</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-amber-400 mt-2">
              {stats.pending}
            </div>
            <div className="text-[11px] text-brand-slateText mt-1">
              À contacter en priorité
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-brand-dark border border-brand-border/60 relative overflow-hidden">
            <div className="text-xs font-medium text-brand-slateText flex items-center justify-between">
              <span>Contactés</span>
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-sky-400 mt-2">
              {stats.contacted}
            </div>
            <div className="text-[11px] text-brand-slateText mt-1">
              Échange WhatsApp / Email
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-brand-dark border border-brand-border/60 relative overflow-hidden">
            <div className="text-xs font-medium text-brand-slateText flex items-center justify-between">
              <span>Membres Validés</span>
              <CheckCircle2 className="w-4 h-4 text-brand-success" />
            </div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-brand-success mt-2">
              {stats.approved}
            </div>
            <div className="text-[11px] text-brand-slateText mt-1">
              Accès communauté VIP actif
            </div>
          </div>
        </div>

        {/* Experience Distribution Pill Bar */}
        <div className="p-4 rounded-xl bg-brand-card/50 border border-brand-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-brand-slateText font-medium">Répartition des profils :</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Débutants: <strong>{stats.beginners}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300">
              Intermédiaires: <strong>{stats.intermediates}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300">
              Avancés: <strong>{stats.advanced}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
              Professionnels: <strong>{stats.pros}</strong>
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-slateText absolute left-3.5 top-3" />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-card border border-brand-border text-white text-xs placeholder:text-brand-slateText/60 focus:border-brand-gold outline-none transition"
              placeholder="Rechercher par nom, email, téléphone, ville ou pays..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-brand-card border border-brand-border rounded-xl p-1 text-xs">
              <span className="text-[11px] text-brand-slateText px-2 hidden sm:inline">Statut:</span>
              {(["all", "pending", "contacted", "approved", "rejected"] as const).map((st) => (
                <button
                  key={st}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    statusFilter === st
                      ? "bg-brand-gold text-black font-semibold shadow-xs"
                      : "text-brand-slateText hover:text-white"
                  }`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st === "all"
                    ? "Tous"
                    : st === "pending"
                    ? "En attente"
                    : st === "contacted"
                    ? "Contacté"
                    : st === "approved"
                    ? "Validé"
                    : "Refusé"}
                </button>
              ))}
            </div>

            {/* Experience Filter */}
            <select
              className="bg-brand-card border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:border-brand-gold outline-none cursor-pointer"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="all">Tous niveaux</option>
              <option value="Beginner">Débutant</option>
              <option value="Intermediate">Intermédiaire</option>
              <option value="Advanced">Avancé</option>
              <option value="Professional">Professionnel</option>
            </select>
          </div>
        </div>

        {/* Member Table */}
        <div className="rounded-2xl bg-brand-dark border border-brand-border/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080c12] border-b border-brand-border/60 text-[11px] uppercase tracking-wider text-brand-slateText">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Candidat</th>
                  <th className="py-3.5 px-4 font-semibold">Contacts Directs</th>
                  <th className="py-3.5 px-4 font-semibold">Localisation</th>
                  <th className="py-3.5 px-4 font-semibold">Expérience</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Statut</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions rapides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {loadingData ? (
                  <tr>
                    <td className="py-12 text-center text-brand-slateText" colSpan={7}>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 text-brand-gold animate-spin" />
                        <span>Chargement des candidatures Firestore...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td className="py-12 text-center text-brand-slateText" colSpan={7}>
                      {searchQuery || statusFilter !== "all" || experienceFilter !== "all"
                        ? "Aucun membre ne correspond à vos filtres de recherche."
                        : "Aucune inscription enregistrée pour l'instant."}
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => {
                    const cleanPhone = reg.phone.replace(/[^0-9+]/g, "");
                    const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=Bonjour%20${encodeURIComponent(
                      reg.fullName
                    )},%20suite%20à%20votre%20inscription%20sur%20PRINTFOREX,%20nous%20sommes%20ravis%20de%20vous%20accueillir.`;

                    return (
                      <tr
                        key={reg.id}
                        className="hover:bg-brand-elevated/40 transition-colors group"
                      >
                        {/* Full Name & Age */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 flex items-center justify-center font-bold text-xs">
                              {reg.fullName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-brand-gold transition-colors">
                                {reg.fullName}
                              </div>
                              <div className="text-[11px] text-brand-slateText">
                                {reg.age ? `${reg.age} ans` : "Âge non précisé"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contacts */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-brand-slateText hover:text-white transition">
                              <Mail className="w-3 h-3 text-brand-gold flex-shrink-0" />
                              <a
                                className="hover:underline"
                                href={`mailto:${reg.email}?subject=Bienvenue sur PRINTFOREX&body=Bonjour ${encodeURIComponent(reg.fullName)},`}
                              >
                                {reg.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 text-brand-slateText hover:text-white transition">
                              <Phone className="w-3 h-3 text-brand-gold flex-shrink-0" />
                              <a
                                className="font-mono hover:underline"
                                href={`tel:${reg.phone}`}
                              >
                                {reg.phone}
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4 text-white">
                          <div>{reg.city ? `${reg.city}, ` : ""}{reg.country}</div>
                        </td>

                        {/* Experience */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                              reg.experience === "Beginner"
                                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                : reg.experience === "Intermediate"
                                ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                                : reg.experience === "Advanced"
                                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {reg.experience}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-brand-slateText whitespace-nowrap">
                          {formatDate(reg.createdAt)}
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4">
                          <div className="relative inline-block">
                            <select
                              aria-label={`Statut pour ${reg.fullName}`}
                              className={`appearance-none text-[11px] font-semibold pl-2.5 pr-7 py-1 rounded-lg border outline-none cursor-pointer transition ${
                                reg.status === "pending"
                                  ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                                  : reg.status === "contacted"
                                  ? "bg-sky-500/15 text-sky-300 border-sky-500/40"
                                  : reg.status === "approved"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                                  : "bg-red-500/15 text-red-300 border-red-500/40"
                              }`}
                              disabled={updatingId === reg.id}
                              value={reg.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  reg.id,
                                  e.target.value as "pending" | "contacted" | "approved" | "rejected"
                                )
                              }
                            >
                              <option className="bg-[#0b0f17] text-amber-300" value="pending">
                                En attente
                              </option>
                              <option className="bg-[#0b0f17] text-sky-300" value="contacted">
                                Contacté
                              </option>
                              <option className="bg-[#0b0f17] text-emerald-300" value="approved">
                                Validé
                              </option>
                              <option className="bg-[#0b0f17] text-red-300" value="rejected">
                                Refusé
                              </option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-current absolute right-2 top-2 pointer-events-none opacity-60" />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp Direct Link */}
                            <a
                              className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition cursor-pointer"
                              href={whatsappUrl}
                              rel="noreferrer"
                              target="_blank"
                              title="Contacter sur WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {/* Direct Email */}
                            <a
                              className="p-1.5 rounded-lg bg-brand-elevated hover:bg-brand-card border border-brand-border text-brand-slateText hover:text-white transition cursor-pointer"
                              href={`mailto:${reg.email}?subject=Votre candidature PRINTFOREX`}
                              title="Envoyer un email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            {/* One-click approve button */}
                            {reg.status !== "approved" && (
                              <button
                                className="px-2 py-1 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-brand-gold text-[10px] font-semibold transition cursor-pointer"
                                disabled={updatingId === reg.id}
                                title="Valider directement le membre"
                                onClick={() => handleStatusChange(reg.id, "approved")}
                              >
                                {updatingId === reg.id ? "..." : "Valider"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

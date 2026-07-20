import { create } from "zustand";

export type TransitionPhase = "closed" | "exiting" | "open" | "returning";

interface TransitionState {
    activeProjectId: string | null;
    phase: TransitionPhase;
    openProject: (id: string) => void;
    setPhase: (phase: TransitionPhase) => void;
    closeProject: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
    activeProjectId: null,
    phase: "closed",
    openProject: (id) => set({ activeProjectId: id, phase: "exiting" }),
    setPhase: (phase) => set((state) => ({
        phase,
        activeProjectId: phase === "closed" ? null : state.activeProjectId,
    })),
    closeProject: () => set({ phase: "returning" }),
}));

export type SectionKey = "projectsDrawer" | "skillsSection" | "projectFullInformation";


const sectionRegistry = new Map<SectionKey, HTMLElement>();

export function registerSection(key: SectionKey, element: HTMLElement | null) {
    if (element) {
        sectionRegistry.set(key, element);
    } else {
        sectionRegistry.delete(key);
    }
}

export function getSection(key: SectionKey): HTMLElement | undefined {
    return sectionRegistry.get(key);
}

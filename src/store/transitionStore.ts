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



//Flip Cards

export type introCardsTransitionPhase = "closed" | "opened";

interface IntroSectionTransitionState{
    phase: introCardsTransitionPhase;
    introOpened : boolean;
    drawerOpened : boolean;
    flipCards: (toOpen : boolean) => void;
    revealDrawer: (toOpen : boolean) => void;
    setPhase: (phase: introCardsTransitionPhase) => void;
    activeTimelineCards : number[],
    setActiveTimelineCard : (index: number, active: boolean, exclusive?: boolean) => void
}

export const useIntroSectionTransitionState = create<IntroSectionTransitionState>((set) =>({
    phase : 'closed',
    introOpened : false,
    drawerOpened : false,
    flipCards : (toOpen) => set({introOpened: toOpen}),
    revealDrawer : (toOpen) => set({drawerOpened: toOpen}),
    setPhase : (phase) => set({
        phase,
        introOpened : phase === 'closed' ? false : true,
    }),
    activeTimelineCards : [1,2,3],
    setActiveTimelineCard : (index, active, exclusive = false) => set((state) => {
        if (!active) {
            return { activeTimelineCards : state.activeTimelineCards.filter((i) => i !== index) };
        }
        if (exclusive) {
            return { activeTimelineCards : [index] };
        }
        return { activeTimelineCards : [...new Set([...state.activeTimelineCards, index])] };
    }),
}))
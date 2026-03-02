"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

interface ModuleSelectionContextType {
  selectedModules: number[];
  toggleModule: (index: number) => void;
  addModule: (index: number) => void;
  removeModule: (index: number) => void;
  resetModules: () => void;
  isAnnual: boolean;
  setIsAnnual: (v: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  justAdded: number | null;
}

const ModuleSelectionContext = createContext<ModuleSelectionContextType | null>(null);

export function ModuleSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedModules, setSelectedModules] = useState<number[]>([]);
  const [isAnnual, setIsAnnual] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addModule = useCallback(
    (index: number) => {
      if (!selectedModules.includes(index)) {
        setSelectedModules((prev) => [...prev, index]);
        setJustAdded(index);
        setDrawerOpen(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setJustAdded(null), 1200);
      } else {
        // Already selected — just open drawer
        setDrawerOpen(true);
      }
    },
    [selectedModules]
  );

  const removeModule = useCallback((index: number) => {
    setSelectedModules((prev) => prev.filter((i) => i !== index));
  }, []);

  const toggleModule = useCallback(
    (index: number) => {
      if (selectedModules.includes(index)) {
        removeModule(index);
      } else {
        addModule(index);
      }
    },
    [selectedModules, addModule, removeModule]
  );

  const resetModules = useCallback(() => {
    setSelectedModules([]);
    setJustAdded(null);
  }, []);

  return (
    <ModuleSelectionContext.Provider
      value={{
        selectedModules,
        toggleModule,
        addModule,
        removeModule,
        resetModules,
        isAnnual,
        setIsAnnual,
        drawerOpen,
        setDrawerOpen,
        justAdded,
      }}
    >
      {children}
    </ModuleSelectionContext.Provider>
  );
}

export function useModuleSelection() {
  const ctx = useContext(ModuleSelectionContext);
  if (!ctx) throw new Error("useModuleSelection must be used within ModuleSelectionProvider");
  return ctx;
}

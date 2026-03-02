"use client";

import { moduleDefinitions } from "@/lib/dashboard/constants";
import SubscribedModuleCard from "@/components/dashboard/modules/SubscribedModuleCard";
import AvailableModuleCard from "@/components/dashboard/modules/AvailableModuleCard";

// Mock data (will come from Supabase later)
const activeModuleIds = ["chatbot", "agent_vocal"];
const billing = "monthly" as const;

export default function ModulesPage() {
  const activeModules = moduleDefinitions.filter((m) =>
    activeModuleIds.includes(m.id)
  );
  const availableModules = moduleDefinitions.filter(
    (m) => !activeModuleIds.includes(m.id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Modules</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gérez vos modules actifs et découvrez les fonctionnalités
          disponibles.
        </p>
      </div>

      {/* Active modules */}
      <div>
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          Vos modules actifs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeModules.map((m) => (
            <SubscribedModuleCard key={m.id} module={m} billing={billing} />
          ))}
        </div>
      </div>

      {/* Available modules */}
      {availableModules.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-1">
            Modules disponibles
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Boostez votre restaurant avec ces modules additionnels.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {availableModules.map((m) => (
              <AvailableModuleCard key={m.id} module={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

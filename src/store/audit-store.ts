import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuditData } from "@/types/audit";

interface AuditStore extends AuditData {
  setSelectedTools: (
    tools: string[]
  ) => void;

  updateTool: (
    toolId: string,
    field: string,
    value: string | number
  ) => void;

  setUseCase: (
    useCase: string
  ) => void;

  setTeamSize: (
    size: number
  ) => void;

  resetAudit: () => void;
}

export const initialState = {
  selectedTools: [],
  toolDetails: {},
  teamSize: 0,
  useCase: "",
};

export const useAuditStore =
  create<AuditStore>()(
    persist(
      (set) => ({
        ...initialState,

        setSelectedTools: (
          tools
        ) =>
          set({
            selectedTools: tools,
          }),

        updateTool: (
          toolId,
          field,
          value
        ) =>
          set((state) => ({
            toolDetails: {
              ...state.toolDetails,

              [toolId]: {
                ...(state.toolDetails[
                  toolId
                ] || {}),

                [field]: value,
              },
            },
          })),

        setUseCase: (
          useCase
        ) =>
          set({
            useCase,
          }),

        setTeamSize: (
          teamSize
        ) =>
          set({
            teamSize,
          }),

        resetAudit: () =>
          set({
            ...initialState,
          }),
      }),

      {
        name: "burnrate-audit",
      }
    )
  );
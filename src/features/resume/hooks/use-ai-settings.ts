"use client";

import { useLocalStorage } from "usehooks-ts";

import {
  defaultAiSettings,
  type AiSettings,
} from "@/features/resume/ai/ai-settings";

const aiSettingsStorageKey = "openresume:ai-settings";

export function useAiSettings() {
  const [settings, setSettings] = useLocalStorage<AiSettings>(
    aiSettingsStorageKey,
    defaultAiSettings,
  );

  function updateSettings(partial: Partial<AiSettings>) {
    setSettings((currentSettings) => ({ ...currentSettings, ...partial }));
  }

  return { settings, updateSettings };
}

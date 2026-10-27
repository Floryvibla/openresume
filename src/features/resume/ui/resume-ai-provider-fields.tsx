"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  aiProviderCatalog,
  aiProviderKeys,
  type AiProviderKey,
} from "@/features/resume/ai/ai-provider-catalog";
import type { AiSettings } from "@/features/resume/ai/ai-settings";
import { ResumeAiModelField } from "@/features/resume/ui/resume-ai-model-field";

type Props = {
  onChange: (partial: Partial<AiSettings>) => void;
  settings: AiSettings;
};

export function ResumeAiProviderFields({ onChange, settings }: Props) {
  const providerDefinition = aiProviderCatalog[settings.provider];

  function handleProviderChange(nextProvider: AiProviderKey | null) {
    if (!nextProvider) {
      return;
    }

    onChange({
      model: aiProviderCatalog[nextProvider].defaultModel,
      provider: nextProvider,
    });
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="resume-ai-provider">Provedor</FieldLabel>
          <Select onValueChange={handleProviderChange} value={settings.provider}>
            <SelectTrigger className="w-full" id="resume-ai-provider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiProviderKeys.map((providerKey) => (
                <SelectItem key={providerKey} value={providerKey}>
                  {aiProviderCatalog[providerKey].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <ResumeAiModelField
          model={settings.model}
          onChange={(model) => onChange({ model })}
          provider={settings.provider}
        />
      </div>
      <Field>
        <FieldLabel htmlFor="resume-ai-api-key">
          {providerDefinition.apiKeyLabel}
        </FieldLabel>
        <Input
          autoComplete="off"
          id="resume-ai-api-key"
          onChange={(event) => onChange({ apiKey: event.target.value })}
          placeholder={providerDefinition.apiKeyPlaceholder}
          type="password"
          value={settings.apiKey}
        />
        <FieldDescription>
          A chave fica salva apenas neste navegador.
        </FieldDescription>
      </Field>
    </>
  );
}

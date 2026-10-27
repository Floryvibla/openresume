"use client";

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type {
  AiModelOption,
  AiProviderKey,
} from "@/features/resume/ai/ai-provider-catalog";
import { useAiModels } from "@/features/resume/hooks/use-ai-models";

type Props = {
  model: string;
  onChange: (model: string) => void;
  provider: AiProviderKey;
};

export function ResumeAiModelField({ model, onChange, provider }: Props) {
  const { errorMessage, isLoading, models } = useAiModels(provider);
  const selectedModel = models.find((option) => option.id === model) ?? null;

  function handleModelChange(nextModel: AiModelOption | null) {
    if (nextModel) {
      onChange(nextModel.id);
    }
  }

  return (
    <Field>
      <FieldLabel htmlFor="resume-ai-model">Modelo</FieldLabel>
      <Combobox
        itemToStringLabel={(option) => option.label}
        itemToStringValue={(option) => option.id}
        items={models}
        onValueChange={handleModelChange}
        value={selectedModel}
      >
        <ComboboxInputGroup>
          <ComboboxInput
            disabled={isLoading}
            id="resume-ai-model"
            placeholder={isLoading ? "Carregando modelos..." : "Pesquisar modelo"}
          />
          <ComboboxClear />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxEmpty>
            {errorMessage || "Nenhum modelo encontrado."}
          </ComboboxEmpty>
          <ComboboxList>
            {(option: AiModelOption) => (
              <ComboboxItem key={option.id} value={option}>
                {option.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>{model}</FieldDescription>
    </Field>
  );
}

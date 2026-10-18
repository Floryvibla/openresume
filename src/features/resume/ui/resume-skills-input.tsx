"use client";

import { useState } from "react";

import { XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  onChange: (skills: string[]) => void;
  value: string[];
};

export function ResumeSkillsInput({ onChange, value }: Props) {
  const [draftSkill, setDraftSkill] = useState("");

  function addSkill(rawSkill: string) {
    const skill = rawSkill.trim();

    if (!skill) {
      setDraftSkill("");
      return;
    }

    const alreadyExists = value.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    );

    if (!alreadyExists) {
      onChange([...value, skill]);
    }

    setDraftSkill("");
  }

  function removeSkill(skillToRemove: string) {
    onChange(value.filter((skill) => skill !== skillToRemove));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addSkill(draftSkill);
      return;
    }

    if (event.key === "Backspace" && !draftSkill && value.length > 0) {
      removeSkill(value[value.length - 1]);
    }
  }

  return (
    <Field>
      <FieldLabel htmlFor="resume-skills">Skills</FieldLabel>
      <FieldDescription>
        Digite e pressione Enter para adicionar. Clique no X para remover.
      </FieldDescription>
      <Input
        className="h-10"
        id="resume-skills"
        onBlur={() => addSkill(draftSkill)}
        onChange={(event) => setDraftSkill(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma skill e pressione Enter"
        value={draftSkill}
      />
      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((skill) => (
            <Badge className="pr-1" key={skill} variant="secondary">
              {skill}
              <button
                aria-label={`Remover ${skill}`}
                className="grid size-4 place-items-center rounded-full hover:bg-foreground/10"
                onClick={() => removeSkill(skill)}
                type="button"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}
    </Field>
  );
}

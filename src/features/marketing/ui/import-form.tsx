"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBoolean } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function ImportForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const { value: isPending, setTrue: startLoading } = useBoolean(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startLoading();
    router.push(`/resume?identifier=${encodeURIComponent(identifier.trim())}`);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="linkedin-identifier">LinkedIn do candidato</FieldLabel>
          <Input
            id="linkedin-identifier"
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="linkedin.com/in/seu-perfil ou publicIdentifier"
            required
            value={identifier}
          />
          <FieldDescription>
            Cole a URL publica do perfil ou apenas o identificador do LinkedIn.
          </FieldDescription>
        </Field>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" disabled={isPending} type="submit">
            {isPending ? <Spinner data-icon="inline-start" /> : null}
            Gerar curriculo
          </Button>
          <Button
            nativeButton={false}
            render={
              <Link href="/dashboard" />
            }
            variant="outline"
          >
            Abrir workspace
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

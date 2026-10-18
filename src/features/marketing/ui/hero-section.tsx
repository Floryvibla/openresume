import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImportForm } from "@/features/marketing/ui/import-form";
import { LogoMark } from "@/features/marketing/ui/logo-mark";

export function HeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="flex flex-col gap-6">
        <LogoMark />
        <Badge variant="secondary">MVP ATS-first</Badge>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Importe o perfil do LinkedIn e transforme em um curriculo limpo, claro e pronto para ATS.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            O Open Resume busca os dados do perfil, organiza experiencias e skills em um documento profissional e gera um PDF pronto para compartilhar.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-2xl border px-4 py-3">Importacao server-side</div>
          <div className="rounded-2xl border px-4 py-3">Estrutura otimizada para ATS</div>
          <div className="rounded-2xl border px-4 py-3">Edicao e link publico</div>
        </div>
      </div>
      <Card className="border-primary/20 shadow-none">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Comecar importacao</h2>
            <p className="text-sm text-muted-foreground">
              O processamento acontece no servidor usando a Voyager API.
            </p>
          </div>
          <Separator />
          <ImportForm />
        </CardContent>
      </Card>
    </section>
  );
}

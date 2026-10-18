import { BadgeCheckIcon, FileOutputIcon, Share2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    description: "Busca resumo, experiencias, skills, educacao e certificacoes.",
    icon: BadgeCheckIcon,
    title: "Importacao focada em perfil",
  },
  {
    description: "Render simples, com hierarquia limpa e sem ruido visual.",
    icon: FileOutputIcon,
    title: "Layout pronto para ATS",
  },
  {
    description: "Salve rascunhos no navegador atual e publique links quando quiser.",
    icon: Share2Icon,
    title: "Workspace e compartilhamento",
  },
];

export function FeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <Card className="shadow-none" key={feature.title}>
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <feature.icon />
            </div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Menos configuracao manual, mais velocidade para sair com um curriculo profissional.
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

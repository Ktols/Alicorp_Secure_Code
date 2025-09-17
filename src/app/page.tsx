"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VulnerabilityAnalyzer from "@/components/vulnerability-analyzer";
import VulnerablePackagesList from "@/components/vulnerable-packages-list";
import { Logo } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold">Alicorp Secure Code</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <p className="text-muted-foreground">
            Sube tus archivos `package.json` y/o `package-lock.json` para analizar las dependencias de tu proyecto en busca de vulnerabilidades conocidas.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <Tabs defaultValue="analyzer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analyzer">Analizador de vulnerabilidades</TabsTrigger>
              <TabsTrigger value="list">Base de datos de paquetes vulnerables</TabsTrigger>
            </TabsList>
            <TabsContent value="analyzer">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Dependencias</CardTitle>
                  <CardDescription>
                    Sube tus archivos de paquetes para iniciar el análisis. Todo el procesamiento se realiza en tu navegador.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VulnerabilityAnalyzer />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="list">
               <Card>
                <CardHeader>
                  <CardTitle>Paquetes Vulnerables Conocidos</CardTitle>
                  <CardDescription>
                    Esta es la lista de vulnerabilidades contra las que el escáner realiza la comprobación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VulnerablePackagesList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        Construido con Next.js y Firebase Genkit. Todo el análisis se realiza en el lado del cliente.
      </footer>
    </div>
  );
}

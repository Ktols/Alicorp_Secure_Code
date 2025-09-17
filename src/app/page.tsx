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
          <h1 className="text-2xl font-semibold">VulnCheck.js</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <p className="text-muted-foreground">
            Upload your `package.json` and/or `package-lock.json` to analyze your project's dependencies for known vulnerabilities.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <Tabs defaultValue="analyzer">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analyzer">Vulnerability Analyzer</TabsTrigger>
              <TabsTrigger value="list">Vulnerable Packages Database</TabsTrigger>
            </TabsList>
            <TabsContent value="analyzer">
              <Card>
                <CardHeader>
                  <CardTitle>Dependency Analysis</CardTitle>
                  <CardDescription>
                    Upload your package files to start the analysis. All processing is done in your browser.
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
                  <CardTitle>Known Vulnerable Packages</CardTitle>
                  <CardDescription>
                    This is the list of vulnerabilities the scanner checks against.
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
        Built with Next.js and Firebase Genkit. All analysis is performed client-side.
      </footer>
    </div>
  );
}

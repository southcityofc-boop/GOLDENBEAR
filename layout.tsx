
export const metadata = { title: "Golden Bear Store", description: "Loja Golden Bear" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="pt-BR"><body>{children}</body></html>);
}

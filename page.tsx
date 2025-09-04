
"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Star, Plus, Minus, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BRAND = { name: "Golden Bear", tagline: "Força, estilo e confiança.", cta: "Comprar agora", currency: "BRL" };

const CATEGORIES = [ { id: "all", label: "Tudo" }, { id: "lifestyle", label: "Lifestyle" }, { id: "tech", label: "Tech" }, { id: "acessorios", label: "Acessórios" } ];
const PRODUCTS = [
  { id: "1", title: "Camiseta Golden Bear Classic", price: 99.9, rating: 4.6, category: "lifestyle", stock: 50, image: null, description: "Algodão premium e caimento perfeito.", tags: ["Novo"] },
  { id: "2", title: "Moletom Premium Polar", price: 249.9, rating: 4.8, category: "lifestyle", stock: 25, image: null, description: "Conforto térmico e design minimalista.", tags: ["Coleção"] },
  { id: "3", title: "Boné StreetBear", price: 79.9, rating: 4.5, category: "acessorios", stock: 60, image: null, description: "Ajustável e resistente para o dia a dia.", tags: ["Frete grátis"] },
  { id: "4", title: "Relógio StrongBear Edition", price: 399.9, rating: 4.7, category: "acessorios", stock: 10, image: null, description: "Durável, estiloso e à prova d'água.", tags: [] },
  { id: "5", title: "Garrafa Térmica PolarSteel", price: 149.9, rating: 4.4, category: "acessorios", stock: 40, image: null, description: "Inox, 12h quente / 24h gelada.", tags: ["Oferta"] },
  { id: "6", title: "Tênis BearRun Pro", price: 349.9, rating: 4.6, category: "lifestyle", stock: 28, image: null, description: "Leve, estável e pronto para o treino.", tags: [] },
];

function formatCurrency(value:number){ try{ return new Intl.NumberFormat("pt-BR",{style:"currency",currency:BRAND.currency}).format(value); }catch{ return `R$ ${value.toFixed(2)}`; } }

export default function Page(){
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("all"); const [sort,setSort]=useState("relevance");
  const [cartOpen,setCartOpen]=useState(false); const [cart,setCart]=useState<any[]>([]);
  const filtered = useMemo(()=> PRODUCTS.filter(p=> (category==="all"||p.category===category) && (p.title.toLowerCase().includes(query.toLowerCase())||p.description.toLowerCase().includes(query.toLowerCase())) ),[query,category,sort]);

  const addToCart = (product:any)=> setCart(prev=>{ const f=prev.find((i:any)=>i.id===product.id); if(f) return prev.map(i=>i.id===product.id?{...i, qty:i.qty+1}:i); return [...prev,{...product, qty:1}]; });
  const increment = (id:string)=> setCart(prev=> prev.map(i=>i.id===id?{...i, qty:i.qty+1}:i));
  const decrement = (id:string)=> setCart(prev=> prev.map(i=>i.id===id?{...i, qty:i.qty-1}:i).filter(i=>i.qty>0));
  const removeItem = (id:string)=> setCart(prev=> prev.filter(i=>i.id!==id));
  const subtotal = cart.reduce((s:any,i:any)=> s + i.price * i.qty, 0);
  const shipping = subtotal > 399 ? 0 : cart.length > 0 ? 24.9 : 0;
  const total = subtotal + shipping;

  async function handleCheckout(){
    if(cart.length===0){ alert("Carrinho vazio"); return; }
    // prepare items for Mercado Pago
    const items = cart.map(i=>({ title:i.title, quantity:i.qty, unit_price: Math.round(i.price*100)/100 }));
    try{
      const res = await fetch("/api/checkout", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ items }) });
      const data = await res.json();
      if(data && data.init_point) window.location.href = data.init_point;
      else if(data && data.checkout_url) window.location.href = data.checkout_url;
      else alert("Erro ao iniciar checkout");
    }catch(e){ alert("Erro ao conectar com o servidor"); console.error(e); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Golden Bear logo" className="h-9 w-9 rounded-2xl object-cover border" />
            <div><p className="font-bold leading-none">Golden Bear</p><p className="text-xs text-slate-500">Força, estilo e confiança.</p></div>
          </div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2">
            {CATEGORIES.map(c=>(<button key={c.id} onClick={()=>setCategory(c.id)} className={`rounded-2xl border px-3 py-1.5 text-sm ${category===c.id? "bg-slate-900 text-white":""}`}>{c.label}</button>))}
          </div>
          <Button variant="secondary" className="gap-2" onClick={()=>setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" /><span className="hidden sm:inline">Carrinho</span>
            {cart.length>0 && <span className="ml-1 rounded-full bg-slate-900 text-white text-xs px-2">{cart.reduce((a:any,i:any)=>a+i.qty,0)}</span>}
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Golden Bear — qualidade que dura.
              </motion.h1>
              <p className="mt-3 text-slate-600 max-w-xl">Produtos selecionados para quem valoriza qualidade e design minimalista.</p>
              <div className="mt-6 flex items-center gap-2">
                <Button size="lg">Comprar agora</Button>
                <Button size="lg" variant="outline">Ver novidades</Button>
              </div>
            </div>
            <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.5}} className="rounded-3xl overflow-hidden shadow-2xl border bg-white grid place-items-center h-[320px] md:h-[420px]">
              <img src="/logo.png" alt="Golden Bear" className="h-40 w-40 object-contain opacity-90" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y bg-white/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input value={query} onChange={(e:any)=>setQuery(e.target.value)} placeholder="Buscar produtos..." className="pl-10" />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <select value={sort} onChange={(e:any)=>setSort(e.target.value)} className="border rounded-xl px-3 py-2 text-sm">
              <option value="relevance">Ordenar: Relevância</option>
              <option value="rating">Melhor avaliados</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p=>(
            <Card key={p.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-52 w-full bg-slate-100 grid place-items-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <div className="h-16 w-16 rounded-xl bg-slate-200 grid place-items-center text-xl font-bold">GB</div>
                    <span className="text-xs mt-2">Sem imagem</span>
                  </div>
                  <div className="absolute left-3 top-3 flex gap-2">{p.tags?.map((t:string)=>(<Badge key={t} className="bg-white/90 text-slate-900">{t}</Badge>))}</div>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{p.description}</CardDescription>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4" /> {p.rating}
                  <span className="mx-1">•</span>
                  <span>Estoque: {p.stock}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xl font-extrabold">{formatCurrency(p.price)}</div>
                  <div className="flex gap-2">
                    <Button onClick={()=>addToCart(p)} className="rounded-xl">Adicionar</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0"><div className="text-xs text-slate-500">Categoria: {p.category}</div></CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-14 border rounded-3xl p-6 md:p-10 bg-white/70 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Receba ofertas exclusivas</h3>
              <p className="text-sm text-slate-600">Descontos, novidades e lançamentos diretamente no seu e-mail.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input placeholder="Seu e-mail" className="rounded-xl" />
              <Button className="rounded-xl">Inscrever</Button>
            </div>
          </div>
        </div>
      </main>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[95vw] sm:w-[420px] bg-white shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Seu carrinho</h3>
              <Button variant="ghost" onClick={()=>setCartOpen(false)}>Fechar</Button>
            </div>
            <div className="mt-4 space-y-4">
              {cart.length===0 ? (<p className="text-sm text-slate-500">Seu carrinho está vazio.</p>) : (
                <div className="space-y-4">
                  {cart.map(item=>(
                    <div key={item.id} className="flex gap-3">
                      <div className="h-16 w-16 rounded-xl bg-slate-100 grid place-items-center">GB</div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-500">{formatCurrency(item.price)} • Qtde: {item.qty}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="icon" variant="outline" onClick={()=>decrement(item.id)}><Minus className="h-4 w-4" /></Button>
                          <Button size="icon" variant="outline" onClick={()=>increment(item.id)}><Plus className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={()=>removeItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="font-semibold">{formatCurrency(item.price * item.qty)}</div>
                    </div>
                  ))}
                  <Separator />
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                    <div className="flex justify-between"><span>Frete</span><span>{shipping===0? 'Grátis': formatCurrency(shipping)}</span></div>
                    <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>Finalizar compra</Button>
                  <p className="text-xs text-slate-500">* Exemplo de checkout — Mercado Pago.</p>
                </div>
              )}
            </div>
            <Separator />
            <footer className="text-xs text-slate-500 mt-4">© {new Date().getFullYear()} Golden Bear. Todos os direitos reservados.</footer>
          </div>
        </div>
      )}

      <footer className="border-t bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div><div className="flex items-center gap-2"><img src="/logo.png" alt="Golden Bear" className="h-8 w-8 rounded-xl object-cover border" /><span className="font-semibold">Golden Bear</span></div><p className="mt-2 text-slate-600">Força, estilo e confiança • Atendimento humanizado e envio rápido para todo o Brasil.</p></div>
          <div><p className="font-semibold mb-2">Institucional</p><ul className="space-y-1 text-slate-600"><li>Sobre nós</li><li>Política de privacidade</li><li>Trocas e devoluções</li><li>Contato</li></ul></div>
          <div><p className="font-semibold mb-2">Ajuda</p><ul className="space-y-1 text-slate-600"><li>Entrega</li><li>Pagamento</li><li>Cupons</li><li>Suporte</li></ul></div>
          <div><p className="font-semibold mb-2">Redes</p><ul className="space-y-1 text-slate-600"><li>Instagram</li><li>TikTok</li><li>YouTube</li><li>Twitter/X</li></ul></div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-6">© {new Date().getFullYear()} Golden Bear. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}

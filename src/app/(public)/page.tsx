"use client";

import { useState } from "react";
import { Search, MapPin, Home, BedDouble, Filter } from "lucide-react";

import TextBox from "@/components/ui-custom/public/TxtBox";
import FeaturedPropertiesCarousel from "@/components/ui-custom/public/Carousel";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"comprar" | "alugar">("comprar");
  return (
    <div>
      <FeaturedPropertiesCarousel/>

      <div className="hidden w-full lg:flex justify-center 2xl:mt-[-30px] relative">
        <div className="flex justify-around w-full px-6 2xl:px-0 2xl:w-11/12 gap-4 2xl:gap-16 absolute mt-8 2xl:mt-0">
          <TextBox />
          <TextBox />
          <TextBox />
        </div>
      </div>

      <section className="w-full max-w-5xl mx-auto px-4 py-8 mt-[200px]">
        <div className="flex flex-col gap-4">
          {/* Título da Seção */}
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            Encontre seu imóvel ideal
          </h2>

          {/* Card Principal de Busca */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            {/* Abas de Tipo de Negócio (Comprar/Alugar) */}
            <div className="flex gap-6 mb-6 border-b border-slate-100 pb-2">
              <button
                onClick={() => setActiveTab("comprar")}
                className={`pb-2 text-sm font-semibold transition-all relative ${
                  activeTab === "comprar"
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Comprar
              </button>
              <button
                onClick={() => setActiveTab("alugar")}
                className={`pb-2 text-sm font-semibold transition-all relative ${
                  activeTab === "alugar"
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Alugar
              </button>
            </div>

            {/* Formulário em Grid */}
            <form className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Input: Localização (Ocupa mais espaço) */}
              <div className="col-span-1 md:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Localização
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Cidade, bairro ou rua..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Select: Tipo de Imóvel */}
              <div className="col-span-1 md:col-span-3 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Tipo
                </label>
                <div className="relative group">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <select className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 appearance-none cursor-pointer">
                    <option value="">Todos os tipos</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa</option>
                    <option value="terreno">Terreno</option>
                    <option value="cobertura">Cobertura</option>
                  </select>
                  {/* Seta customizada para o select */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Select: Quartos (Menor) */}
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Quartos
                </label>
                <div className="relative group">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <select className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 appearance-none cursor-pointer">
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                    <option value="4+">4+</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Botão de Busca e Filtro Avançado */}
              <div className="col-span-1 md:col-span-3 flex gap-2">
                {/* Botão Principal */}
                <button
                  type="submit"
                  className="flex-1 bg-[#1F3A4D] hover:bg-[#162936] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                </button>

                {/* Botão Filtros (Opcional, para manter o 'avançado') */}
                <button
                  type="button"
                  className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors tooltip"
                  title="Filtros avançados"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

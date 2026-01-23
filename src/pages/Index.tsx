import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Hammer,
  Truck,
  AlertTriangle,
  Menu,
  X,
  Clock,
  TrendingUp,
  FileCheck
} from 'lucide-react';

import AnimatedBackground from '@/components/AnimatedBackground';
import Section from '@/components/ui/Section';
import SnabHubLogo from '@/components/SnabHubLogo';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import AIChatbot from '@/components/AIChatbot';
import { FormStatus } from '@/types';
import { supabase } from '@/integrations/supabase/client';

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    request: ''
  });

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: { type: 'request', ...formData }
      });
      if (error) throw error;
      setFormStatus(FormStatus.SUCCESS);
      setFormData({ name: '', phone: '', email: '', request: '' });
    } catch {
      setFormStatus(FormStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <SnabHubLogo variant="dark" />
          </div>

          <div className="hidden md:flex items-center space-x-8 font-semibold">
            <button onClick={() => handleScroll('services')}>Услуги</button>
            <button onClick={() => handleScroll('reviews')}>Отзывы</button>
            <button
              onClick={() => handleScroll('contact')}
              className="bg-brand-primary text-white px-6 py-2 rounded-full"
            >
              Оставить заявку
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-28 bg-brand-dark text-white overflow-hidden">

        {/* Animated background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-brand-accent/20 text-brand-accent rounded-full">
              СНАБЖЕНИЕ БИЗНЕСА И СТРОЙКИ
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Снабжение объектов под ключ
              <br />
              <span className="text-gradient-hero">для бизнеса и подрядчиков</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              Комплексные поставки стройматериалов, ГСМ, инструмента и СИЗ
              с логистикой и полной ответственностью.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => handleScroll('contact')}
                className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold"
              >
                Рассчитать заявку
              </button>
              <button
                onClick={() => handleScroll('services')}
                className="border border-slate-500 px-8 py-4 rounded-lg"
              >
                Наши услуги
              </button>
            </div>
          </motion.div>

          {/* RIGHT — 100% BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="absolute w-[420px] h-[420px] rounded-3xl bg-slate-800/70 backdrop-blur-md border border-white/10 shadow-2xl" />

            <div className="relative z-10 text-center">
              <div className="text-6xl font-extrabold mb-2">100%</div>
              <div className="uppercase tracking-widest text-slate-300 text-sm mb-4">
                Комплектация объектов
              </div>
              <div className="h-1 w-16 bg-brand-accent mx-auto rounded-full mb-6" />
              <div className="inline-flex items-center gap-2 bg-brand-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                📦 5000+ позиций
              </div>
            </div>

            <div className="absolute top-8 right-8 bg-white text-slate-900 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </span>
              <div className="text-sm">
                <div className="text-xs text-slate-400">Заявка #4829</div>
                <div className="font-semibold">Отгружено в срок</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SEO TEXT */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-4xl mx-auto px-4 text-slate-700">
          <h2 className="text-3xl font-bold mb-6">
            Комплексное снабжение объектов под ключ
          </h2>
          <p>
            СнабХаб-Групп обеспечивает комплексные поставки материалов и оборудования
            для бизнеса и подрядчиков по всей России.
          </p>
        </div>
      </section>

      {/* PROBLEMS */}
      <Section variant="gray">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Clock />, title: 'Срывы сроков' },
            { icon: <AlertTriangle />, title: 'Ошибки в поставках' },
            { icon: <TrendingUp />, title: 'Переплаты' }
          ].map((i, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-4 text-brand-primary">{i.icon}</div>
              <h3 className="font-bold text-xl">{i.title}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="services" variant="dark">
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard icon={<Truck />} title="Снабжение" />
          <ServiceCard icon={<Hammer />} title="Работы" />
          <ServiceCard icon={<FileCheck />} title="Тендеры" />
        </div>
      </Section>

      <Section id="reviews" variant="white">
        <ReviewsCarousel />
      </Section>

      <footer className="bg-brand-dark text-slate-400 py-10 text-center">
        © {new Date().getFullYear()} СнабХаб-Групп
      </footer>

      <AIChatbot />
    </div>
  );
}

function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-slate-800 p-8 rounded-xl text-center">
      <div className="mb-4 text-brand-accent">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  );
}

export default Index;


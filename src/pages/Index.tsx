import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Hammer,
  Truck,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileCheck,
  Menu,
  X
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

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">

      {/* BACKGROUND (НЕ ОБРЕЗАЕТСЯ) */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>

      {/* NAV */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <SnabHubLogo variant="dark" />
          </div>

          <div className="hidden md:flex items-center space-x-8 font-semibold">
            <button onClick={() => handleScroll('services')}>Услуги</button>
            <button onClick={() => handleScroll('benefits')}>Почему мы</button>
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
      <section className="relative pt-36 pb-28 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-brand-accent/20 text-brand-accent rounded-full">
              СНАБЖЕНИЕ БИЗНЕСА И СТРОЙКИ
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Снабжение объектов под ключ
              <br />
              <span className="text-gradient-hero">
                для бизнеса и подрядчиков
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              Комплексные поставки стройматериалов, ГСМ, инструмента и СИЗ
              с логистикой и полно

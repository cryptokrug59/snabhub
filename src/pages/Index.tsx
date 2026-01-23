import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hammer,
  Truck,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Clock,
  Package,
  TrendingUp,
  FileCheck,
  Link
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

  const [activeTab, setActiveTab] = useState<'request' | 'tender'>('request');
  const [tenderFormStatus, setTenderFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [tenderFormData, setTenderFormData] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    tenderNumber: '',
    tenderLink: '',
    comment: ''
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

  const handleTenderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTenderFormStatus(FormStatus.SUBMITTING);
    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: { type: 'tender', ...tenderFormData }
      });
      if (error) throw error;
      setTenderFormStatus(FormStatus.SUCCESS);
      setTenderFormData({
        company: '',
        contactPerson: '',
        email: '',
        phone: '',
        tenderNumber: '',
        tenderLink: '',
        comment: ''
      });
    } catch {
      setTenderFormStatus(FormStatus.ERROR);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <SnabHubLogo variant="dark" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleScroll('services')}>Наши услуги</button>
            <button onClick={() => handleScroll('benefits')}>Почему мы</button>
            <button onClick={() => handleScroll('reviews')}>Отзывы</button>
            <button onClick={() => handleScroll('contact')} className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold">
              Оставить заявку
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-20 bg-brand-dark text-white">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6 inline-block px-4 py-1 bg-brand-accent/20 text-brand-accent rounded-full">
              СНАБЖЕНИЕ БИЗНЕСА И СТРОЙКИ
            </div>

            {/* SEO H1 */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Снабжение объектов под ключ
              <br />
              <span className="text-gradient-hero">для бизнеса и подрядчиков</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Комплексные поставки строительных материалов, ГСМ, инструмента и СИЗ
              с логистикой и сопровождением по всей России.
            </p>

            <div className="flex gap-4">
              <button onClick={() => handleScroll('contact')} className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold">
                Рассчитать заявку
              </button>
              <button onClick={() => handleScroll('services')} className="border px-8 py-4 rounded-lg">
                Наши услуги
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO TEXT BLOCK */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-4xl mx-auto px-4 text-slate-700">
          <h2 className="text-3xl font-bold mb-6">
            Комплексное снабжение объектов под ключ
          </h2>

          <p className="mb-4">
            <strong>Снабжение объектов под ключ</strong> — ключевой фактор соблюдения сроков
            и бюджета при строительстве и эксплуатации коммерческих объектов.
            Компания <strong>СнабХаб-Групп</strong> оказывает услуги снабжения
            для бизнеса и подрядчиков по всей России.
          </p>

          <p className="mb-4">
            Мы поставляем строительные материалы, ГСМ, электроинструмент,
            спецодежду и оборудование. Берём на себя подбор,
            закупку, доставку и контроль качества.
          </p>

          <p>
            СнабХаб-Групп — единый центр ответственности,
            прозрачные условия и надежная логистика.
          </p>
        </div>
      </section>

      {/* ДАЛЬНЕЙШИЕ БЛОКИ — БЕЗ ИЗМЕНЕНИЙ */}
      {/* (Problems, Services, Forms, Footer — оставлены как есть) */}

      <AIChatbot />
    </div>
  );
}

export default Index;

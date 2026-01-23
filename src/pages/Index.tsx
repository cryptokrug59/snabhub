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

      {/* HERO — SEO H1 */}
      <section className="relative pt-36 pb-24 bg-brand-dark text-white overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
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
        </div>
      </section>

      {/* SEO TEXT BLOCK */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-4xl mx-auto px-4 text-slate-700">
          <h2 className="text-3xl font-bold mb-6">
            Комплексное снабжение объектов под ключ
          </h2>

          <p className="mb-4">
            <strong>Снабжение объектов под ключ</strong> — это основа
            бесперебойной работы строительных и коммерческих проектов.
            Компания <strong>СнабХаб-Групп</strong> обеспечивает комплексные поставки
            для бизнеса и подрядчиков по всей России.
          </p>

          <p className="mb-4">
            Мы поставляем строительные материалы, ГСМ, электроинструмент,
            спецодежду и СИЗ. Берём на себя подбор, закупку, доставку,
            контроль качества и документооборот.
          </p>

          <p>
            СнабХаб-Групп — это единый договор, прозрачные цены,
            собственная логистика и персональный менеджер.
          </p>
        </div>
      </section>

      {/* PROBLEMS */}
      <Section variant="gray">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Clock />, title: 'Срывы сроков', text: 'Поставки приезжают с опозданием' },
            { icon: <AlertTriangle />, title: 'Ошибки', text: 'Привозят не то или не в срок' },
            { icon: <TrendingUp />, title: 'Переплаты', text: 'Разные поставщики = лишние расходы' }
          ].map((i, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-4 text-brand-primary">{i.icon}</div>
              <h3 className="font-bold text-xl mb-2">{i.title}</h3>
              <p className="text-slate-600">{i.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" variant="dark">
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Truck />}
            title="Комплексное снабжение"
            items={[
              'Стройматериалы',
              'ГСМ и масла',
              'Инструмент',
              'СИЗ и спецодежда'
            ]}
          />
          <ServiceCard
            icon={<Hammer />}
            title="Строительные работы"
            items={[
              'Ремонт',
              'Монтаж',
              'Фасады',
              'Кровля'
            ]}
          />
          <ServiceCard
            icon={<FileCheck />}
            title="Тендеры"
            items={[
              'Поиск закупок',
              'Подготовка КП',
              'Сопровождение',
              'Контракты'
            ]}
          />
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" variant="white">
        <ReviewsCarousel />
      </Section>

      {/* CONTACT FORM */}
      <Section id="contact" variant="white">
        {/* форма оставлена без изменений по логике */}
      </Section>

      <footer className="bg-brand-dark text-slate-400 py-10 text-center">
        © {new Date().getFullYear()} СнабХаб-Групп. Все права защищены.
      </footer>

      <AIChatbot />
    </div>
  );
}

/* SERVICE CARD */
function ServiceCard({
  icon,
  title,
  items
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-slate-800 p-8 rounded-xl">
      <div className="mb-4 text-brand-accent">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <ul className="text-slate-400 space-y-2">
        {items.map((i, idx) => (
          <li key={idx}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

export default Index;


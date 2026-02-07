import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Section from '@/components/ui/Section';
import SnabHubLogo from '@/components/SnabHubLogo';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import AIChatbot from '@/components/AIChatbot';
import CraneAnimation from '@/components/CraneAnimation';
import ServicesDirections from '@/components/ServicesDirections';
import { FormStatus } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [tenderFormStatus, setTenderFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    request: ''
  });
  const [tenderFormData, setTenderFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tenderNumber: '',
    tenderLink: '',
    comment: ''
  });
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    try {
      const {
        error
      } = await supabase.functions.invoke('send-telegram', {
        body: {
          type: 'request',
          ...formData
        }
      });
      if (error) throw error;
      setFormStatus(FormStatus.SUCCESS);
      setFormData({
        name: '',
        phone: '',
        email: '',
        request: ''
      });
    } catch {
      setFormStatus(FormStatus.ERROR);
    }
  };

  const handleTenderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTenderFormStatus(FormStatus.SUBMITTING);
    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          type: 'tender',
          ...tenderFormData
        }
      });
      if (error) throw error;
      setTenderFormStatus(FormStatus.SUCCESS);
      setTenderFormData({
        name: '',
        phone: '',
        email: '',
        tenderNumber: '',
        tenderLink: '',
        comment: ''
      });
    } catch {
      setTenderFormStatus(FormStatus.ERROR);
    }
  };
  return <div className="min-h-screen bg-slate-50 font-sans">

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-24 flex justify-between items-center">
          <div onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })} className="cursor-pointer">
            <SnabHubLogo variant="dark" />
          </div>

          <div className="hidden md:flex items-center space-x-8 font-semibold">
            <button onClick={() => handleScroll('services')}>Услуги</button>
            <button onClick={() => handleScroll('reviews')}>Отзывы</button>
            <button onClick={() => handleScroll('contact')} className="bg-brand-primary text-white px-6 py-2 rounded-full">
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
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
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
              <button onClick={() => handleScroll('contact')} className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold">
                Рассчитать заявку
              </button>
              <button onClick={() => handleScroll('services')} className="border border-slate-500 px-8 py-4 rounded-lg">
                Наши услуги
              </button>
            </div>
          </motion.div>

          {/* RIGHT — 100% BLOCK */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1
        }} className="relative hidden md:flex items-center justify-center">
            {/* Crane Animation Background */}
            <CraneAnimation />
            {/* Animated background card with pulse */}
            <motion.div className="absolute w-[420px] h-[420px] rounded-3xl bg-slate-800/70 backdrop-blur-md border border-white/10 shadow-2xl" animate={{
            boxShadow: ['0 25px 50px -12px rgba(0, 0, 0, 0.25)', '0 25px 80px -12px rgba(59, 130, 246, 0.3)', '0 25px 50px -12px rgba(0, 0, 0, 0.25)']
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }} />

            <div className="relative z-10 text-center">
              {/* Animated 100% with glow */}
              <motion.div className="text-6xl font-extrabold mb-2" animate={{
              textShadow: ['0 0 20px rgba(255, 255, 255, 0)', '0 0 40px rgba(255, 255, 255, 0.5)', '0 0 20px rgba(255, 255, 255, 0)']
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                100%
              </motion.div>
              
              <motion.div className="uppercase tracking-widest text-slate-300 text-sm mb-4" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.5,
              duration: 0.8
            }}>
                Комплектация объектов
              </motion.div>
              
              {/* Animated accent bar */}
              <motion.div className="h-1 w-16 bg-brand-accent mx-auto rounded-full mb-6" initial={{
              scaleX: 0
            }} animate={{
              scaleX: 1
            }} transition={{
              delay: 0.8,
              duration: 0.6,
              ease: "easeOut"
            }} />
              
              {/* Pulsing badge */}
              <motion.div className="inline-flex items-center gap-2 bg-brand-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg" animate={{
              scale: [1, 1.05, 1],
              boxShadow: ['0 10px 15px -3px rgba(0, 0, 0, 0.1)', '0 20px 25px -5px rgba(59, 130, 246, 0.4)', '0 10px 15px -3px rgba(0, 0, 0, 0.1)']
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}>
                📦 5000+ позиций
              </motion.div>
            </div>

            {/* Floating notification card */}
            <motion.div className="absolute top-8 right-8 bg-white text-slate-900 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3" initial={{
            opacity: 0,
            x: 50,
            y: -20
          }} animate={{
            opacity: 1,
            x: 0,
            y: [0, -8, 0]
          }} transition={{
            opacity: {
              delay: 1.2,
              duration: 0.6
            },
            x: {
              delay: 1.2,
              duration: 0.6
            },
            y: {
              delay: 2,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}>
              <motion.span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600" animate={{
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 2.5
            }}>
                ✓
              </motion.span>
              <div className="text-sm">
                <div className="text-xs text-slate-400">Заявка #4829</div>
                <div className="font-semibold">Отгружено в срок</div>
              </div>
            </motion.div>
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

      {/* SERVICES / DIRECTIONS */}
      <Section id="services" variant="dark">
        <ServicesDirections />
      </Section>

      <Section id="reviews" variant="white">
        <ReviewsCarousel />
      </Section>

      {/* CONTACT / REQUEST FORM */}
      <Section id="contact" variant="gray">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="request" className="text-sm font-semibold">
                Оставить заявку
              </TabsTrigger>
              <TabsTrigger value="tender" className="text-sm font-semibold">
                Пригласить на тендер
              </TabsTrigger>
            </TabsList>

            <TabsContent value="request">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <textarea
                  placeholder="Опишите вашу задачу"
                  value={formData.request}
                  onChange={e => setFormData({ ...formData, request: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-primary/90 transition-colors"
                  disabled={formStatus === FormStatus.SUBMITTING}
                >
                  {formStatus === FormStatus.SUBMITTING ? 'Отправка...' : 'Отправить заявку'}
                </button>
                {formStatus === FormStatus.SUCCESS && (
                  <p className="text-green-600 text-center">Заявка отправлена! Мы свяжемся с вами.</p>
                )}
                {formStatus === FormStatus.ERROR && (
                  <p className="text-red-600 text-center">Ошибка отправки. Попробуйте позже.</p>
                )}
              </form>
            </TabsContent>

            <TabsContent value="tender">
              <form onSubmit={handleTenderSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={tenderFormData.name}
                  onChange={e => setTenderFormData({ ...tenderFormData, name: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={tenderFormData.phone}
                  onChange={e => setTenderFormData({ ...tenderFormData, phone: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={tenderFormData.email}
                  onChange={e => setTenderFormData({ ...tenderFormData, email: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="text"
                  placeholder="Номер тендера / закупки"
                  value={tenderFormData.tenderNumber}
                  onChange={e => setTenderFormData({ ...tenderFormData, tenderNumber: e.target.value })}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="url"
                  placeholder="Ссылка на тендер (необязательно)"
                  value={tenderFormData.tenderLink}
                  onChange={e => setTenderFormData({ ...tenderFormData, tenderLink: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <textarea
                  placeholder="Комментарий"
                  value={tenderFormData.comment}
                  onChange={e => setTenderFormData({ ...tenderFormData, comment: e.target.value })}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-accent text-brand-dark py-3 rounded-lg font-bold hover:bg-brand-accent/90 transition-colors"
                  disabled={tenderFormStatus === FormStatus.SUBMITTING}
                >
                  {tenderFormStatus === FormStatus.SUBMITTING ? 'Отправка...' : 'Пригласить на тендер'}
                </button>
                {tenderFormStatus === FormStatus.SUCCESS && (
                  <p className="text-green-600 text-center">Приглашение отправлено! Мы свяжемся с вами.</p>
                )}
                {tenderFormStatus === FormStatus.ERROR && (
                  <p className="text-red-600 text-center">Ошибка отправки. Попробуйте позже.</p>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      <footer className="bg-brand-dark text-slate-400 py-10 text-center">
        © {new Date().getFullYear()} СнабХаб-Групп
      </footer>

      <AIChatbot />
    </div>
}

export default Index;
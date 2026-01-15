import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Truck, CheckCircle, AlertTriangle, Phone, Mail, MapPin, Menu, X, ShieldCheck, Clock, Package, TrendingUp } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Section from '@/components/ui/Section';
import SnabHubLogo from '@/components/SnabHubLogo';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { FormStatus } from '@/types';
function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    request: ''
  });
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    setTimeout(() => {
      setFormStatus(FormStatus.SUCCESS);
      setFormData({
        name: '',
        phone: '',
        request: ''
      });
    }, 1500);
  };
  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 60
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true
    },
    transition: {
      duration: 0.6
    }
  };
  return <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })}>
              <SnabHubLogo variant="dark" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleScroll('services')} className="text-slate-600 hover:text-brand-primary transition-colors font-semibold">
                Каталог услуг
              </button>
              <button onClick={() => handleScroll('benefits')} className="text-slate-600 hover:text-brand-primary transition-colors font-semibold">
                Почему мы
              </button>
              <button onClick={() => handleScroll('reviews')} className="text-slate-600 hover:text-brand-primary transition-colors font-semibold">
                Отзывы
              </button>
              <button onClick={() => handleScroll('contact')} className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Оставить заявку 
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="md:hidden bg-white border-t">
              <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                <button onClick={() => handleScroll('services')} className="block py-2 text-lg text-slate-600">
                  Каталог услуг
                </button>
                <button onClick={() => handleScroll('benefits')} className="block py-2 text-lg text-slate-600">
                  Почему мы
                </button>
                <button onClick={() => handleScroll('contact')} className="w-full bg-brand-primary text-white py-3 rounded-lg text-center font-bold">
                  Заказать снабжение
                </button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>

      {/* 1. Attention (Hero) */}
      <section className="relative pt-36 pb-20 md:pt-52 md:pb-32 overflow-hidden bg-brand-dark text-white diagonal-clip">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
              <div className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-6 border border-brand-accent/50">
                СНАБЖЕНИЕ БИЗНЕСА И СТРОЙКИ
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Бесперебойные поставки
                <br />
                <span className="text-gradient-hero">для вашего дела.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">От ГСМ и стройматериалов до электроинструмента и сельхозпродукции. Всё, что нужно для работы, в одном месте. Плюс профессиональные строительные услуги.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleScroll('contact')} className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition-all shadow-brand transform hover:scale-105">
                  Рассчитать заявку
                </button>
                <button onClick={() => handleScroll('services')} className="px-8 py-4 rounded-lg font-bold text-lg border border-slate-600 hover:bg-white/10 transition-all">
                  Наши услуги  
                </button>
              </div>
            </motion.div>

            {/* Abstract visual representation */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.3,
            duration: 0.8
          }} className="relative hidden md:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-cyan-400 rounded-3xl transform rotate-6 opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                  {/* Stylish grid overlay */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-10">
                    {[...Array(36)].map((_, i) => <div key={i} className="bg-white/20"></div>)}
                  </div>
                  <div className="text-center p-8 z-10">
                    <div className="text-5xl font-bold text-white mb-2">100%</div>
                    <div className="text-slate-400 uppercase tracking-widest text-sm">
                      Комплектация объектов
                    </div>
                    <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div className="absolute -top-10 -right-10 bg-white text-brand-dark p-4 rounded-xl shadow-xl flex items-center gap-3 z-20" animate={{
                y: [0, -15, 0]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}>
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Заявка #4829</div>
                    <div className="font-bold">Отгружено в срок</div>
                  </div>
                </motion.div>
                <motion.div className="absolute -bottom-5 -left-5 bg-brand-primary text-white p-4 rounded-xl shadow-xl z-20" animate={{
                y: [0, 15, 0]
              }} transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}>
                  <div className="flex items-center gap-2">
                    <Package size={20} />
                    <span className="font-bold">5000+ позиций</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Definition of the Problem */}
      <Section variant="white" className="pt-20">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Проблемы со <span className="text-red-500">снабжением</span> тормозят работу?
          </h2>
          <p className="text-lg text-slate-600">
            Бесконечный поиск нужных позиций, срыв сроков доставки, переплаты посредникам и
            простой техники из-за отсутствия ГСМ. Ваш бизнес теряет деньги, пока вы ждете
            поставку.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
          icon: <Clock size={40} />,
          title: 'Задержки поставок',
          desc: 'Материалы не приезжают вовремя, рабочие и техника простаивают, графики горят.'
        }, {
          icon: <AlertTriangle size={40} />,
          title: 'Брак и некондиция',
          desc: 'Привезли не то, что заказывали. Возврат занимает недели, а работать нужно сейчас.'
        }, {
          icon: <TrendingUp size={40} />,
          title: 'Завышенные цены',
          desc: 'Закупка у десятка разных мелких поставщиков увеличивает бюджет на логистику и наценки.'
        }].map((item, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: idx * 0.1
        }} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>)}
        </div>
      </Section>

      {/* 3. Solution Proposal */}
      <Section variant="dark" diagonal="both" className="relative">
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <Truck size={400} />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              СнабХаб-Групп — ваш внешний{' '}
              <span className="text-brand-primary">отдел снабжения</span>
            </h2>
            <p className="text-slate-300 text-lg mb-6">
              Мы берем на себя всю рутину по поиску и доставке. Вы отправляете заявку — мы
              привозим всё: от самореза до бочки масла. Единый договор, единый счет, единая
              ответственность.
            </p>
            <ul className="space-y-4">
              {['Широчайший ассортимент: стройка, ГСМ, агро, инструмент', 'Собственная логистика и автопарк спецтехники', 'Прямые дилерские контракты с производителями', 'Строительные услуги как надежное дополнение'].map((item, i) => <li key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>)}
            </ul>
          </motion.div>
          <motion.div className="relative" initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop" alt="Logistics and Supply" className="rounded-lg shadow-2xl border-4 border-white/10" />
            <div className="absolute -bottom-6 -left-6 bg-white text-brand-dark p-6 rounded-lg shadow-xl max-w-xs">
              <p className="font-bold text-lg mb-1">Оптимизация до 20%</p>
              <p className="text-sm text-slate-500">
                Сокращаем расходы на закупки за счет оптовых цен и грамотной логистики.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 4. Achievements (Authority) */}
      <Section variant="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{
          num: '10k+',
          label: 'Товарных позиций'
        }, {
          num: '1200',
          label: 'Тонн отгружено'
        }, {
          num: '50+',
          label: 'Партнеров-заводов'
        }, {
          num: '24/7',
          label: 'Прием заявок'
        }].map((stat, idx) => <motion.div key={idx} initial={{
          scale: 0.5,
          opacity: 0
        }} whileInView={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: idx * 0.1
        }} className="p-6">
              <div className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-2">
                {stat.num}
              </div>
              <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </motion.div>)}
        </div>
      </Section>

      {/* 5. Benefits */}
      <Section id="benefits" variant="gray" className="diagonal-clip">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают СнабХаб?</h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
          title: 'Всё в одном месте',
          desc: 'Не нужно искать 10 разных поставщиков. Мы привезем стройматериалы, масла и сельхозпродукцию одной машиной.'
        }, {
          title: 'Оперативная логистика',
          desc: 'Собственный транспорт позволяет нам не зависеть от транспортных компаний и доставлять точно в срок.'
        }, {
          title: 'Оптовые цены',
          desc: 'Благодаря большим объемам закупок мы предлагаем цены ниже розничных магазинов.'
        }, {
          title: 'Любые объемы',
          desc: 'Работаем как с крупными строительными объектами, так и с частными заказчиками.'
        }, {
          title: 'Гарантия качества',
          desc: 'Весь товар сертифицирован. Предоставляем полный пакет документов и паспорта качества.'
        }, {
          title: 'Услуги монтажа',
          desc: 'Если нужно не только привезти, но и построить — наши бригады готовы приступить к работе.'
        }].map((benefit, i) => <motion.div key={i} whileHover={{
          y: -5
        }} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-brand-primary/50 transition-all">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 text-brand-primary font-bold">
                {i + 1}
              </div>
              <h3 className="font-bold text-xl mb-3">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.desc}</p>
            </motion.div>)}
        </div>
      </Section>

      {/* 6. Social Proof */}
      <Section id="reviews" variant="white">
        <ReviewsCarousel />
      </Section>

      {/* 7. Offer (Product/Service) */}
      <Section id="services" variant="dark" diagonal="top">
        <div className="text-center mb-16 pt-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Наши направления</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ключевой профиль — комплексное снабжение предприятий и частных лиц
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Supply Column - Primary Focus */}
          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-brand-primary shadow-brand-lg transform md:-translate-y-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-brand-primary rounded-lg text-white">
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Комплексное снабжение</h3>
                <span className="text-brand-primary text-sm font-bold uppercase tracking-wider">
                  Основное направление
                </span>
              </div>
            </div>
            <ul className="space-y-4 text-slate-300 text-lg">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <span>
                  <strong>Стройматериалы:</strong> кирпич, блоки, бетон, сухие смеси,
                  утеплители, металлопрокат.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <span>
                  <strong>Электроинструмент:</strong> профессиональное оборудование Bosch,
                  Makita, Dewalt и расходники.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <span>
                  <strong>ГСМ и Масла:</strong> моторные, гидравлические, трансмиссионные масла,
                  смазки (бочки и канистры).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <span>
                  <strong>Сельхоз продукция:</strong> удобрения, корма, агрохимия, укрывные
                  материалы.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <span>
                  <strong>Спецодежда и СИЗ:</strong> полная экипировка для рабочих.
                </span>
              </li>
            </ul>
          </div>

          {/* Construction Column - Secondary Focus */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-slate-700 rounded-lg text-white">
                <Hammer size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Строительство и Ремонт</h3>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  Дополнительный сервис
                </span>
              </div>
            </div>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                Ремонт квартир, домов и коммерческих помещений.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                Монтаж инженерных систем (электрика, сантехника).
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                Кровельные и фасадные работы.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                Благоустройство территории.
              </li>
            </ul>
            <div className="mt-8 p-4 bg-slate-700/30 rounded-lg text-sm text-slate-400 border border-slate-700">
              <p>
                Мы используем собственные материалы, что гарантирует качество и соблюдение
                сроков при выполнении работ.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Scarcity & 9. Guarantee & 10. CTA (Combined in Form Section) */}
      <Section id="contact" variant="white">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-brand-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Dynamic background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-accent/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Начните работать сейчас!</h3>
              <p className="mb-6 text-blue-100">
                Мы расширяем базу постоянных клиентов. Возьмем на приоритетное обслуживание
                только{' '}
                <span className="font-bold text-white bg-red-500/20 px-2 rounded">
                  5 новых компаний
                </span>{' '}
                в этом месяце.
              </p>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="text-brand-accent" />
                  <span className="font-bold">Фиксация цен</span>
                </div>
                <p className="text-sm opacity-80">
                  Мы фиксируем стоимость материалов в счете на 3 дня. Успейте оплатить по старым
                  ценам до подорожания.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex gap-3">
                <Phone size={20} className="flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <a href="tel:+79125882713" className="hover:text-brand-accent transition-colors font-medium">
                    +7 (912) 588-27-13
                  </a>
                  <a href="tel:+79183524512" className="hover:text-brand-accent transition-colors font-medium">
                    +7 (918) 352-45-12
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <a href="mailto:snabhab-group@mail.ru" className="hover:text-brand-accent transition-colors">
                  snabhab-group@mail.ru
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                г. Краснодар, квартал Восточный
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-10 bg-white">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Оставьте заявку  
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ваше имя
                </label>
                <input type="text" required value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                <input type="tel" required value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none" placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Что нужно поставить?
                </label>
                <textarea rows={3} value={formData.request} onChange={e => setFormData({
                ...formData,
                request: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none" placeholder="Например: 10 тонн арматуры, 5 бочек масла 10w40..."></textarea>
              </div>
              {formStatus === FormStatus.ERROR && <div className="text-red-500 text-sm text-center">
                  Произошла ошибка. Попробуйте снова.
                </div>}
              <button type="submit" disabled={formStatus === FormStatus.SUBMITTING || formStatus === FormStatus.SUCCESS} className={`w-full py-4 rounded-lg font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg ${formStatus === FormStatus.SUCCESS ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-primary hover:bg-blue-700'}`}>
                {formStatus === FormStatus.SUBMITTING ? 'Отправка...' : formStatus === FormStatus.SUCCESS ? 'Заявка принята!' : 'Получить расчет'}
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* 11. Warning */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="text-red-500" />
          </div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">
            Почему стоит отправить заявку сейчас?
          </h4>
          <p className="text-slate-600">
            Рынок нестабилен. Цены на металл, ГСМ и стройматериалы меняются еженедельно.
            Отправьте список потребностей сейчас, чтобы мы забронировали товар на складе и
            зафиксировали стоимость.
          </p>
        </div>
      </section>

      {/* 12. Footer (Reminder) */}
      <footer className="bg-brand-dark text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <SnabHubLogo variant="light" />
            <div className="text-center md:text-right">
              <p className="mb-2">Ваш надежный партнер в комплексном снабжении.</p>
              <p className="text-sm text-slate-600">
                © {new Date().getFullYear()} СнабХаб-Групп. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}
export default Index;
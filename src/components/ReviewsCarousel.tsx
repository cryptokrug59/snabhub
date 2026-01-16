import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Сергей Ковалев',
    role: 'Прораб СтройГрупп',
    text: 'Заказываем здесь всё: от сухих смесей до профессионального инструмента. Доставка всегда вовремя, простоев нет.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    name: 'Алексей Петров',
    role: 'Директор ТехноСервис',
    text: 'Сотрудничаем уже второй год. Цены ниже рынка, качество на высоте. Рекомендую всем партнерам.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
  },
  {
    name: 'Андрей Соколов',
    role: 'Владелец строительной компании',
    text: 'Особенно ценю комплексный подход — одна заявка, один счёт, одна доставка. Экономия времени колоссальная.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  },
];

const clients = [
  { name: 'СтройГрупп', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' },
  { name: 'ТехноСервис', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop' },
  { name: 'СтройМастер', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop' },
];

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div ref={sectionRef}>
      <h2 className="text-3xl font-bold text-center mb-12">Нам доверяют снабжение</h2>
      
      {/* Client logos */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {clients.map((client, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-300 cursor-pointer ${
              currentIndex === i 
                ? 'opacity-100 scale-110' 
                : 'opacity-50 grayscale hover:opacity-80 hover:grayscale-0'
            }`}
            onClick={() => goToSlide(i)}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
              <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-slate-600">{client.name}</span>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-brand-primary hover:scale-110 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 p-8 md:p-12 rounded-2xl relative"
            >
              <div className="text-brand-accent text-6xl absolute top-4 right-6 opacity-20">"</div>
              <p className="text-slate-700 text-lg md:text-xl italic mb-8 relative z-10 leading-relaxed">
                {reviews[currentIndex].text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-primary/20">
                  <img
                    src={reviews[currentIndex].image}
                    alt={reviews[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">{reviews[currentIndex].name}</div>
                  <div className="text-sm text-slate-500">{reviews[currentIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-brand-primary hover:scale-110 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === i 
                ? 'w-8 bg-brand-primary' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;

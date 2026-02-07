import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Hammer, FileCheck, Package, Wrench, Shield, Droplets, HardHat } from 'lucide-react';

const ServicesDirections = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Наши направления
        </motion.h2>
        <motion.p 
          className="text-slate-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ключевой профиль — комплексное снабжение предприятий и подрядчиков
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Main Card - Комплексное снабжение */}
        <motion.div 
          className="lg:row-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-brand-primary/30 shadow-xl shadow-brand-primary/10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-brand-primary/20 flex items-center justify-center">
              <Truck className="w-7 h-7 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Комплексное снабжение</h3>
              <span className="text-brand-accent text-sm font-medium uppercase tracking-wider">Основное направление</span>
            </div>
          </div>

          <ul className="space-y-5 text-slate-300">
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">Стройматериалы:</span> кирпич, блоки, бетон, сухие смеси, утеплители, металлопрокат.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">Электроинструмент:</span> профессиональное оборудование Bosch, Makita, Dewalt и расходники.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">ГСМ и Масла:</span> моторные, гидравлические, трансмиссионные масла, смазки (бочки и канистры).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white">Спецодежда и СИЗ:</span> полная экипировка для рабочих, каски, перчатки, обувь.
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-400 text-sm">Более 5000 позиций на складе</span>
            </div>
          </div>
        </motion.div>

        {/* Secondary Card - Строительство и Ремонт */}
        <motion.div 
          className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center">
              <Hammer className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Строительство и Ремонт</h3>
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Дополнительный сервис</span>
            </div>
          </div>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Ремонт квартир, домов и коммерческих помещений.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Монтаж инженерных систем (электрика, сантехника).
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Кровельные и фасадные работы.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Благоустройство территории.
            </li>
          </ul>

          <div className="mt-5 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
            <p className="text-slate-400 text-xs italic">
              Мы используем собственные материалы, что гарантирует качество и соблюдение сроков при выполнении работ.
            </p>
          </div>
        </motion.div>

        {/* Tertiary Card - Тендерное сопровождение */}
        <motion.div 
          className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Тендерное сопровождение</h3>
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Для бизнеса</span>
            </div>
          </div>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Подготовка документации для участия в тендерах.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Поиск и мониторинг актуальных закупок.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Формирование коммерческих предложений.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Сопровождение до заключения контракта.
            </li>
          </ul>

          <div className="mt-5 p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-primary" />
              <p className="text-brand-primary text-xs font-medium">
                Работаем с 44-ФЗ и 223-ФЗ
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ServicesDirections;

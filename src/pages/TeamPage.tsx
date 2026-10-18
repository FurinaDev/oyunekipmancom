import React, { useState } from 'react';
import {
  Linkedin,
  MapPin,
  CheckCircle2,
  Users,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';
import { TeamMemberCompact } from '../types';

const COMPACT_TEAM: TeamMemberCompact[] = [
  {
    id: 't1',
    name: 'Efe Özkan',
    role: 'Kurucu & Marka Sahibi',
    department: 'management',
    departmentLabel: 'Yönetim',
    location: 'İstanbul',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/efeozkan',
  },
  {
    id: 't2',
    name: 'Kaan Demir',
    role: 'Donanım Test & Benchmark Lideri',
    department: 'lab',
    departmentLabel: 'Donanım Test Laboratuvarı',
    location: 'İzmir',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/kaandemir-hw',
  },
  {
    id: 't3',
    name: 'Selin Aktaş',
    role: 'İçerik Üreticileri & Espor Lideri',
    department: 'esports',
    departmentLabel: 'Espor & Yayıncı Ağı',
    location: 'İstanbul',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/selinaktas-creator',
  },
  {
    id: 't4',
    name: 'Av. Mert Çelik',
    role: 'Hukuk & Escrow Müşaviri',
    department: 'legal',
    departmentLabel: 'Hukuk & Regülasyon',
    location: 'Ankara',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/mertcelik-law',
  },
  {
    id: 't5',
    name: 'Batuhan Kaya',
    role: 'Kıdemli Full-Stack Mühendisi',
    department: 'tech',
    departmentLabel: 'Yazılım & Güvenlik',
    location: 'İstanbul',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/batuhankaya-dev',
  },
  {
    id: 't6',
    name: 'Deniz Eren',
    role: 'Switch & Manyetik Sensör Analisti',
    department: 'lab',
    departmentLabel: 'Donanım Test Laboratuvarı',
    location: 'Bursa',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/denizeren-switch',
  },
  {
    id: 't7',
    name: 'Zeynep Yılmaz',
    role: 'Topluluk & Anti-Fraud Moderatörü',
    department: 'tech',
    departmentLabel: 'Yazılım & Güvenlik',
    location: 'Antalya',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/zeynepyilmaz-safety',
  },
  {
    id: 't8',
    name: 'Emre Karaca',
    role: 'Turnuva & Sponsorluk Yöneticisi',
    department: 'esports',
    departmentLabel: 'Espor & Yayıncı Ağı',
    location: 'İstanbul',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    linkedinUrl: 'https://linkedin.com/in/emrekaraca-esports',
  },
];

export const TeamPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filteredMembers = COMPACT_TEAM.filter(
    (m) => selectedDept === 'all' || m.department === selectedDept
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>Profesyonel Yönetim & Teknik Kadro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Ekibimiz
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          oyunekipman.com platformunun donanım test laboratuvarı, espor ilişkileri, yazılım güvenliği ve hukuk departmanları.
        </p>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex justify-center flex-wrap gap-2 text-xs font-bold">
        {[
          { key: 'all', label: 'Tüm Ekip' },
          { key: 'management', label: 'Yönetim' },
          { key: 'lab', label: 'Donanım Test Laboratuvarı' },
          { key: 'esports', label: 'Espor & Yayıncı Ağı' },
          { key: 'tech', label: 'Yazılım & Güvenlik' },
          { key: 'legal', label: 'Hukuk & Regülasyon' },
        ].map((d) => (
          <button
            key={d.key}
            onClick={() => setSelectedDept(d.key)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedDept === d.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Highly Compact, Strictly Aligned Person Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                    {member.name}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate mt-0.5">
                  {member.role}
                </p>
                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                  {member.departmentLabel} · {member.location}
                </span>
              </div>
            </div>

            {/* LinkedIn Action Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Doğrulanmış Profil
              </span>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-3 h-3 fill-current" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

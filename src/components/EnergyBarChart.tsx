import React, { useState } from 'react';
import { SunMedium, Sun, Sunset, Moon, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { PeriodUsage } from '../types/energy';

interface EnergyBarChartProps {
  periods?: PeriodUsage[];
  highlightSiang?: boolean;
}

const defaultPeriods: PeriodUsage[] = [
  {
    id: 'pagi',
    label: 'Pagi',
    timeRange: '06:00 - 11:00 WIB',
    usageKwh: 85,
    percentage: 19,
    isPeak: false,
    costEstimate: 122780,
    description: 'Aktivitas persiapan buka toko & mesin cuci putaran pertama.',
  },
  {
    id: 'siang',
    label: 'Siang',
    timeRange: '11:00 - 15:00 WIB',
    usageKwh: 195,
    percentage: 43,
    isPeak: true, // Siang is the highest!
    costEstimate: 281670,
    description: 'Beban tertinggi: Setrika uap boiler beroperasi bersamaan AC & pendingin.',
  },
  {
    id: 'sore',
    label: 'Sore',
    timeRange: '15:00 - 18:00 WIB',
    usageKwh: 110,
    percentage: 24,
    isPeak: false,
    costEstimate: 158890,
    description: 'Penyelesaian pesanan cucian kering dan penerangan toko.',
  },
  {
    id: 'malam',
    label: 'Malam',
    timeRange: '18:00 - 06:00 WIB',
    usageKwh: 60,
    percentage: 13,
    isPeak: false,
    costEstimate: 86660,
    description: 'Lampu keamanan toko & chiller dalam mode siaga (standby).',
  },
];

export const EnergyBarChart: React.FC<EnergyBarChartProps> = ({
  periods = defaultPeriods,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodUsage | null>(null);

  // Maximum value for scaling bar heights (Siang has 195)
  const maxKwh = Math.max(...periods.map((p) => p.usageKwh));

  const getPeriodIcon = (id: string) => {
    switch (id) {
      case 'pagi':
        return <SunMedium className="w-4 h-4 text-amber-500" />;
      case 'siang':
        return <Sun className="w-4 h-4 text-blue-600" />;
      case 'sore':
        return <Sunset className="w-4 h-4 text-orange-500" />;
      case 'malam':
        return <Moon className="w-4 h-4 text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Distribusi Penggunaan Energi Berdasarkan Waktu
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Komparasi konsumsi listrik (kWh) per rentang waktu harian operasional
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
            <span className="w-2 h-2 rounded-xs bg-blue-600 inline-block"></span>
            Siang = Beban Puncak (43%)
          </span>
        </div>
      </div>

      {/* Visual Bar Chart (Responsive Column representation) */}
      <div className="mt-6">
        <div className="h-56 sm:h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 sm:px-6 pb-2 border-b border-slate-200 bg-slate-50/50 rounded-t-lg">
          {periods.map((period) => {
            const heightPercent = Math.round((period.usageKwh / maxKwh) * 100);
            const isSiang = period.id === 'siang';

            return (
              <div
                key={period.id}
                onClick={() => setSelectedPeriod(period)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Value tooltip label above bar */}
                <div className="mb-2 text-center transition-transform group-hover:-translate-y-0.5">
                  <span
                    className={`text-xs sm:text-sm font-bold font-mono-tabular ${
                      isSiang ? 'text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    {period.usageKwh} <span className="text-[10px] sm:text-xs font-normal">kWh</span>
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {period.percentage}%
                  </span>
                </div>

                {/* The vertical bar */}
                <div className="w-full max-w-[56px] bg-slate-200 rounded-t-md overflow-hidden flex items-end h-[160px] relative">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full transition-all duration-500 rounded-t-md relative ${
                      isSiang
                        ? 'bg-blue-600 group-hover:bg-blue-700 shadow-sm'
                        : 'bg-slate-400 group-hover:bg-slate-500'
                    }`}
                  >
                    {isSiang && (
                      <div className="absolute top-1 left-0 right-0 text-center">
                        <span className="hidden sm:inline-block text-[9px] uppercase font-bold text-white bg-blue-800/80 px-1 rounded-xs">
                          Puncak
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* X-axis label */}
                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {getPeriodIcon(period.id)}
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        isSiang ? 'text-blue-700 font-bold' : 'text-slate-800'
                      }`}
                    >
                      {period.label}
                    </span>
                  </div>
                  <span className="hidden sm:block text-[11px] text-slate-400 mt-0.5">
                    {period.timeRange}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend & Breakdown stats below bar chart */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4 pt-2">
          {periods.map((period) => (
            <div
              key={`metric-${period.id}`}
              onClick={() => setSelectedPeriod(period)}
              className={`p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
                period.id === 'siang'
                  ? 'bg-blue-50/50 border-blue-200'
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{period.label}</span>
                {period.isPeak && (
                  <span className="text-[10px] font-bold text-blue-700">Tertinggi</span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1 font-mono-tabular">
                {period.usageKwh} kWh
              </p>
              <p className="text-[11px] text-slate-500 font-mono-tabular">
                Rp {period.costEstimate.toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Period Detail Notice */}
        {selectedPeriod && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-900">
                Detail Waktu {selectedPeriod.label} ({selectedPeriod.timeRange}):
              </span>{' '}
              <span>{selectedPeriod.description}</span>
            </div>
            <button
              onClick={() => setSelectedPeriod(null)}
              className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

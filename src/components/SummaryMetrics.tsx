import React, { useState, useEffect } from 'react';
import { ReceiptText, Zap, Leaf, TrendingDown, ArrowUpRight, Activity } from 'lucide-react';

interface SummaryMetricsProps {
  billEstimate: number; // e.g., 650000
  totalUsageKwh: number; // e.g., 450
  provenSavings: number; // e.g., 70000
  isRecommendationApplied: boolean;
}

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({
  billEstimate,
  totalUsageKwh,
  provenSavings,
  isRecommendationApplied,
}) => {
  // Live wattage fluctuation simulation (around 1.850 Watt)
  const [liveWattage, setLiveWattage] = useState(1850);

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle natural fluctuation between 1.838 and 1.862 Watt
      const delta = Math.floor(Math.random() * 19) - 9;
      setLiveWattage(1850 + delta);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatWatt = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {/* Card 1: Estimasi Tagihan Bulan Ini */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Estimasi Tagihan Bulan Ini
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono-tabular">
                {formatRupiah(billEstimate)}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ReceiptText className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center text-blue-600 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Tarif B-1/1300 VA</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>24 hari berjalan</span>
          </div>
          {isRecommendationApplied && (
            <span className="text-emerald-600 font-medium">Hemat diterapkan</span>
          )}
        </div>
      </div>

      {/* Card 2: Total Penggunaan */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Penggunaan
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono-tabular">
                {totalUsageKwh}
              </span>
              <span className="text-base font-semibold text-slate-600">kWh</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Rata-rata 18,75 kWh / hari</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600">Beban puncak: Siang</span>
          </div>
        </div>
      </div>

      {/* Card 3: Penghematan Terbukti (Previously Potensi Penghematan, e.g. Rp 70.000 + "Lebih dari Fee!") */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-emerald-200 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Penghematan Terbukti
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight font-mono-tabular">
                {formatRupiah(provenSavings)}
              </span>
              <span className="text-xs font-medium text-emerald-700">/ bulan</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Optimalisasi jadwal beban</span>
          </div>
          {/* Small note saying "Lebih dari Fee!" to tie into the guarantee business model */}
          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[11px]">
            Lebih dari Fee!
          </span>
        </div>
      </div>

      {/* Card 4: Daya Real-Time (Dark theme slate-800/900, dummy live wattage e.g. "1.850 Watt", connected via "Sensor Aktif (ESP32 / CT Clamp)" with pulsing green dot) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-md hover:border-slate-700 transition-all duration-200 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Daya Real-Time
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono-tabular">
                {formatWatt(liveWattage)}
              </span>
              <span className="text-base font-semibold text-slate-300">Watt</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {/* Pulsing green indicator dot for live IoT sensor telemetry */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              Sensor Aktif (ESP32 / CT Clamp)
            </span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">Live</span>
        </div>
      </div>
    </div>
  );
};

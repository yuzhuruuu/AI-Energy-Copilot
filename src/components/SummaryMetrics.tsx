import React from 'react';
import { ReceiptText, Zap, Leaf, TrendingDown, ArrowUpRight, Info } from 'lucide-react';

interface SummaryMetricsProps {
  billEstimate: number; // e.g., 650000 or 605000
  totalUsageKwh: number; // e.g., 450
  potentialSavings: number; // e.g., 50000
  isRecommendationApplied: boolean;
}

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({
  billEstimate,
  totalUsageKwh,
  potentialSavings,
  isRecommendationApplied,
}) => {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
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
              <span>Tarif R-1/1300 VA</span>
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

      {/* Card 3: Potensi Penghematan */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-emerald-200 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Potensi Penghematan
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight font-mono-tabular">
                {formatRupiah(potentialSavings)}
              </span>
              <span className="text-xs font-medium text-emerald-700">/ bulan</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Leaf className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Optimalisasi pergeseran jam operasi</span>
          </div>
          <span className="text-slate-400">~7,7% tagihan</span>
        </div>
      </div>
    </div>
  );
};

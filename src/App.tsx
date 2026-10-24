import React, { useState } from 'react';
import { Header } from './components/Header';
import { SummaryMetrics } from './components/SummaryMetrics';
import { MultimodalInput } from './components/MultimodalInput';
import { EnergyBarChart } from './components/EnergyBarChart';
import { ApplianceTable } from './components/ApplianceTable';
import { AiRecommendationBox } from './components/AiRecommendationBox';
import {
  Sparkles,
  Store,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  X,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

export default function App() {
  // Financial & usage state
  const [billEstimate, setBillEstimate] = useState<number>(650000);
  const [totalUsageKwh, setTotalUsageKwh] = useState<number>(450);
  const [potentialSavings, setPotentialSavings] = useState<number>(50000);
  
  // Recommendation state: 'pending' | 'accepted' | 'dismissed'
  const [recStatus, setRecStatus] = useState<'pending' | 'accepted' | 'dismissed'>('pending');
  
  // Analysis processing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisNotice, setLastAnalysisNotice] = useState<string | null>(null);

  // Download Report Modal state
  const [showReportModal, setShowReportModal] = useState(false);

  // Active section for navigation
  const [activeSection, setActiveSection] = useState('ringkasan');

  // Recommendation actions
  const handleAcceptRecommendation = () => {
    setRecStatus('accepted');
    // Deduct Rp 45.000 from current bill estimate
    setBillEstimate(605000);
    setPotentialSavings(5000); // Remaining potential savings
    setLastAnalysisNotice('Rekomendasi disetujui: Jadwal setrika uap digeser ke pagi hari.');
    setTimeout(() => setLastAnalysisNotice(null), 5000);
  };

  const handleDismissRecommendation = () => {
    setRecStatus('dismissed');
    setLastAnalysisNotice('Rekomendasi diabaikan. Anda dapat memulihkannya kapan saja.');
    setTimeout(() => setLastAnalysisNotice(null), 4000);
  };

  const handleResetRecommendation = () => {
    setRecStatus('pending');
    setBillEstimate(650000);
    setPotentialSavings(50000);
  };

  // Multimodal analysis trigger simulation
  const handleProcessAnalysis = (data: { text: string; photoAttached: boolean; audioAttached: boolean }) => {
    setIsAnalyzing(true);
    setLastAnalysisNotice(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setLastAnalysisNotice(
        'Analisis selesai: Data harian berhasil diverifikasi dengan meteran kWh. Pola beban puncak terdeteksi di waktu Siang.'
      );
      // Scroll smoothly to analysis section
      const analysisEl = document.getElementById('analisis-beban');
      if (analysisEl) {
        analysisEl.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setLastAnalysisNotice(null), 6000);
    }, 900);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* 1. Header (Clean header with "AI Energy Copilot" title) */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onDownloadReport={() => setShowReportModal(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Business Profile & Period Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Berkah Laundry & Dry Clean
              </h1>
              <p className="text-xs text-slate-500">
                Tarif B-1 / 1.300 VA · ID Pelanggan: 5210-9821-4402
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Periode Berjalan: Oktober 2026 (Hari ke-24)</span>
          </div>
        </div>

        {/* Live Notification Banner if analysis updated */}
        {lastAnalysisNotice && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start sm:items-center justify-between gap-3 shadow-xs transition-all">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{lastAnalysisNotice}</span>
            </div>
            <button
              onClick={() => setLastAnalysisNotice(null)}
              className="text-blue-500 hover:text-blue-800 text-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 1. Summary Metrics Section */}
        <section id="ringkasan" aria-label="Ringkasan Metrik Energi">
          <SummaryMetrics
            billEstimate={billEstimate}
            totalUsageKwh={totalUsageKwh}
            potentialSavings={potentialSavings}
            isRecommendationApplied={recStatus === 'accepted'}
          />
        </section>

        {/* 2. Multimodal Input Section */}
        <section id="input-data" aria-label="Input Data Harian">
          <MultimodalInput
            onProcessAnalysis={handleProcessAnalysis}
            isAnalyzing={isAnalyzing}
          />
        </section>

        {/* 3. AI Analysis & Recommendation Section */}
        <section
          id="analisis-beban"
          aria-label="Analisis dan Rekomendasi AI"
          className="space-y-6"
        >
          {/* Section Heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Hasil Analisis Beban & Rekomendasi AI
              </h2>
              <p className="text-xs text-slate-500">
                Pemodelan konsumsi listrik berdasarkan jam operasional dan beban per peralatan usaha Anda.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Model Analisis Tarif UMKM</span>
            </div>
          </div>

          {/* AI Recommendation Alert Box (Prominently placed above or alongside analysis) */}
          <AiRecommendationBox
            status={recStatus}
            onAccept={handleAcceptRecommendation}
            onDismiss={handleDismissRecommendation}
            onReset={handleResetRecommendation}
          />

          {/* Grid Layout: Visual Bar Chart & Appliance Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual representation: Energy usage across 4 time periods (Pagi, Siang, Sore, Malam with Siang highest) */}
            <div className="lg:col-span-6 xl:col-span-5 w-full">
              <EnergyBarChart />
            </div>

            {/* Data table: Estimasi Beban Per Alat */}
            <div className="lg:col-span-6 xl:col-span-7 w-full">
              <ApplianceTable />
            </div>
          </div>
        </section>

        {/* Info Card: Tips Efisiensi Bisnis Kecil */}
        <section className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 sm:p-5 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <Lightbulb className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                Tips Efisiensi Energi untuk Bisnis Laundry & Toko
              </p>
              <p className="text-slate-500 mt-0.5">
                Hindari menyalakan setrika uap, mesin pengering, dan pendingin ruangan secara bersamaan saat jam 11:00 - 14:00 untuk menghindari pembatasan daya tripping MCB.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg whitespace-nowrap transition-colors cursor-pointer self-end sm:self-auto"
          >
            Lihat Laporan Lengkap
          </button>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">AI Energy Copilot</span>
            <span aria-hidden="true">·</span>
            <span>Platform Optimasi Energi untuk UMKM Indonesia</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar Tarif Listrik PLN 2026</span>
            <span aria-hidden="true">·</span>
            <span>Data Terenkripsi</span>
          </div>
        </div>
      </footer>

      {/* Report Summary Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Ringkasan Efisiensi Energi Usaha
                  </h3>
                  <p className="text-xs text-slate-500">
                    Periode Oktober 2026 · Berkah Laundry
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Tagihan:</span>
                  <span className="font-bold text-slate-900 font-mono-tabular">
                    Rp {billEstimate.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Penggunaan Listrik:</span>
                  <span className="font-bold text-slate-900 font-mono-tabular">
                    {totalUsageKwh} kWh
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Potensi Hemat Tersedia:</span>
                  <span className="font-bold text-emerald-700 font-mono-tabular">
                    Rp {potentialSavings.toLocaleString('id-ID')} / bulan
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Rekomendasi Setrika:</span>
                  <span className="font-semibold text-slate-800">
                    {recStatus === 'accepted' ? '✓ Diterapkan ke jadwal pagi' : 'Belum diterapkan'}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed">
                Laporan ini merangkum pembagian beban 4 waktu (Pagi, Siang, Sore, Malam) dan pemakaian 4 alat utama operasional toko Anda.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

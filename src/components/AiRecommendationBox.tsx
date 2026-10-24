import React from 'react';
import { Lightbulb, Check, X, Undo2, ArrowRight, Sparkles } from 'lucide-react';

interface AiRecommendationBoxProps {
  status: 'pending' | 'accepted' | 'dismissed';
  onAccept: () => void;
  onDismiss: () => void;
  onReset: () => void;
}

export const AiRecommendationBox: React.FC<AiRecommendationBoxProps> = ({
  status,
  onAccept,
  onDismiss,
  onReset,
}) => {
  return (
    <div
      id="rekomendasi-ai"
      className="bg-white rounded-xl border border-emerald-200 p-5 sm:p-6 shadow-xs relative overflow-hidden"
    >
      {/* Pending State (Default) */}
      {status === 'pending' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  AI Recommendation
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">Analisis Beban Puncak</span>
              </div>

              {/* Exact required sentence */}
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Saran: Geser penggunaan setrika uap ke pagi hari. Potensi hemat: Rp 45.000/bulan.
              </p>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pemindahan beban daya 1200 Watt dari rentang siang (11:00 - 15:00) ke pagi hari (07:30 - 10:00) mencegah penumpukan beban bersamaan dengan mesin pendingin & AC, serta menghindari tarif penalti lonjakan daya semu.
              </p>
            </div>
          </div>

          {/* Action buttons inside the recommendation box */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 sm:pt-1">
            <button
              type="button"
              onClick={onDismiss}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Abaikan
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Check className="w-4 h-4" />
              <span>Setujui & Terapkan</span>
            </button>
          </div>
        </div>
      )}

      {/* Accepted State */}
      {status === 'accepted' && (
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Rekomendasi Berhasil Diterapkan ke Jadwal Operasional
                </p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Penggunaan setrika uap kini dijadwalkan pada pagi hari (07:30 - 10:30 WIB). Estimasi tagihan telah diperbarui dengan penghematan Rp 45.000/bulan.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 hover:underline cursor-pointer shrink-0"
              title="Kembalikan status"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Urungkan</span>
            </button>
          </div>
        </div>
      )}

      {/* Dismissed State */}
      {status === 'dismissed' && (
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Rekomendasi efisiensi setrika uap telah diabaikan.</span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Tampilkan Kembali
          </button>
        </div>
      )}
    </div>
  );
};

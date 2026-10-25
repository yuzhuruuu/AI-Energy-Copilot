import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, CreditCard, Sparkles, X, QrCode } from 'lucide-react';

interface CommitmentFeeBannerProps {
  onOpenPaymentModal?: () => void;
}

export const CommitmentFeeBanner: React.FC<CommitmentFeeBannerProps> = ({
  onOpenPaymentModal,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'va'>('qris');

  const handlePayClick = () => {
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      setShowModal(true);
    }
  };

  const handleSimulatePayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1800);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-5 sm:p-6 shadow-md border border-indigo-700/40">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                Model Bisnis Berbasis Hasil
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Garansi 100% Penghematan
              </span>
            </div>

            {/* Required Title */}
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Uji Coba Skema Commitment Fee (Garansi 100%)
            </h2>

            {/* Required Descriptive Text */}
            <p className="text-sm text-indigo-100 leading-relaxed">
              Biaya AI bulan ini: Rp 20.000. Karena penghematan Anda (Rp 70.000) melebihi fee, garansi terpenuhi.
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1 text-xs text-indigo-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>Penghematan Bersih: <strong className="text-emerald-300 font-mono">+Rp 50.000</strong></span>
              </div>
              <span className="text-indigo-400">|</span>
              <span>Jika hemat &lt; Rp 20.000, biaya 100% gratis</span>
            </div>
          </div>

          {/* Call to action button */}
          <div className="shrink-0 flex items-center gap-3">
            {isPaid ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fee Bulan Ini Telah Dibayar</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePayClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-indigo-950 bg-white hover:bg-indigo-50 active:bg-indigo-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>Bayar Fee Bulan Ini</span>
                <ArrowRight className="w-4 h-4 text-indigo-700" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Willingness-to-Pay Testing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Konfirmasi Commitment Fee AI
                  </h3>
                  <p className="text-xs text-slate-500">Uji Coba Validasi Minat Bayar (WTP)</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isPaid ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Pembayaran Sukses Diverifikasi!</h4>
                <p className="text-xs text-slate-500">
                  Terima kasih atas partisipasi Anda dalam uji coba model commitment fee bergaransi.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 bg-indigo-50/70 rounded-lg border border-indigo-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Biaya Layanan AI:</span>
                    <span className="font-bold text-slate-900 font-mono">Rp 20.000</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Realisasi Penghematan Usaha:</span>
                    <span className="font-bold text-emerald-700 font-mono">Rp 70.000</span>
                  </div>
                  <div className="pt-2 border-t border-indigo-200/60 flex justify-between items-center font-bold">
                    <span className="text-indigo-950">Keuntungan Bersih Toko:</span>
                    <span className="text-emerald-700 font-mono text-sm">+Rp 50.000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Pilih Metode Simulasi Pembayaran:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('qris')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        selectedMethod === 'qris'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                        <span>QRIS Instan</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal">GoPay, OVO, BCA, Mandiri</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('va')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                        selectedMethod === 'va'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Virtual Account</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal">BCA / BRI / BNI</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Konfirmasi Bayar Rp 20.000
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

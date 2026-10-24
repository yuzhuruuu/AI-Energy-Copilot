import React, { useState, useRef } from 'react';
import {
  Upload,
  Mic,
  MicOff,
  Sparkles,
  FileCheck,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface MultimodalInputProps {
  onProcessAnalysis: (inputData: { text: string; photoAttached: boolean; audioAttached: boolean }) => void;
  isAnalyzing: boolean;
}

export const MultimodalInput: React.FC<MultimodalInputProps> = ({
  onProcessAnalysis,
  isAnalyzing,
}) => {
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; previewUrl?: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  // Sample voice transcripts in Indonesian
  const sampleVoiceTranscripts = [
    'Hari ini operasional toko mulai pukul 08:30. Mesin cuci beroperasi 4 jam pagi-siang, dan setrika uap dinyalakan 3 jam saat siang hari.',
    'Chiller pendingin minuman dinyalakan penuh seharian. Kulkas display dan lampu toko 400 watt menyala sejak jam 09:00.',
    'Penggunaan setrika uap listrik jam 13:00 selama 3 jam, oven listrik dipakai 2 jam saat pesanan ramai di sore hari.',
  ];

  // Toggle voice recording simulation
  const handleToggleRecord = () => {
    if (isRecording) {
      // Stop recording
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingSeconds(0);
      
      // Auto-insert a transcript sample if text is empty or append
      const randomTranscript = sampleVoiceTranscripts[Math.floor(Math.random() * sampleVoiceTranscripts.length)];
      setInputText((prev) => (prev ? `${prev}\n\n[Transkripsi Suara]: ${randomTranscript}` : randomTranscript));
      setStatusMessage('Suara berhasil direkam dan ditranskripsikan ke teks.');
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingSeconds(1);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Handle file upload from disk or sample picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        previewUrl: url,
      });
      setStatusMessage(`Foto "${file.name}" berhasil dilampirkan.`);
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleSelectSamplePhoto = (sampleName: string, ocrHint: string) => {
    setUploadedFile({
      name: sampleName,
      size: '340 KB',
      previewUrl: undefined,
    });
    setShowPhotoModal(false);
    setInputText((prev) =>
      prev ? `${prev}\n\n[OCR Meteran]: ${ocrHint}` : `[Hasil OCR Foto ${sampleName}]: ${ocrHint}`
    );
    setStatusMessage(`Contoh ${sampleName} dipilih dengan deteksi otomatis.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleRemovePhoto = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProcessAnalysis({
      text: inputText,
      photoAttached: !!uploadedFile,
      audioAttached: isRecording || inputText.includes('[Transkripsi Suara]'),
    });
  };

  return (
    <div id="input-data" className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Input Data Harian
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unggah foto kWh meter, rekam suara aktivitas toko, atau ketik catatan operasional harian.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 self-start sm:self-auto">
          <span>Multimodal AI Input</span>
          <span aria-hidden="true">·</span>
          <span>Vision & Audio</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Two large prominent buttons side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Button 1: Unggah Foto Meteran/Alat */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              className="w-full h-24 p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/40 text-slate-700 transition-all duration-200 flex flex-col items-center justify-center gap-1.5 text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                Unggah Foto Meteran/Alat
              </span>
              <span className="text-xs text-slate-500">
                Format JPG/PNG foto kWh meter atau label daya alat
              </span>
            </button>
            <div className="flex items-center justify-between mt-1 px-1">
              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="text-[11px] text-blue-600 hover:underline cursor-pointer"
              >
                Gunakan contoh foto meteran
              </button>
              {uploadedFile && (
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Foto Terlampir
                </span>
              )}
            </div>
          </div>

          {/* Button 2: Rekam Suara Aktivitas */}
          <div>
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`w-full h-24 p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1.5 text-center group cursor-pointer ${
                isRecording
                  ? 'border-red-400 bg-red-50/70 text-red-700 shadow-inner animate-pulse'
                  : 'border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/40 text-slate-700'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-slate-200 text-emerald-600'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </div>
              <span
                className={`text-sm font-semibold ${
                  isRecording ? 'text-red-700' : 'text-slate-900 group-hover:text-emerald-700'
                }`}
              >
                {isRecording ? `Sedang Merekam (00:0${recordingSeconds})` : 'Rekam Suara Aktivitas'}
              </span>
              <span className="text-xs text-slate-500">
                {isRecording ? 'Klik untuk berhenti & transkrip otomatis' : 'Ceritakan alat yang menyala hari ini'}
              </span>
            </button>
            <div className="flex items-center justify-between mt-1 px-1">
              <span className="text-[11px] text-slate-400">
                Mikrofon & konversi suara bahasa Indonesia
              </span>
              {isRecording && (
                <span className="text-[11px] text-red-600 font-semibold animate-pulse">
                  ● Merekam Suara...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Uploaded File Preview Badge (if any) */}
        {uploadedFile && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">{uploadedFile.name}</p>
                <p className="text-[11px] text-slate-500">{uploadedFile.size} · Siap diekstrak AI</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
              title="Hapus lampiran"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Text Area */}
        <div>
          <label htmlFor="daily-activity-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Catatan Aktivitas Operasional
          </label>
          <div className="relative">
            <textarea
              id="daily-activity-input"
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Atau ketik aktivitas hari ini..."
              className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors resize-y min-h-[88px]"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Saran cepat:</span>
              <button
                type="button"
                onClick={() =>
                  setInputText('Operasional mesin cuci 4 jam pagi hari, setrika uap listrik 3 jam pada jam 12:00 - 15:00.')
                }
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Laundry kiloan
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() =>
                  setInputText('Chiller pendingin minuman 24 jam, mesin espresso aktif 6 jam, kipas angin dan lampu toko 10 jam.')
                }
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Kafe & Kedai
              </button>
            </div>
            <span>{inputText.length} karakter</span>
          </div>
        </div>

        {/* Status Toast / Alert message */}
        {statusMessage && (
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Primary Action Button: "Proses Analisis" */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses Data & Estimasi Beban...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Proses Analisis</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Modal for Sample Photos */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Pilih Contoh Foto Meteran Listrik</h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Pilih sampel foto meteran atau peralatan untuk menguji ekstraksi data otomatis:
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  handleSelectSamplePhoto('Meteran_PLN_Digital_Toko.jpg', 'Meteran kWh tercatat: 04512.4 kWh (Stand meter bulan berjalan)')
                }
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Meteran_PLN_Digital_Toko.jpg</p>
                  <p className="text-[11px] text-slate-500">Angka terdeteksi: 04512.4 kWh · Akurasi 98%</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSelectSamplePhoto('Label_Daya_Setrika_Uap.jpg', 'Spesifikasi alat: Setrika Uap Listrik Boiler 1200 Watt 220V')
                }
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Label_Daya_Setrika_Uap.jpg</p>
                  <p className="text-[11px] text-slate-500">Spesifikasi daya: 1200 Watt teridentifikasi</p>
                </div>
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

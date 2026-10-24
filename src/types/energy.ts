export interface SummaryMetric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  subtitle: string;
  changeDescription: string;
  isPositiveForCost?: boolean;
}

export interface PeriodUsage {
  id: 'pagi' | 'siang' | 'sore' | 'malam';
  label: string;
  timeRange: string;
  usageKwh: number;
  percentage: number;
  isPeak: boolean;
  costEstimate: number;
  description: string;
}

export interface ApplianceUsageItem {
  id: string;
  namaAlat: string;
  kategori: string;
  dayaWatt: number;
  durasi: string;
  durasiJam: number;
  estimasiBiayaRp: number;
  persentaseTotal: number;
  statusPenggunaan: 'Optimal' | 'Puncak Beban' | 'Perlu Perhatian';
}

export interface DailyActivityLog {
  photoAttached: boolean;
  photoName?: string;
  audioAttached: boolean;
  audioDuration?: string;
  noteText: string;
  lastUpdated: string;
}

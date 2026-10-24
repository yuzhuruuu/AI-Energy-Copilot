import React, { useState } from 'react';
import { ApplianceUsageItem } from '../types/energy';
import { ArrowUpDown, HelpCircle } from 'lucide-react';

interface ApplianceTableProps {
  appliances?: ApplianceUsageItem[];
}

const defaultAppliances: ApplianceUsageItem[] = [
  {
    id: 'app-1',
    namaAlat: 'Setrika Uap',
    kategori: 'Peralatan Finishing / Boiler',
    dayaWatt: 1200,
    durasi: '3.5 Jam / hari',
    durasiJam: 3.5,
    estimasiBiayaRp: 215000,
    persentaseTotal: 33,
    statusPenggunaan: 'Puncak Beban',
  },
  {
    id: 'app-2',
    namaAlat: 'Mesin Cuci',
    kategori: 'Pencucian Komersial (2 Unit)',
    dayaWatt: 850,
    durasi: '4 Jam / hari',
    durasiJam: 4.0,
    estimasiBiayaRp: 185000,
    persentaseTotal: 28,
    statusPenggunaan: 'Optimal',
  },
  {
    id: 'app-3',
    namaAlat: 'Chiller Minuman',
    kategori: 'Pendingin Display Toko',
    dayaWatt: 220,
    durasi: '24 Jam / hari',
    durasiJam: 24.0,
    estimasiBiayaRp: 155000,
    persentaseTotal: 24,
    statusPenggunaan: 'Optimal',
  },
  {
    id: 'app-4',
    namaAlat: 'Lampu & Pendingin Toko',
    kategori: 'Penerangan & Sirkulasi Udara',
    dayaWatt: 280,
    durasi: '11 Jam / hari',
    durasiJam: 11.0,
    estimasiBiayaRp: 95000,
    persentaseTotal: 15,
    statusPenggunaan: 'Optimal',
  },
];

export const ApplianceTable: React.FC<ApplianceTableProps> = ({
  appliances = defaultAppliances,
}) => {
  const [sortField, setSortField] = useState<'namaAlat' | 'durasiJam' | 'estimasiBiayaRp'>('estimasiBiayaRp');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedAppliances = [...appliances].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortAsc
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const totalBiaya = appliances.reduce((sum, item) => sum + item.estimasiBiayaRp, 0);

  const handleSort = (field: 'namaAlat' | 'durasiJam' | 'estimasiBiayaRp') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Estimasi Beban Per Alat
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rincian perkiraan biaya listrik bulanan berdasarkan durasi dan spesifikasi daya alat operasional.
          </p>
        </div>
        <div className="text-xs text-slate-500 self-start sm:self-auto">
          <span>{appliances.length} Alat Terdata</span>
          <span aria-hidden="true" className="mx-1">·</span>
          <span>Tarif Rp 1.444,70 / kWh</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 bg-slate-50/70">
              <th scope="col" className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort('namaAlat')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span>Nama Alat</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort('durasiJam')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span>Durasi</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('estimasiBiayaRp')}
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors ml-auto cursor-pointer"
                >
                  <span>Estimasi Biaya (Rp)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedAppliances.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/60 transition-colors"
              >
                {/* Column 1: Nama Alat */}
                <td className="py-3.5 px-4 font-medium text-slate-900">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.namaAlat}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      {item.kategori} · {item.dayaWatt} Watt
                    </span>
                  </div>
                </td>

                {/* Column 2: Durasi */}
                <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                  <span>{item.durasi}</span>
                </td>

                {/* Column 3: Estimasi Biaya (Rp) */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <span className="font-bold text-slate-900 font-mono-tabular">
                    {formatRupiah(item.estimasiBiayaRp)}
                  </span>
                  <span className="block text-[11px] text-slate-400 font-normal">
                    {item.persentaseTotal}% dari total beban
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-200 bg-slate-50/90 font-semibold text-slate-900 text-sm">
              <td className="py-3 px-4">
                <span>Total Estimasi Beban Terhitung</span>
              </td>
              <td className="py-3 px-4 text-xs text-slate-500 font-normal">
                Termasuk PPN & PPJ
              </td>
              <td className="py-3 px-4 text-right font-bold text-blue-700 font-mono-tabular">
                {formatRupiah(totalBiaya)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

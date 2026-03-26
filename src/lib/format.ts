export const formatMNTCompact = (value?: number | null) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    const amount = Math.round((value / 1_000_000_000) * 10) / 10;
    return `₮${amount} тэрбум`;
  }
  if (abs >= 1_000_000) {
    const amount = Math.round((value / 1_000_000) * 10) / 10;
    return `₮${amount} сая`;
  }
  return `₮${Number(value).toLocaleString()}`;
};

export const formatNumberWithCommas = (value: string) => {
  if (!value) return '';
  const cleaned = value.replace(/[^\d.]/g, '');
  if (!cleaned) return '';
  const parts = cleaned.split('.');
  const intPart = parts[0] ? Number(parts[0]).toLocaleString() : '';
  const fracPart = parts[1] ? parts[1].slice(0, 2) : '';
  return fracPart ? `${intPart}.${fracPart}` : intPart;
};

export const parseNumber = (value: string) => {
  const cleaned = value.replace(/[^\d.]/g, '');
  if (!cleaned) return null;
  const normalized = cleaned.split('.').slice(0, 2).join('.');
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? null : parsed;
};

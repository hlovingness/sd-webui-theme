import { Converter } from '@/scripts/formatPrompt';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;
  const data = info.split('<br>').filter(Boolean);
  const config = data[2] || data[1];
  if (!config.includes(',')) return;
  const clearConfigs = config
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const configs: any = {};

  for (const item of clearConfigs) {
    const items = item.split(':');
    configs[items[0].trim()] = items[1].trim();
  }

  return {
    config: configs,
    negative: formatPrompt(data[2] ? decodeURI(data[1]).split('Negative prompt: ')[1] : ''),
    positive: formatPrompt(decodeURI(data[0])),
  };
};

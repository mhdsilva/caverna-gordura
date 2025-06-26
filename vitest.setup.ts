import { vi } from 'vitest';
import { useTranslation } from './src/__mocks__/i18n';

vi.mock('react-i18next', () => ({
  useTranslation,
})); 
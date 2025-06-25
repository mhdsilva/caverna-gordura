import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdminProvider, useAdmin } from '../context/AdminContext';

describe('AdminContext', () => {
  it('provides admin context', () => {
    let value: ReturnType<typeof useAdmin> | undefined;
    function TestComponent() {
      value = useAdmin();
      return null;
    }
    render(
      <AdminProvider>
        <TestComponent />
      </AdminProvider>
    );
    expect(value).toBeDefined();
    expect(Array.isArray(value?.produtos)).toBe(true);
    expect(typeof value?.alternarDisponibilidade).toBe('function');
    expect(typeof value?.adicionarAvaliacao).toBe('function');
  });
});

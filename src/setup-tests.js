import '@testing-library/jest-dom';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

// Add the custom matchers
expect.extend(matchers);

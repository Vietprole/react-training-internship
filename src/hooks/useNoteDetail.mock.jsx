import { fn } from '@storybook/test';
import * as actual from './useNoteDetail';

export * from './useNoteDetail';
const useNoteDetail = fn(actual.useNoteDetail).mockName('useNoteDetail');
export default useNoteDetail;

import { sxMarginCentering } from '../sxStyles';

export const sxColumnGap = { columnGap: 2 };

export const sxRowGap = { rowGap: 1 };

export const sxWidth90 = { width: '90%' };

export const sxPagination = {
  width: '100%',
  justifyContent: 'center',
  display: 'flex'
};

export const sxPostContainer = {
  ...sxColumnGap,
  ...sxRowGap,
  ...sxMarginCentering,
  ...sxWidth90,
  justifyContent: 'start',
  paddingY: '20px'
};

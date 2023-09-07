import { sxMarginCentering } from '../sxStyles';

export const sxMaxWidth = { maxWidth: 345 };

export const sxPositionRelative = { position: 'relative' };

export const sxTop10 = { top: 10 };

export const sxPositionAbsolute = { position: 'absolute' };

export const sxData = {
  ...sxPositionAbsolute,
  left: '10%',
  ...sxTop10,
  width: '50%'
};

export const sxAuthor = {
  ...sxPositionAbsolute,
  right: '10%',
  ...sxTop10,
  width: '30%'
};

export const sxTextAlignCenter = { textAlign: 'center' };

export const sxCard = {
  ...sxMaxWidth,
  ...sxPositionRelative,
  ...sxMarginCentering,
  ...{ mt: 2 }
};

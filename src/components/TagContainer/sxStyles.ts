import { sxJustifyItemsCenter } from '../sxStyles';

export const sxSpacing = { spacing: 1 };

export const sxAlignItemsCenter = { alignItems: 'center' };

export const sxMargin = { margin: '0 auto 20px' };

export const sxPadding = { padding: 1 };

export const sxWidth = { width: '100%' };

export const sxTagContainer = {
  ...sxSpacing,
  ...sxJustifyItemsCenter,
  ...sxAlignItemsCenter,
  ...sxMargin,
  ...sxPadding,
  ...sxWidth
};

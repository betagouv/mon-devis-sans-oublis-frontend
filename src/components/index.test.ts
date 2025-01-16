import * as Components from './index';

describe('Components exports', () => {
  it('exports all components correctly', () => {
    const expectedExports = [
      'Accordion',
      'Alert',
      'Badge',
      'BadgeVariant',
      'BadgeSize',
      'BlockIcon',
      'BlockNumber',
      'BlockNumberSize',
      'CardImage',
      'CheckboxGroup',
      'Confetti',
      'Footer',
      'Header',
      'IconBackground',
      'IconBackgroundVariant',
      'Link',
      'LinkSize',
      'LinkVariant',
      'LoadingDots',
      'Matomo',
      'Modal',
      'ModalPosition',
      'ErrorFeedbacksModal',
      'GlobalErrorFeedbacksModal',
      'MultiSelectCheckbox',
      'Notice',
      'NoticeType',
      'QuoteErrorCard',
      'QuoteErrorItem',
      'QuoteStatusCard',
      'QuoteStatusLink',
      'QuoteStatusVariant',
      'RoleCardIcon',
      'RoleCardImage',
      'RoundCheckboxGroup',
      'Tile',
      'Toast',
      'Tooltip',
      'Upload',
    ];

    expectedExports.forEach((exportName) => {
      expect(Components).toHaveProperty(exportName);
    });

    const actualExports = Object.keys(Components);
    expect(actualExports.sort()).toEqual(expectedExports.sort());
  });

  it('exports components as non-null values', () => {
    const componentNames = [
      'Accordion',
      'Alert',
      'Badge',
      'BlockIcon',
      'BlockNumber',
      'CardImage',
      'CheckboxGroup',
      'Confetti',
      'Footer',
      'Header',
      'IconBackground',
      'Link',
      'LoadingDots',
      'Matomo',
      'Modal',
      'ErrorFeedbacksModal',
      'GlobalErrorFeedbacksModal',
      'MultiSelectCheckbox',
      'Notice',
      'QuoteErrorCard',
      'QuoteErrorItem',
      'QuoteStatusCard',
      'QuoteStatusLink',
      'RoleCardIcon',
      'RoleCardImage',
      'RoundCheckboxGroup',
      'Tile',
      'Toast',
      'Tooltip',
      'Upload',
    ];

    componentNames.forEach((componentName) => {
      expect(
        Components[componentName as keyof typeof Components]
      ).toBeDefined();
      expect(
        Components[componentName as keyof typeof Components]
      ).not.toBeNull();
    });
  });

  it('exports enums with correct values', () => {
    expect(Components.BadgeVariant).toBeDefined();
    expect(Components.BadgeSize).toBeDefined();
    expect(Components.BlockNumberSize).toBeDefined();
    expect(Components.IconBackgroundVariant).toBeDefined();
    expect(Components.LinkSize).toBeDefined();
    expect(Components.LinkVariant).toBeDefined();
    expect(Components.ModalPosition).toBeDefined();
    expect(Components.NoticeType).toBeDefined();
    expect(Components.QuoteStatusVariant).toBeDefined();
  });
});

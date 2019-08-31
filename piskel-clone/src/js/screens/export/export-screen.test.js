import exportScreen from './export-screen';

describe('exportScreen.removeExportFormatActiveState', () => {
  it('Should remove export format active state', () => {
    document.body.innerHTML = '<div class="export-format-list__item export-format-list__item_active"></div>';

    const numberOfActiveFormats = document.querySelectorAll('.export-format-list__item_active').length;

    exportScreen.removeExportFormatActiveState();

    const numberOfActiveFormatsAfter = document.querySelectorAll('.numberOfActiveFormats').length;

    expect(numberOfActiveFormatsAfter).toEqual(numberOfActiveFormats - 1);
  });
});

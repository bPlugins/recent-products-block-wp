import { escapeHTML } from '../../../../bpl-tools/utils/functions';

const Style = ({ attributes, id }) => {
  const css = `
    /* your dynamic css here */
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: escapeHTML(css),
      }}
    />
  );
};

export default Style;

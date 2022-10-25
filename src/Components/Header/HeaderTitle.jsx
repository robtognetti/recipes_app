import PropTypes from 'prop-types';

function HeaderTittle({ route }) {
  let title = '';
  const splicedText = String(route).substring(1).split('-');

  if (splicedText.length > 1) {
    for (let i = 0; i < splicedText.length; i += 1) {
      splicedText[i] = splicedText[i].charAt(0).toUpperCase() + splicedText[i].slice(1);
    }
    title = splicedText.join(' ');
  } else {
    const [pathName] = splicedText;
    title = pathName.charAt(0).toUpperCase() + pathName.slice(1);
  }

  return <h1 data-testid="page-title">{title}</h1>;
}

HeaderTittle.propTypes = {
  route: PropTypes.string.isRequired,
};

export default HeaderTittle;

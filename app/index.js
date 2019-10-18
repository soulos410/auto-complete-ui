import AutoCompleteUi from './auto-complete-ui';
import './styles.scss';

const autocomplete = new AutoCompleteUi();

autocomplete.initUi();
autocomplete.handleInput();
autocomplete.handleContainerScroll();

require('source-map-support').install();
import 'reflect-metadata';
import {_healthcheck} from './healthcheck';
import {searchIndex} from './search-elastic-search-index';
import {putIndex} from './put-elastic-search-index';
import {deleteIndex} from './delete-elastic-search-index';
import {autoSuggest} from './Auto-complete/autoSuggest';
import {searchWordsCorrection} from './Auto-complete/autoCorrect';
import {formBasedSearch} from './Auto-complete/formBased_DynamicApi';

exports._healthcheck = _healthcheck;
exports.searchIndex = searchIndex;
exports.putIndex = putIndex;
exports.deleteIndex = deleteIndex;
exports.autoSuggest = autoSuggest;
exports.searchWordsCorrection = searchWordsCorrection;
exports.formBasedSearch = formBasedSearch;

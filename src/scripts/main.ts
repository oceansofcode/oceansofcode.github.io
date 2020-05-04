import init from './init/init.js';
import showBody from './init/show-body.js';

onload = () => init().then(showBody);
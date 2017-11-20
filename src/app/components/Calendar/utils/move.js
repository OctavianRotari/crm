import invariant from 'invariant';
import { navigate } from './constants';

export default function moveDate(View, { action, date, ...props }) {
    switch (action) {
    case navigate.TODAY:
        date = new Date();
        break;
    case navigate.DATE:
        break;
    default:
        invariant(View && typeof View.navigate === 'function',
            'Calendar View components must implement a static `.navigate(date, action)` method.s');
        date = View.navigate(date, action, props);
    }
    return date;
}

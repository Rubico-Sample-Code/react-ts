import { tagType } from '../../types/tags';
import { moveDataToIndex } from '../../helpers/arrayHelpers';
const DEFAULT = [];

const tags = (state: tagType[] = DEFAULT, action) => {
  switch (action.type) {
    case 'LOAD_APPLIED_TAGS':
      return [...action.appliedTagData];

    case 'LOAD_TAGS':
      return [...action.tags];

    // add a new tag to the list on top
    // as the list is sorted by the most recently used tag
    case 'ADD_NEW_TAG':
      return [action.tag, ...state];
    case 'MOVE_TAGS':
      return moveDataToIndex(
        0,
        state,
        action.payload,
        (d1, d2) => +d1.id === +d2
      );
    default:
      return state;
  }
};

export default tags;

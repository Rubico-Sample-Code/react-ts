import { tagType } from '../../types/tags';

export const loadTags = (tags: tagType[]) => {
  return {
    type: 'LOAD_TAGS',
    tags,
  };
};

export const moveTags = (idList: string[] | number[]) => {
  return {
    type: 'MOVE_TAGS',
    payload: idList
  }
}

export const addNewTag = (tag: tagType) => {
  return {
    type: 'ADD_NEW_TAG',
    tag
  }
}
export type ReactionStoreType = Set<number>

export interface ReactionDataType {
  id: number;
  is_reacted: boolean;
}

export interface ReactionActionType {
  type: 'UPDATE_SCRAP_LIKES' | 'UPDATE_SCRAP_DISLIKES';
  payload: ReactionDataType[];
}
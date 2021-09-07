// wrapper around mongodb.UpdateResult to prevent hard dependencies in abstraction level
export type WriteOperationResult = {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
};

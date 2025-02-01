import { Id } from "../../convex/_generated/dataModel";

export type List = {
  _id: Id<"lists">;
  name: string;
  _creationTime: number;
  creatorId: string;
};

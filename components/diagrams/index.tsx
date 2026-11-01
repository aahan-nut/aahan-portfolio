import type { DiagramId, Milestone } from "@/content/types";
import { AnnotatedHand } from "./AnnotatedHand";
import { KartSchematic } from "./KartSchematic";

export function Diagram({ id, index, milestones = [] }: { id: DiagramId; index?: string; milestones?: Milestone[] }) {
  switch (id) {
    case "hand-landmarks":
      return <AnnotatedHand index={index} />;
    case "tandem-kart":
      return <KartSchematic milestones={milestones} index={index} />;
  }
}

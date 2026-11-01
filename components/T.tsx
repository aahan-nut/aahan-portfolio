import { isTodo, type Text } from "@/content/types";

/** Renders copy, or a visible MISSING marker for unsupplied content. */
export function T({ children, as: Tag = "span" }: { children: Text; as?: "span" | "p" }) {
  if (isTodo(children)) {
    return (
      <Tag className="missing" data-missing>
        <span className="missing__tag">Missing</span> {children.todo}
      </Tag>
    );
  }
  return <Tag>{children}</Tag>;
}

export function Paras({ items }: { items: Text[] }) {
  return (
    <>
      {items.map((t, i) => (
        <T key={i} as="p">
          {t}
        </T>
      ))}
    </>
  );
}

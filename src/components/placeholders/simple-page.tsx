/**
 * Shared placeholder layout
 * -------------------------
 * Handles: title + lead + optional body for routes that are not built yet
 *          (gallery, guides, account, privacy, terms).
 *
 * Does not handle: the unique copy — each page passes its own translation
 * namespace into this component.
 */

export function SimplePage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{lead}</p>
      {children ? (
        <div className="mt-8 space-y-6 text-muted-foreground">{children}</div>
      ) : null}
    </div>
  );
}

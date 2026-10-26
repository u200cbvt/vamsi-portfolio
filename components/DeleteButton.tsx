"use client";
export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm("Delete this project permanently? This cannot be undone.")) e.preventDefault(); }}>
      <button className="rounded border border-red-400/60 px-4 py-2 text-red-300">Delete project</button>
    </form>
  );
}

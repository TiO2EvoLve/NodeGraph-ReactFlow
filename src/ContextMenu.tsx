
import { useEffect, useRef, useState, useCallback } from 'react';

type Item = { type: string; label: string };
type Category = { label: string; items: Item[] };

type Props = {
  isOpen: boolean;
  clientPos?: { x: number; y: number };
  categories?: Category[];
  onSelect: (type: string) => void;
  onClose: () => void;
};

export default function ContextMenu({
  isOpen,
  clientPos = { x: 0, y: 0 },
  categories = [],
  onSelect,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(() =>
    categories.reduce<Record<string, boolean>>((acc, c) => {
      acc[c.label] = true; // default expanded
      return acc;
    }, {}),
  );

  // keep openCats in sync when categories change (preserve existing open state when possible)
  useEffect(() => {
    setOpenCats((prev) => {
      const next: Record<string, boolean> = {};
      categories.forEach((c) => {
        next[c.label] = prev.hasOwnProperty(c.label) ? prev[c.label] : true;
      });
      return next;
    });
  }, [categories]);

  useEffect(() => {
    if (!isOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!ref.current) return;
      if (!target) return;
      if (!ref.current.contains(target)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const toggleCategory = useCallback((label: string) => {
    setOpenCats((s) => ({ ...s, [label]: !s[label] }));
  }, []);

  const handleSelect = useCallback(
    (type: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      onSelect(type);
    },
    [onSelect],
  );

  if (!isOpen) return null;

  // compact size & clamp
  const menuWidth = 200;
  const menuMaxHeight = 260;
  let left = clientPos.x;
  let top = clientPos.y;
  if (left + menuWidth > window.innerWidth) left = Math.max(6, window.innerWidth - menuWidth - 6);
  if (top + menuMaxHeight > window.innerHeight) top = Math.max(6, window.innerHeight - menuMaxHeight - 6);

  const styles = {
    container: {
      position: 'fixed' as const,
      left,
      top,
      width: menuWidth,
      maxHeight: menuMaxHeight,
      overflow: 'auto' as const,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      padding: 6,
      zIndex: 9999,
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      fontSize: 12,
      color: '#222',
    },
    catHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 8px',
      cursor: 'pointer',
      borderRadius: 4,
      userSelect: 'none' as const,
      gap: 8,
    },
    catLabel: {
      fontSize: 12,
      color: '#444',
      fontWeight: 600,
    },
    item: {
      padding: '6px 10px',
      textAlign: 'left' as const,
      background: 'transparent',
      border: 'none',
      width: '100%',
      cursor: 'pointer',
      color: '#111',
      fontSize: 12,
      borderRadius: 4,
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 4,
      paddingLeft: 8,
      paddingRight: 4,
      marginBottom: 6,
    },
    divider: {
      height: 1,
      background: '#eee',
      margin: '6px 0',
    },
    collapseIcon: {
      transition: 'transform 0.15s ease',
      fontSize: 11,
      color: '#666',
    },
  };

  return (
    <div
      ref={ref}
      style={styles.container}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      role="menu"
      aria-hidden={!isOpen}
    >
      {categories.map((cat, idx) => {
        const open = !!openCats[cat.label];
        return (
          <div key={cat.label + idx} style={{ marginBottom: 6 }}>
            <div
              style={{
                ...styles.catHeader,
                background: open ? 'rgba(0,0,0,0.02)' : 'transparent',
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleCategory(cat.label);
              }}
              role="button"
              aria-expanded={open}
            >
              <div style={styles.catLabel}>{cat.label}</div>
              <div
                style={{
                  ...styles.collapseIcon,
                  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                ▶
              </div>
            </div>

            {open && (
              <div style={styles.itemGroup}>
                {cat.items.map((it) => (
                  <button
                    key={it.type}
                    onClick={(e) => handleSelect(it.type, e)}
                    style={styles.item}
                    title={it.label}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            )}

            {idx < categories.length - 1 && <div style={styles.divider} />}
          </div>
        );
      })}
    </div>
  );
}
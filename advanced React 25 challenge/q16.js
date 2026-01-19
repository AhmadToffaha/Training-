import React, { useEffect, useMemo, useRef, useState } from "react";

export function useDropdown(items) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const select = (i) => {
    setSelectedIndex(i);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((v) => Math.min(items.length - 1, v + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((v) => Math.max(0, v - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      select(activeIndex);
    }
  };

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const selected = selectedIndex >= 0 ? items[selectedIndex] : null;

  return {
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    selected,
    refs: { buttonRef, listRef },
    getButtonProps: (props = {}) => ({
      ...props,
      ref: buttonRef,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      onClick: (e) => {
        props.onClick?.(e);
        setOpen((v) => !v);
      },
      onKeyDown: (e) => {
        props.onKeyDown?.(e);
        onKeyDown(e);
      },
    }),
    getListProps: (props = {}) => ({
      ...props,
      ref: listRef,
      tabIndex: -1,
      role: "listbox",
      onKeyDown: (e) => {
        props.onKeyDown?.(e);
        onKeyDown(e);
      },
    }),
    getItemProps: (index, props = {}) => ({
      ...props,
      role: "option",
      "aria-selected": index === selectedIndex,
      onMouseEnter: () => setActiveIndex(index),
      onClick: (e) => {
        props.onClick?.(e);
        select(index);
      },
    }),
  };
}

export default function App() {
  const items = useMemo(() => ["Ahmad Toffaha", "Item 2", "Item 3"], []);
  const dd = useDropdown(items);

  return (
    <div style={{ padding: 16, maxWidth: 360 }}>
      <h3>Headless Dropdown</h3>
      <button {...dd.getButtonProps()} style={{ width: "100%" }}>
        {dd.selected ?? "Select"}
      </button>
      {dd.open && (
        <div {...dd.getListProps()} style={{ marginTop: 8, border: "1px solid #ddd", borderRadius: 10, padding: 6, outline: "none" }}>
          {items.map((it, i) => (
            <div
              key={it}
              {...dd.getItemProps(i)}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: i === dd.activeIndex ? "#f0f0f0" : "transparent",
                cursor: "pointer",
              }}
            >
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

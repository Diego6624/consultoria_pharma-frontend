import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { FontSize } from "@tiptap/extension-text-style";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Paperclip,
  Image as ImageIcon,
  Loader2,
  Minus,
  Highlighter,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Table as TableIcon,
  Type,
  Palette,
  Trash2,
  Plus,
  GripVertical,
  Columns3,
  Rows3,
  Merge,
  Scissors,
} from "lucide-react";
import { uploadImage } from "@/services/uploadService";

const FONT_SIZES = [
  { label: "Pequeño", value: "12px" },
  { label: "Normal", value: "16px" },
  { label: "Mediano", value: "18px" },
  { label: "Grande", value: "20px" },
  { label: "Muy grande", value: "24px" },
  { label: "Título", value: "32px" },
];

const HIGHLIGHT_COLORS = [
  "#fef08a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecaca",
  "#ddd6fe",
  "#fed7aa",
];

export default function TipTapEditor({ value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const fileInputRef = useRef(null);
  const highlightRef = useRef(null);
  const tableMenuRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ horizontalRule: false, link: false, underline: false, }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Placeholder.configure({ placeholder: "Escribe el contenido aquí..." }),
      HorizontalRule,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[280px] w-full rounded-b-xl border border-t-0 border-border bg-white px-4 py-3 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (highlightRef.current && !highlightRef.current.contains(e.target)) {
        setShowHighlightPicker(false);
      }
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target)) {
        setShowTableMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMark = (mark) => {
    if (!editor) return;
    editor.chain().focus()[mark]().run();
  };

  const isActive = (name, attrs = {}) => {
    if (!editor) return false;
    return editor.isActive(name, attrs);
  };

  const addLink = () => {
    if (!editor) return;
    const url = window.prompt("Ingresa la URL del enlace");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const handleImageButtonClick = () => {
    if (!editor || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido.");
      return;
    }
    setIsUploading(true);
    try {
      const response = await uploadImage(file);
      const imageUrl = response?.url;
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      alert("No se pudo subir la imagen. Intenta de nuevo.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setHighlightColor = (color) => {
    if (!editor) return;
    if (isActive("highlight", { color })) {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
    setShowHighlightPicker(false);
  };

  const setFontSizeValue = (size) => {
    if (!editor) return;
    if (size) {
      editor.chain().focus().setFontSize(size).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  const insertTable = () => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
    setShowTableMenu(false);
  };

  const ToolbarButton = ({
    onClick,
    active = false,
    children,
    title,
    disabled = false,
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150
        ${
          active
            ? "bg-slate-900 text-white shadow-sm"
            : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="mx-1 h-5 w-px bg-slate-200" />
  );

  return (
    <div className="space-y-0">
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Toolbar */}
      <div className="rounded-t-xl border border-border bg-slate-50/80 px-3 py-2 backdrop-blur-sm">
        {/* Fila 1: Formato de texto */}
        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            onClick={() => toggleMark("toggleBold")}
            active={isActive("bold")}
            title="Negrita (Ctrl+B)"
          >
            <Bold size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => toggleMark("toggleItalic")}
            active={isActive("italic")}
            title="Itálica (Ctrl+I)"
          >
            <Italic size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => toggleMark("toggleUnderline")}
            active={isActive("underline")}
            title="Subrayado (Ctrl+U)"
          >
            <UnderlineIcon size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton
            onClick={() => toggleMark("toggleSuperscript")}
            active={isActive("superscript")}
            title="Superíndice"
          >
            <SuperscriptIcon size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => toggleMark("toggleSubscript")}
            active={isActive("subscript")}
            title="Subíndice"
          >
            <SubscriptIcon size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Highlight con picker */}
          <div className="relative" ref={highlightRef}>
            <ToolbarButton
              onClick={() => setShowHighlightPicker((v) => !v)}
              active={isActive("highlight")}
              title="Resaltar texto"
            >
              <Highlighter size={16} strokeWidth={2.2} />
            </ToolbarButton>
            {showHighlightPicker && (
              <div className="absolute left-0 top-10 z-50 flex gap-1.5 rounded-lg border border-border bg-white p-2 shadow-lg">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setHighlightColor(color)}
                    className={`h-6 w-6 rounded-md border transition-transform hover:scale-110 ${
                      isActive("highlight", { color })
                        ? "ring-2 ring-slate-900 ring-offset-1"
                        : "border-slate-200"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    editor?.chain().focus().unsetHighlight().run();
                    setShowHighlightPicker(false);
                  }}
                  className="ml-1 flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-500 hover:bg-slate-100"
                  title="Sin resaltar"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Color de texto */}
          <div className="relative">
            <label
              className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all duration-150 ${
                isActive("textStyle", { color: /.*/ })
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="Color de texto"
            >
              <Palette size={16} strokeWidth={2.2} />
              <input
                type="color"
                className="absolute h-0 w-0 opacity-0"
                onChange={(e) =>
                  editor?.chain().focus().setColor(e.target.value).run()
                }
              />
            </label>
          </div>

          {/* Tamaño de fuente */}
          <select
            value={
              editor?.getAttributes("textStyle").fontSize
                ? editor.getAttributes("textStyle").fontSize
                : ""
            }
            onChange={(e) => setFontSizeValue(e.target.value)}
            className="ml-1 h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none hover:border-slate-300 focus:border-slate-400"
            title="Tamaño de fuente"
          >
            <option value="">Tamaño</option>
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fila 2: Estructura y elementos */}
        <div className="mt-1 flex flex-wrap items-center gap-1">
          <ToolbarButton
            onClick={() => toggleMark("toggleBulletList")}
            active={isActive("bulletList")}
            title="Lista con viñetas"
          >
            <List size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
            title="Línea divisoria"
          >
            <Minus size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton
            onClick={addLink}
            active={isActive("link")}
            title="Insertar enlace"
          >
            <Paperclip size={16} strokeWidth={2.2} />
          </ToolbarButton>

          <ToolbarButton
            onClick={handleImageButtonClick}
            title="Insertar imagen"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ImageIcon size={16} strokeWidth={2.2} />
            )}
          </ToolbarButton>

          <ToolbarDivider />

          {/* Menú de Tablas */}
          <div className="relative" ref={tableMenuRef}>
            <ToolbarButton
              onClick={() => setShowTableMenu((v) => !v)}
              active={editor?.isActive("table")}
              title="Tabla"
            >
              <TableIcon size={16} strokeWidth={2.2} />
            </ToolbarButton>

            {showTableMenu && (
              <div className="absolute left-0 top-10 z-50 w-56 rounded-lg border border-border bg-white p-3 shadow-lg">
                {!editor?.isActive("table") ? (
                  <button
                    type="button"
                    onClick={insertTable}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Plus size={14} />
                    Insertar tabla (3×3)
                  </button>
                ) : (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-slate-400 px-2 pb-1">
                      Filas
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().addRowBefore().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Rows3 size={14} />
                      Insertar fila arriba
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().addRowAfter().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Rows3 size={14} />
                      Insertar fila abajo
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().deleteRow().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Eliminar fila
                    </button>

                    <div className="my-1 h-px bg-slate-100" />

                    <div className="text-xs font-medium text-slate-400 px-2 pb-1">
                      Columnas
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().addColumnBefore().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Columns3 size={14} />
                      Insertar columna izquierda
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().addColumnAfter().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Columns3 size={14} />
                      Insertar columna derecha
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().deleteColumn().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Eliminar columna
                    </button>

                    <div className="my-1 h-px bg-slate-100" />

                    <div className="text-xs font-medium text-slate-400 px-2 pb-1">
                      Celda
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().mergeCells().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Merge size={14} />
                      Combinar celdas
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().splitCell().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Scissors size={14} />
                      Dividir celda
                    </button>

                    <div className="my-1 h-px bg-slate-100" />

                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().deleteTable().run()
                      }
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Eliminar tabla
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

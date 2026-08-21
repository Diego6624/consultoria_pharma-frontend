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
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Paperclip,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { uploadImage } from "@/services/uploadService";

export default function TipTapEditor({ value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Placeholder.configure({
        placeholder: "Escribe el contenido aquí...",
      }),
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
      const response = await uploadImage(file, {
        onUploadProgress: (progressEvent) => {
          const percent = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          console.log(`Subiendo imagen: ${percent}%`);
        },
      });
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
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-border bg-slate-50/80 px-3 py-2 backdrop-blur-sm">
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

        <div className="mx-1 h-5 w-px bg-slate-200" />

        <ToolbarButton
          onClick={() => toggleMark("toggleBulletList")}
          active={isActive("bulletList")}
          title="Lista con viñetas"
        >
          <List size={16} strokeWidth={2.2} />
        </ToolbarButton>

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
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";

export default function TipTapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Placeholder.configure({ placeholder: "Escribe el contenido del artículo o servicio..." }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-slate min-h-[220px] w-full rounded-md border border-border bg-background p-3 focus:outline-none",
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

  const addLink = () => {
    if (!editor) return;
    const url = window.prompt("Ingresa la URL del enlace");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    if (!editor) return;
    const src = window.prompt("Ingresa la URL de la imagen");
    if (src) {
      editor.chain().focus().setImage({ src }).run();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-md border border-border bg-card p-2">
        <Button variant="outline" size="sm" type="button" onClick={() => toggleMark("toggleBold")}>Negrita</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => toggleMark("toggleItalic")}>Itálica</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => toggleMark("toggleUnderline")}>Subrayado</Button>
        <Button variant="outline" size="sm" type="button" onClick={() => toggleMark("toggleBulletList")}>Lista</Button>
        <Button variant="outline" size="sm" type="button" onClick={addLink}>Enlace</Button>
        <Button variant="outline" size="sm" type="button" onClick={addImage}>Imagen</Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

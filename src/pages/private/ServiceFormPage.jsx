import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sanitizeHtml, sanitizeText } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@heroui/react";
import TipTapEditor from "@/components/TipTapEditor";
import {
  crearServicioConImagen,
  obtenerServicioAdmin,
  actualizarServicioConImagen,
} from "@/services/serviciosService";
import { listarCategoriasPorTipo } from "@/services/categoriasService";
import { UploadCloud, X, Loader2 } from "lucide-react";

const initialForm = {
  titulo: "",
  descripcion: "",
  contenido: "",
  imagen: "",
  idCategoria: "",
};

export default function ServiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadCategorias() {
      try {
        const data = await listarCategoriasPorTipo("SERVICIO"); // ✅ sin desestructurar
        setCategorias(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.danger(error.message || "No se pudieron cargar las categorías");
        setCategorias([]);
      }
    }
    loadCategorias();
  }, []);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);
      try {
        const service = await obtenerServicioAdmin(id); // ✅ sin desestructurar
        setForm({
          titulo: service.titulo || "",
          descripcion: service.descripcion || "",
          contenido: service.contenido || "",
          imagen: service.imagen || "",
          idCategoria: service.idCategoria || "",
        });
      } catch (error) {
        setError(error.message || "No se pudo cargar el servicio");
        toast.danger(error.message || "No se pudo cargar el servicio");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen válido.");
      return;
    }
    setError("");
    setImageFile(file);
    setPreviewImageUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (event) => {
    processFile(event.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewImageUrl("");
    setForm((c) => ({ ...c, imagen: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleContentChange = (value) => {
    setForm((current) => ({ ...current, contenido: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("titulo", sanitizeText(form.titulo));
    formData.append("descripcion", sanitizeText(form.descripcion));
    formData.append("contenido", sanitizeHtml(form.contenido));
    formData.append("idCategoria", form.idCategoria);
    formData.append("imagen", form.imagen || "");
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    setUploadProgress(0);

    try {
      if (id) {
        await actualizarServicioConImagen(id, formData, {
          onUploadProgress: (e) => {
            if (e.total)
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        });
      } else {
        await crearServicioConImagen(formData, {
          onUploadProgress: (e) => {
            if (e.total)
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        });
      }
      setUploadProgress(100);
      toast.success(id ? "Servicio actualizado" : "Servicio creado");
      navigate("/admin/servicios", { replace: true });
    } catch (error) {
      setError(error.message || "Error al guardar el servicio");
      toast.danger(error.message || "No se pudo guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  const currentImage = previewImageUrl || form.imagen;

  if (loading) {
    return <div className="flex min-h-64 items-center justify-center gap-3 rounded-3xl border border-border bg-white p-6 text-sm text-slate-500"><span className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" /> Cargando formulario...</div>;
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {id ? "Editar servicio" : "Crear servicio"}
          </h2>
          <p className="text-sm text-slate-600">
            Redacta el contenido en el editor y guarda los cambios.
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Título
            </label>
            <Input
              value={form.titulo}
              onChange={handleChange("titulo")}
              placeholder="Título del servicio"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Descripción corta
            </label>
            <Input
              value={form.descripcion}
              onChange={handleChange("descripcion")}
              placeholder="Breve descripción del servicio"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Categoría
            </label>
            <select
              value={form.idCategoria}
              onChange={handleChange("idCategoria")}
              required
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            >
              <option value="">Selecciona una categoría</option>
              {(categorias ?? []).map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Imagen de portada moderna */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Imagen de portada
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {currentImage ? (
            <div className="relative inline-block">
              <img
                src={currentImage}
                alt="Vista previa"
                className="h-48 w-auto max-w-full rounded-xl border object-cover shadow-sm"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-transform hover:scale-105"
                title="Eliminar imagen"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed
                px-6 py-10 transition-colors duration-200
                ${isDragging
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50"
                }
              `}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <UploadCloud size={24} className="text-slate-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  Haz clic o arrastra una imagen aquí
                </p>
                <p className="text-xs text-slate-400">
                  PNG, JPG, WEBP hasta 5 MB
                </p>
              </div>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2 w-full max-w-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Subiendo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Contenido
          </label>
          <TipTapEditor value={form.contenido} onChange={handleContentChange} />
        </div>

        {error && (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={saving} className="gap-2 cursor-pointer">
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar servicio"
            )}
          </Button>
          <Button
            variant="outline"
            type="button"
            className={"cursor-pointer"}
            onClick={() => navigate("/admin/servicios")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

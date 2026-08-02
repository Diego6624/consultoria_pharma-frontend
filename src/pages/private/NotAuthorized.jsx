import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
      <h2 className="text-xl font-semibold">No autorizado</h2>
      <p className="mt-2 text-sm text-slate-600">No tienes permiso para ver esta sección.</p>
      <div className="mt-4">
        <Button onClick={() => navigate("/login")}>Volver a iniciar sesión</Button>
      </div>
    </div>
  );
}

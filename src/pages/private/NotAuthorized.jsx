import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="admin-empty-state rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#EBEDEE] text-[#1F4C7F]">!</div>
      <h2 className="text-xl font-semibold text-[#1F4C7F]">No autorizado</h2>
      <p className="mt-2 text-sm text-slate-600">No tienes permiso para ver esta sección.</p>
      <div className="mt-4">
        <Button onClick={() => navigate("/login")}>Volver a iniciar sesión</Button>
      </div>
    </div>
  );
}

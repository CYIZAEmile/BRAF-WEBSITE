import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Loader2, RefreshCw, Download } from "lucide-react";
import brafLogo from "@/assets/braf-logo.jpeg";

interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  talent_result: string;
  answers: string[];
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("quiz_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setEnquiries((data as Enquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchEnquiries();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await supabase.from("quiz_enquiries").delete().eq("id", id);
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={brafLogo} alt="BRAF" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h1 className="font-bold text-lg">BRAF Admin</h1>
              <p className="text-xs text-primary-foreground/70">Quiz Enquiries Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="text-primary-foreground hover:text-primary-foreground/80">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Enquiries</h2>
            <p className="text-sm text-muted-foreground">{enquiries.length} total submissions</p>
          </div>
          <Button variant="outline" onClick={fetchEnquiries} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <p className="text-muted-foreground">No enquiries yet.</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-6 py-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-6 py-4 font-medium text-muted-foreground">Talent Match</th>
                    <th className="text-left px-6 py-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-right px-6 py-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{e.full_name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{e.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {e.talent_result}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(e.id)}
                          disabled={deleting === e.id}
                          className="text-destructive hover:text-destructive"
                        >
                          {deleting === e.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;

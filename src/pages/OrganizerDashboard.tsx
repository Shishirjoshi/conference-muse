import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Eye, X, AlertCircle, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { conferences } from "@/data/conferences";
import { useAuth } from "@/hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: 'admin' | 'participant';
  created_at?: string;
}

const OrganizerDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'conferences'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fullName: '',
    role: 'participant' as 'admin' | 'participant'
  });

  // Fetch users on component mount or tab change
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      console.error('Fetch users error:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      if (!formData.email || !formData.username || !formData.password || !formData.fullName) {
        setError('All fields are required');
        return;
      }

      const url = editingUser
        ? `${API_URL}/auth/users/${editingUser.id}`
        : `${API_URL}/auth/users`;

      const method = editingUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      await fetchUsers();
      setShowCreateModal(false);
      setEditingUser(null);
      setFormData({
        email: '',
        username: '',
        password: '',
        fullName: '',
        role: 'participant'
      });
    } catch (err) {
      console.error('Create/update user error:', err);
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete user');
      }

      await fetchUsers();
    } catch (err) {
      console.error('Delete user error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (editUser: User) => {
    setEditingUser(editUser);
    setFormData({
      email: editUser.email,
      username: editUser.username,
      password: '',
      fullName: editUser.fullName,
      role: editUser.role
    });
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingUser(null);
    setFormData({
      email: '',
      username: '',
      password: '',
      fullName: '',
      role: 'participant'
    });
    setError('');
  };

  const myConferences = conferences.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">
              {user?.fullName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">🔑 {user?.email}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('conferences')}
            className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'conferences'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Conferences
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">All Users</h2>
              <Button
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ email: '', username: '', password: '', fullName: '', role: 'participant' });
                  setShowCreateModal(true);
                }}
                className="rounded-full gap-2"
              >
                <Plus size={16} /> Create User
              </Button>
            </div>

            {/* Users Table */}
            {loading && activeTab === 'users' ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">Email</th>
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">Username</th>
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">Role</th>
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="px-5 py-3 font-medium text-foreground">{u.fullName}</td>
                          <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                          <td className="px-5 py-3 text-muted-foreground">@{u.username}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              u.role === 'admin'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-accent/10 text-accent'
                            }`}>
                              {u.role === 'admin' ? '🔑 Admin' : '👤 Participant'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(u)}
                                className="rounded-full gap-1 text-xs"
                              >
                                <Edit size={12} /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(u.id)}
                                className="rounded-full gap-1 text-xs text-destructive hover:text-destructive disabled:opacity-50"
                                disabled={u.email === 'admin@conference.com'}
                              >
                                <Trash2 size={12} /> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Conferences Tab */}
        {activeTab === 'conferences' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">Managed Conferences</h2>
              <Button className="rounded-full gap-2">
                <Plus size={16} /> Add Conference
              </Button>
            </div>

            <div className="space-y-4">
              {myConferences.map((conference) => (
                <div
                  key={conference.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={conference.image}
                      alt={conference.title}
                      className="h-16 w-24 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{conference.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {conference.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {conference.location}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {conference.speakers.length} speakers</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/conference/${conference.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs">
                        <Eye size={12} /> View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs">
                      <Edit size={12} /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs text-destructive hover:text-destructive">
                      <Trash2 size={12} /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-8 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="user@example.com"
                    type="email"
                    className="pl-9"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Username</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="username"
                    className="pl-9"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Password {editingUser && <span className="text-xs text-muted-foreground">(leave blank to keep current)</span>}
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    className="pl-9"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Role</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'participant' })}
                  disabled={loading}
                >
                  <option value="participant">Participant</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrganizerDashboard;

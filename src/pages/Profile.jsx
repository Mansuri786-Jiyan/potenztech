import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30 flex flex-col items-center">
        <div className="bg-gradient-to-tr from-purple-400 to-pink-400 p-2 rounded-full mb-4 shadow-lg">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg tracking-tight mb-2">My Profile</h1>
        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 shadow-sm">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-800">{user.firstName} {user.lastName}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 shadow-sm">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"/><path d="M12 16v4"/><path d="M8 20h8"/></svg>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 shadow-sm">
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
            <span className="font-semibold text-gray-700">Username:</span>
            <span className="text-gray-800">{user.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

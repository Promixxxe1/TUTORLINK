// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [done, setDone] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const checks = [
//     { label: 'At least 8 characters', ok: password.length >= 8 },
//     { label: 'Contains a number', ok: /\d/.test(password) },
//     { label: 'Contains a special character', ok: /[^a-zA-Z0-9]/.test(password) },
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirm) { setError('Passwords do not match'); return; }
//     if (!checks.every(c => c.ok)) { setError('Password does not meet requirements'); return; }
//     setError('');
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 1000));
//     setLoading(false);
//     setDone(true);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-surface relative overflow-hidden">
//       <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-secondary-fixed-dim/20 blur-[120px] pointer-events-none" />

//       <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl ring-1 ring-outline-variant/10 p-8 md:p-12 relative z-10">
//         <div className="flex items-center gap-2 mb-8">
//           <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
//             <span className="material-symbols-outlined text-sm text-white material-symbols-filled">history_edu</span>
//           </div>
//           <span className="text-lg font-black text-primary">TutorLink</span>
//         </div>

//         {!done ? (
//           <>
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-primary mb-1">Reset Password</h2>
//               <p className="text-on-surface-variant text-sm">Create a new secure password for your account.</p>
//             </div>

//             {error && <div className="mb-5 p-3 bg-error-container text-on-error-container rounded-xl text-sm font-medium">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-primary mb-1.5">New Password</label>
//                 <input
//                   type="password" required value={password} onChange={e => setPassword(e.target.value)}
//                   className="w-full px-4 py-3.5 bg-surface-container-high rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm"
//                   placeholder="Min. 8 characters"
//                 />
//                 <div className="mt-3 space-y-1.5">
//                   {checks.map(c => (
//                     <div key={c.label} className="flex items-center gap-2">
//                       <span className={`material-symbols-outlined text-[16px] material-symbols-filled ${c.ok ? 'text-green-600' : 'text-outline'}`}>
//                         {c.ok ? 'check_circle' : 'radio_button_unchecked'}
//                       </span>
//                       <span className={`text-xs ${c.ok ? 'text-green-700 font-semibold' : 'text-on-surface-variant'}`}>{c.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-primary mb-1.5">Confirm Password</label>
//                 <input
//                   type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
//                   className="w-full px-4 py-3.5 bg-surface-container-high rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm"
//                   placeholder="Repeat password"
//                 />
//               </div>
//               <button
//                 type="submit" disabled={loading}
//                 className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold text-base hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
//               >
//                 {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
//                 {loading ? 'Updating…' : 'Reset Password'}
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="text-center">
//             <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="material-symbols-outlined text-secondary text-4xl material-symbols-filled">lock_open</span>
//             </div>
//             <h2 className="text-2xl font-bold text-primary mb-2">Password Changed!</h2>
//             <p className="text-on-surface-variant text-sm mb-8">Your password has been updated. You can now log in with your new password.</p>
//             <button onClick={() => navigate('/login')} className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-colors">
//               Login Now
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// if i send you my full frontend codebase can you create a roadmap for my backend???
import React from 'react'

const ResetPasswordPage = () => {
  return (
    <div>ResetPasswordPage</div>
  )
}

export default ResetPasswordPage
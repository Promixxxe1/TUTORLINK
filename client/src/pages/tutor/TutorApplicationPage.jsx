import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, UploadIcon, ArrowLeft, PlusCircle, Trash2  } from 'lucide-react';
import { PiIdentificationBadge } from 'react-icons/pi';
import { MdDescription } from 'react-icons/md';
import { LuBookOpen } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";

const steps = ['Personal Info', 'Subjects & Expertise', 'Pricing & Availability', 'Verification'];

const subjectOptions = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science', 'Economics', 'Music', 'Art'];
const proficiencyLevels = ['Beginner', 'Intermediate', 'Expert'];

export default function TutorApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [bio, setBio] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', proficiency: 'Expert', years: '' }]);
  const [rate, setRate] = useState(5000);
  const [availability, setAvailability] = useState('');
  const [timezone, setTimezone] = useState('Africa/Lagos');
  const [education, setEducation] = useState('');

    const addSubject = () =>
      setSubjects((prev) => [
        ...prev,
        { name: "", proficiency: "Expert", years: "" },
      ]);
    const updateSubject = (i, field, val) =>
      setSubjects((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)),
      );
    const removeSubject = (i) =>
      setSubjects((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate('/tutor/application-status');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl bg-white rounded-3xl p-8 md:p-12 z-10 shadow-2xl ring-1 ring-outline-variant/10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-white material-symbols-filled">
              <LuBookOpen />
            </span>
          </div>
          <span className="text-lg font-black text-primary">TutorLink</span>
        </div>

        <div className="mb-8">
          <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">
            Tutor Application
          </span>
          <h1 className="text-3xl font-black text-primary tracking-tight mb-2">
            Join as a Tutor
          </h1>
          <p className="text-on-surface-variant text-sm">
            Complete your application to start teaching on TutorLink.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto hide-scrollbar pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  i === step
                    ? "bg-slate-900 text-white"
                    : i < step
                      ? "bg-gray-400"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {i < step ? (
                  <span className="material-symbols-outlined text-[14px]">
                    <Check />
                  </span>
                ) : (
                  <span>{i + 1}</span>
                )}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="material-symbols-outlined text-outline text-[16px]">
                  <Check />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] space-y-5">
          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Bio{" "}
                  <span className="text-on-surface-variant font-normal">
                    (min 100 characters)
                  </span>
                </label>
                <textarea
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell students about your teaching style, experience, and what makes you unique..."
                  className="w-full px-4 py-3 bg-gray-200 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm resize-none"
                />
                <p className="text-xs text-on-surface-variant mt-1">
                  {bio.length}/100 minimum
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Profile Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-secondary/40 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-2">
                    <UploadIcon />
                  </span>
                  <p className="text-sm text-on-surface-variant">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-outline mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Intro Video Link{" "}
                  <span className="text-on-surface-variant font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-3 bg-gray-200 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary">Subjects You Teach</h3>
                <button
                  onClick={addSubject}
                  className="flex items-center gap-1.5 text-secondary font-semibold text-sm hover:underline"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    <PlusCircle />
                  </span>{" "}
                  Add Subject
                </button>
              </div>
              {subjects.map((s, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Subject {i + 1}
                    </span>
                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(i)}
                        className="text-error hover:bg-error-container/30 p-1 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          <Trash2 />
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={s.name}
                      onChange={(e) => updateSubject(i, "name", e.target.value)}
                      className="px-3 py-2.5 bg-white rounded-xl text-on-surface  border-outline-variant/30 focus:outline-none focus:border-2 border-gray-500 text-sm"
                    >
                      <option value="">Select subject</option>
                      {subjectOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <select
                      value={s.proficiency}
                      onChange={(e) =>
                        updateSubject(i, "proficiency", e.target.value)
                      }
                      className="px-3 py-2.5 bg-white rounded-xl text-on-surface  border-outline-variant/30 focus:outline-none focus:border-2 border-gray-500 text-sm"
                    >
                      {proficiencyLevels.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Years exp."
                      value={s.years}
                      onChange={(e) =>
                        updateSubject(i, "years", e.target.value)
                      }
                      className="px-3 py-2.5 bg-white rounded-xl text-on-surface  border-outline-variant/30 focus:outline-none focus:border-2 border-gray-500 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Hourly Rate (₦)
                </label>
                <div className="bg-gray-200 p-6 rounded-2xl space-y-4">
                  <p className="text-3xl font-black text-primary">
                    ₦{rate.toLocaleString()}
                  </p>
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={500}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-400 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                    <span>₦2,000</span>
                    <span>₦50,000</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Availability Notes
                </label>
                <textarea
                  rows={3}
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g. Available weekdays 9am-5pm WAT, weekends by arrangement..."
                  className="w-full px-4 py-3 bg-gray-300 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Time Zone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-300 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 outline-none text-sm"
                >
                  {[
                    "Africa/Lagos",
                    "Africa/Accra",
                    "Europe/London",
                    "America/New_York",
                    "Asia/Dubai",
                  ].map((tz) => (
                    <option key={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Government ID
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-secondary/40 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-3xl text-outline block mb-2">
                    <PiIdentificationBadge />
                  </span>
                  <p className="text-sm text-on-surface-variant">
                    Upload National ID, Passport, or Driver's License
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Resume / CV
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-secondary/40 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-3xl text-outline block mb-2">
                    <MdDescription />
                  </span>
                  <p className="text-sm text-on-surface-variant">
                    Upload your CV or resume (PDF)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">
                  Education Background
                </label>
                <textarea
                  rows={3}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. BSc Mathematics, University of Lagos (2018)..."
                  className="w-full px-4 py-3 bg-gray-200 rounded-xl text-on-surface border-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all outline-none text-sm resize-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-300 pt-8">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">
                <ArrowLeft />
              </span>{" "}
              Back
            </button>
          ) : (
            <div />
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 && bio.length < 100}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:scale-[1.02] transition-all shadow-lg flex items-center gap-2 disabled:opacity-100"
            >
              Continue{" "}
              <span className="material-symbols-outlined">
                <ArrowRight />
              </span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-4 bg-slate-900 from-primary to-primary-container text-white rounded-xl font-bold hover:scale-[1.02] transition-all shadow-lg flex items-center gap-2 disabled:opacity-60"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Submitting…" : "Submit Application"}
              {!loading && (
                <span className="material-symbols-outlined">
                  <IoMdSend/>
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

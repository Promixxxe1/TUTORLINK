import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../services/api";
import { toast } from "react-toastify";
const subjects = [
  "All",
  "Mathematics",
  "Science",
  "Languages",
  "Technology",
  "Business",
  "Arts",
];
const sortOptions = [
  { label: "Best Match", value: "-tutorProfile.rating" },
  { label: "Highest Rated", value: "-tutorProfile.rating" },
  { label: "Lowest Price", value: "tutorProfile.hourlyRate" },
  { label: "Most Reviews", value: "-tutorProfile.reviewCount" },
];

export default function FindTutorsPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [sort, setSort] = useState("-tutorProfile.rating");
  const [maxRate, setMaxRate] = useState(50000);
  const [page, setPage] = useState(1);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await userAPI.getTutors();
        setTutors(res.data.tutors);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load tutors.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(search.toLowerCase()) ||
        tutor.email.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [tutors, search]);

  // const { data, isLoading } = useQuery({
  //   queryKey: ['tutors', search, subject, sort, maxRate, page],
  //   queryFn: () => userApi.getTutors({
  //     search: search || undefined,
  //     subject: subject !== 'All' ? subject : undefined,
  //     maxRate,
  //     sort,
  //     page,
  //     limit: 12,
  //   }),
  //   staleTime: 30000,
  // });

  // const tutors = data?.data || [];
  // const meta = data?.meta;

  return (
    <div className="max-w-7xl mx-auto px-0 py-8">
      <div className="mb-8 px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight mb-2">
          Find Your Tutor
        </h1>
        <p className="text-on-surface-variant">
          Browse verified experts across all subjects.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-16 md:top-20 z-20 bg-surface-container-low border-b border-outline-variant/10 px-6 md:px-8 py-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none text-sm transition-all"
              placeholder="Search by name or subject…"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 bg-white rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-secondary/30 outline-none text-sm text-on-surface"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-4 pb-1 hide-scrollbar">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSubject(s);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${subject === s ? "bg-primary text-white" : "bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary hover:text-primary"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap">
            Max Price:{" "}
            <span className="text-primary font-black">
              ₦{maxRate.toLocaleString()}/hr
            </span>
          </span>
          <input
            type="range"
            min={2000}
            max={50000}
            step={500}
            value={maxRate}
            onChange={(e) => {
              setMaxRate(Number(e.target.value));
              setPage(1);
            }}
            className="flex-1 accent-secondary h-1.5 rounded-full"
          />
        </div>
      </div>

      <div className="px-6 md:px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading tutors...
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">No tutors found</h2>

            <p className="text-slate-500">Try another search.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-slate-500">
              {filteredTutors.length} tutor(s) found
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="bg-white rounded-2xl border shadow-sm p-6"
                >
                  <img
                    src={
                      tutor.avatar || `https://i.pravatar.cc/200?u=${tutor._id}`
                    }
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />

                  <h2 className="text-xl font-bold text-center mt-4">
                    {tutor.name}
                  </h2>

                  <p className="text-center text-slate-500">{tutor.email}</p>

                  <p className="text-center text-sm mt-2">
                    {tutor.bio || "Professional Tutor"}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <Link to={`/tutors/${tutor._id}`}
                      className="flex-1 text-center border rounded-xl py-2 font-semibold hover:bg-slate-100"
                    >
                      View Profile
                    </Link>

                    <Link
                      to={`/student/book/${tutor._id}`}
                      className="flex-1 text-center bg-blue-600 text-white rounded-xl py-2 font-semibold hover:bg-blue-700"
                    >
                      Book Lesson
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination
            {meta && meta.pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-outline-variant/30 text-sm font-semibold disabled:opacity-40 hover:bg-surface-container-low transition-colors">
                  ← Prev
                </button>
                <span className="px-4 py-2 text-sm text-on-surface-variant">Page {page} of {meta.pages}</span>
                <button onClick={() => setPage(p => Math.min(meta.pages, p + 1))} disabled={page === meta.pages}
                  className="px-4 py-2 rounded-xl border border-outline-variant/30 text-sm font-semibold disabled:opacity-40 hover:bg-surface-container-low transition-colors">
                  Next →
                </button>
              </div>
            )} */}
      {/* </>
         )} */}
    </div>
    // </div>
  );
}

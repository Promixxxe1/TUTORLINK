import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { userApi } from '../lib/api';
// import { getAvatarUrl } from '../types';

const subjects = ['All', 'Mathematics', 'Science', 'Languages', 'Technology', 'Business', 'Arts'];
const sortOptions = [
  { label: 'Best Match', value: '-tutorProfile.rating' },
  { label: 'Highest Rated', value: '-tutorProfile.rating' },
  { label: 'Lowest Price', value: 'tutorProfile.hourlyRate' },
  { label: 'Most Reviews', value: '-tutorProfile.reviewCount' },
];

export default function FindTutorsPage() { 
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [sort, setSort] = useState('-tutorProfile.rating');
  const [maxRate, setMaxRate] = useState(50000);
  const [page, setPage] = useState(1);

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
        <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight mb-2">Find Your Tutor</h1>
        <p className="text-on-surface-variant">Browse verified experts across all subjects.</p>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-16 md:top-20 z-20 bg-surface-container-low border-b border-outline-variant/10 px-6 md:px-8 py-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none text-sm transition-all"
              placeholder="Search by name or subject…" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-3 bg-white rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-secondary/30 outline-none text-sm text-on-surface">
            {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

      <div className="flex overflow-x-auto gap-2 mt-4 pb-1 hide-scrollbar">
          {subjects.map(s => (
            <button key={s} onClick={() => { setSubject(s); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${subject === s ? 'bg-primary text-white' : 'bg-white text-on-surface-variant border border-outline-variant/30 hover:border-primary hover:text-primary'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap">
            Max Price: <span className="text-primary font-black">₦{maxRate.toLocaleString()}/hr</span>
          </span>
          <input type="range" min={2000} max={50000} step={500} value={maxRate}
            onChange={e => { setMaxRate(Number(e.target.value)); setPage(1); }}
            className="flex-1 accent-secondary h-1.5 rounded-full" />
        </div>
      </div>

      {/* Results */}
      {/* <div className="px-6 md:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-surface-container-high" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-surface-container-high rounded w-3/4" />
                  <div className="h-3 bg-surface-container-high rounded w-1/2" />
                  <div className="h-8 bg-surface-container-high rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline mb-4 block">search_off</span>
            <h3 className="text-xl font-bold text-primary mb-2">No tutors found</h3>
            <p className="text-on-surface-variant mb-6">Try adjusting your filters or search term.</p>
            <button onClick={() => { setSearch(''); setSubject('All'); setMaxRate(50000); setPage(1); }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-container transition-colors text-sm">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-on-surface-variant mb-5 font-medium">
              {meta?.total || tutors.length} tutor{(meta?.total || tutors.length) !== 1 ? 's' : ''} found
            </p> */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor: Record<string, unknown>) => {
                const tp = tutor.tutorProfile as Record<string, unknown> | undefined;
                const avatarUrl = getAvatarUrl(tutor as never);
                const subjects = (tp?.subjects as { name: string }[]) || [];
                return (
                  <div key={tutor._id as string} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow group">
                    <div className="relative h-52 overflow-hidden bg-surface-container-high">
                      <img src={avatarUrl || `https://i.pravatar.cc/300?u=${tutor._id}`} alt={tutor.name as string}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-tertiary-fixed-dim text-on-tertiary-fixed px-2.5 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs material-symbols-filled">star</span>
                        {(tp?.rating as number)?.toFixed(1) || '0.0'}
                        <span className="font-normal opacity-70">({tp?.reviewCount as number || 0})</span>
                      </div>
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-secondary">
                        {tp?.responseTime as string || '< 24 hrs'}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
                        {subjects[0]?.name || 'General'}
                      </p>
                      <h3 className="text-lg font-bold text-primary mb-1">{tutor.name as string}</h3>
                      <p className="text-sm text-on-surface-variant mb-3 line-clamp-2">{tutor.bio as string}</p>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">school</span>
                          {tp?.totalStudents as number || 0} students
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">menu_book</span>
                          {tp?.totalLessons as number || 0} lessons
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-surface-container-high pt-4">
                        <span className="text-xl font-black text-primary">
                          ₦{((tp?.hourlyRate as number) || 0).toLocaleString()}
                          <span className="text-xs font-normal text-on-surface-variant">/hr</span>
                        </span>
                        <Link to={`/tutor/${tutor._id}`}
                          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-primary-container transition-colors">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}

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

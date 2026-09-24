import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { userAPI } from "../services/api";
import { toast } from "react-toastify";

export default function PublicTutorProfilePage() {
  const { id } = useParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await userAPI.getById(id);
        setTutor(res.data.user);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load tutor.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading tutor...</div>;
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Tutor not found</h2>
          <p className="text-slate-500 mt-2">
            We could not load that tutor profile. Please check the link and try
            again.
          </p>
          <Link
            to="/find-tutors"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Tutors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl shadow border p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={tutor.avatar || `https://i.pravatar.cc/250?u=${tutor._id}`}
            alt={tutor.name}
            className="w-40 h-40 rounded-full object-cover"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-black">{tutor.name}</h1>

            <p className="text-slate-500 mt-2">{tutor.email}</p>

            <p className="mt-6">{tutor.bio || "Professional Tutor"}</p>

            {/* Courses & Pricing */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Available Courses
              </h2>

              {tutor.courses && tutor.courses.length > 0 ? (
                <div className="space-y-4">
                  {tutor.courses.map((course) => (
                    <div
                      key={course._id || course.name}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {course.name}
                          </h3>

                          {course.description && (
                            <p className="text-sm text-slate-500 mt-2 leading-6">
                              {course.description}
                            </p>
                          )}
                        </div>

                        <div className="text-right whitespace-nowrap">
                          <p className="text-lg font-bold text-blue-600">
                            ₦{Number(course.pricePerHour).toLocaleString()}
                          </p>

                          <p className="text-xs text-slate-500">per hour</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  This tutor has not added any courses yet.
                </p>
              )}
            </div>

            <Link
              to={`/student/book/${tutor._id}`}
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
            >
              Book Lesson
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { bookingAPI } from "../../services/api";
import { getAvatarUrl } from "../../types";

const formatLessonDate = (value) => {
  if (!value) return "No lessons yet";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TutorStudentsPage() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyStudents = async () => {
      if (!user) return;

      try {
        setLoading(true);

        const res = await bookingAPI.getMyBookings();
        const tutorBookings = (res.data?.bookings || []).filter((booking) => {
          const tutorId = booking.tutor?._id || booking.tutor;
          const userId = user?.id || user?._id;
          return tutorId && userId && tutorId.toString() === userId.toString();
        });

        const studentMap = new Map();

        tutorBookings.forEach((booking) => {
          const student = booking.student;

          if (!student) return;

          const studentId = student._id || student.id;

          if (!studentMap.has(studentId)) {
            studentMap.set(studentId, {
              _id: studentId,
              name: student.name || "Student",
              email: student.email || "",
              avatar: student.avatar || null,
              subject: booking.subject || "Lesson",
              totalLessons: 0,
              lastLesson: null,
            });
          }

          const entry = studentMap.get(studentId);
          entry.totalLessons += 1;

          const bookingDate = booking.date || booking.createdAt;

          if (
            !entry.lastLesson ||
            new Date(bookingDate) > new Date(entry.lastLesson)
          ) {
            entry.lastLesson = bookingDate;
            entry.subject = booking.subject || entry.subject;
          }
        });

        const mappedStudents = [...studentMap.values()].map((student) => ({
          ...student,
          lastLesson: formatLessonDate(student.lastLesson),
        }));

        setStudents(mappedStudents);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load your students.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudents();
  }, [user]);

  return (
    <div className="max-w-5xl space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            My Students
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {students.length} student{students.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl h-20 animate-pulse border border-slate-200"
            />
          ))}
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
          <span className="block text-6xl mb-4">👥</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No students yet
          </h3>
          <p className="text-slate-500 text-sm">
            Students will appear here once they book lessons with you.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Student", "Subject", "Lessons", "Last Lesson", ""].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            getAvatarUrl(student) ||
                            `https://i.pravatar.cc/32?u=${student._id}`
                          }
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <span className="font-semibold text-slate-900 text-sm block">
                            {student.name}
                          </span>
                          <p className="text-xs text-slate-500">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600 hidden sm:table-cell">
                      {student.subject}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-900">
                        <span className="text-base text-blue-600">📚</span>
                        {student.totalLessons}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">
                      {student.lastLesson}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <a
                        href="/tutor/messages"
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                      >
                        Message
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

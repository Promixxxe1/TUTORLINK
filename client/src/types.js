const DEFAULT_USER_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#e2e8f0"/>
        <stop offset="100%" stop-color="#cbd5e1"/>
      </linearGradient>
    </defs>
    <rect width="160" height="160" rx="32" fill="url(#bg)"/>
    <circle cx="80" cy="58" r="28" fill="#475569"/>
    <path d="M44 122c8-22 28-34 36-34s28 12 36 34" fill="#475569"/>
  </svg>
`)}`;

function isGeneratedAvatarUrl(url) {
  if (!url || typeof url !== "string") return false;
  return url.includes("i.pravatar.cc") || url.includes("randomuser.me");
}

export function getAvatarUrl(user) {
  if (!user) return DEFAULT_USER_AVATAR;
  const avatar = user.avatar;
  if (avatar && !isGeneratedAvatarUrl(avatar)) return avatar;
  return DEFAULT_USER_AVATAR;
}

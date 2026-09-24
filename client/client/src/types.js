export function getAvatarUrl(user) {
  if (!user) return null;
  // If user has a custom avatar URL, use it
  if (user.avatar) {
    return user.avatar;
  }
  // Otherwise use a gravatar/placeholder based on user ID or email
  return `https://i.pravatar.cc/150?u=${user._id || user.email}`;
}

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { UserType } from './types';

export default function UserAvatar({ user }: { user: UserType }) {
  const [hasError, setHasError] = useState(false);

  const fallback = (
    <div className="h-8 w-8 -ml-4 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-sm font-semibold">
      {user.name?.[0]?.toUpperCase() || "?"}
    </div>
  );

  return hasError || !user.profilePicture ? (
    fallback
  ) : (
    <div className="h-8 w-8 -ml-4">
      <img
        src={user.profilePicture}
        alt={user.name}
        className="h-full w-full object-cover rounded-full shadow-md"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export interface ProfileInfo {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
}

const STORAGE_KEY = 'profile';

const DEFAULT_PROFILE: ProfileInfo = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+358401234567',
  avatar: 'profile.jpg',
  password: '',
};

export function getProfile(): ProfileInfo {
  const stored = localStorage.getItem(STORAGE_KEY);
  let saved: Partial<ProfileInfo> = {};
  if (stored) {
    try {
      saved = JSON.parse(stored);
    } catch {
      saved = {};
    }
  }
  const profile: ProfileInfo = { ...DEFAULT_PROFILE, ...saved };
  if (!stored || JSON.stringify(profile) !== stored) {
    saveProfile(profile);
  }
  return profile;
}

export function saveProfile(profile: ProfileInfo): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
